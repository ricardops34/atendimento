# Script de importação: agendamentos MySQL → PostgreSQL
# Campos MySQL: (contrato_id, id, profissional_id, descricao, horario_inicial, intervalo_inicial,
#                intervalo_final, horario_final, cor, observacao, tipo, data_agenda,
#                hora_inicio, hora_fim, hora_intervalo_inicial, hora_intervalo_final, hora_total, local)

$inputFile  = "c:\Ricardo\atendimento\antigo\backup\bjsoft18_portal.sql"
$outputFile = "c:\Ricardo\atendimento\antigo\import_agendamentos.sql"
$empresaId  = 1  # BJ Soft tenant

# --- Parser de linha MySQL ---
function Parse-MySQLRow($line) {
    # Remove parêntese inicial/final e vírgula/ponto-e-vírgula final
    $line = $line -replace '^\(', '' -replace '[,;]\s*$', '' -replace '\)$', ''

    $values = @()
    $current = ''
    $inString = $false
    $escaped = $false
    $i = 0
    $chars = $line.ToCharArray()

    while ($i -lt $chars.Length) {
        $c = $chars[$i]

        if ($escaped) {
            if ($c -eq 'n') { $current += "`n" }
            elseif ($c -eq 't') { $current += "`t" }
            elseif ($c -eq "'") { $current += "''" }  # MySQL \' → PG ''
            elseif ($c -eq '\') { $current += '\' }
            else { $current += $c }
            $escaped = $false
        }
        elseif ($c -eq '\' -and $inString) {
            $escaped = $true
        }
        elseif ($c -eq "'" -and -not $inString) {
            $inString = $true
        }
        elseif ($c -eq "'" -and $inString) {
            $inString = $false
        }
        elseif ($c -eq ',' -and -not $inString) {
            $values += $current
            $current = ''
            $i++
            continue
        }
        else {
            $current += $c
        }
        $i++
    }
    $values += $current
    return $values
}

function HM($timeStr) {
    # Converte HH:MM:SS → HH:MM (ou mantém se já for HH:MM)
    if ($timeStr -eq 'NULL' -or $timeStr -eq '') { return '00:00' }
    $timeStr = $timeStr.Trim()
    if ($timeStr -match '^(\d{2}:\d{2})') { return $Matches[1] }
    return '00:00'
}

function DuracaoMin($horaTotal) {
    # "02:30:00" → 150 minutos
    if ($horaTotal -eq 'NULL' -or $horaTotal -eq '') { return '0' }
    $horaTotal = $horaTotal.Trim()
    if ($horaTotal -match '^(\d+):(\d+)') {
        return [string]([int]$Matches[1] * 60 + [int]$Matches[2])
    }
    return '0'
}

function PgVal($v) {
    $v = $v.Trim()
    if ($v -eq 'NULL') { return 'NULL' }
    return "'" + $v + "'"
}

# --- Leitura e coleta dos dados ---
$content = Get-Content $inputFile -Encoding UTF8
$inBlock = $false
$dataRows = @()

foreach ($line in $content) {
    if ($line -match "^INSERT INTO ``agendamento``") { $inBlock = $true; continue }
    if ($inBlock) {
        $trimmed = $line.TrimEnd()
        if ($trimmed -eq '' -or $trimmed -match "^(--|INSERT INTO ``(?!agendamento)|UNLOCK|CREATE|ALTER|DROP|COMMIT)") {
            $inBlock = $false; continue
        }
        if ($trimmed -match "^\(") { $dataRows += $trimmed }
    }
}

Write-Host "Linhas coletadas: $($dataRows.Count)"

# --- Geração do SQL ---
$output = @()
$output += "-- Importação de agendamentos do backup MySQL"
$output += "-- Gerado em: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
$output += "-- Total de registros: $($dataRows.Count)"
$output += ""
$output += "BEGIN;"
$output += ""
$output += "INSERT INTO agendamento"
$output += "  (id, empresa_id, contrato_id, profissional_id, descricao,"
$output += "   data_agenda, hora_inicio, hora_fim, hora_intervalo_inicial, hora_intervalo_final,"
$output += "   duracao_minutos, horario_inicial, horario_final, local, tipo, cor, observacao)"
$output += "VALUES"

$inserts = @()
$erros = 0

foreach ($row in $dataRows) {
    try {
        $v = Parse-MySQLRow $row
        # Índices: 0=contrato_id, 1=id, 2=profissional_id, 3=descricao, 4=horario_inicial,
        #          5=intervalo_ini, 6=intervalo_fim, 7=horario_final, 8=cor, 9=observacao,
        #          10=tipo, 11=data_agenda, 12=hora_inicio, 13=hora_fim,
        #          14=hora_int_ini, 15=hora_int_fim, 16=hora_total, 17=local

        if ($v.Count -lt 16) { $erros++; continue }

        $id           = $v[1].Trim()
        $contratoId   = $v[0].Trim()
        $profId       = $v[2].Trim()
        $descricao    = $v[3].Trim()
        $horIni       = $v[4].Trim()
        $horFim       = $v[7].Trim()
        $cor          = $v[8].Trim()
        $observacao   = $v[9].Trim()
        $tipo         = $v[10].Trim(); if ($tipo -eq 'NULL' -or $tipo -eq '') { $tipo = 'A' }
        $dataAgenda   = $v[11].Trim()
        $horaIni      = HM $v[12].Trim()
        $horaFim2     = HM $v[13].Trim()
        $horaIntIni   = HM $v[14].Trim()
        $horaIntFim   = HM $v[15].Trim()
        $duracao      = DuracaoMin ($v[16].Trim())
        $local        = $v[17].Trim(); if ($local -eq 'NULL' -or $local -eq '') { $local = 'P' }

        # Conversão de horario_inicial / horario_final para timestamptz (America/Sao_Paulo)
        $pgHorIni = if ($horIni -ne 'NULL') { "'$($horIni -replace "'", "''") -03:00'" } else { 'NULL' }
        $pgHorFim = if ($horFim -ne 'NULL') { "'$($horFim -replace "'", "''") -03:00'" } else { "NULL" }
        $pgDataAgenda = if ($dataAgenda -ne 'NULL') { "'$dataAgenda'" } else { "'$($horIni.Substring(0,10))'" }
        $pgContrato   = if ($contratoId -eq 'NULL') { 'NULL' } else { $contratoId }
        $pgProf       = if ($profId -eq 'NULL') { 'NULL' } else { $profId }
        $pgObs        = if ($observacao -eq 'NULL') { 'NULL' } else { "E'" + ($observacao -replace "\\", "\\\\" -replace "'", "''") + "'" }
        $pgDesc       = "'" + ($descricao -replace "'", "''") + "'"
        $pgTipo       = "'" + ($tipo -replace "'", "") + "'"
        $pgCor        = if ($cor -eq 'NULL') { "'#333333'" } else { "'" + $cor + "'" }
        $pgLocal      = "'" + ($local.Substring(0, [Math]::Min(1, $local.Length))) + "'"

        $insert = "  ($id, $empresaId, $pgContrato, $pgProf, $pgDesc,"
        $insert += " $pgDataAgenda, '$horaIni', '$horaFim2', '$horaIntIni', '$horaIntFim',"
        $insert += " $duracao, $pgHorIni, $pgHorFim, $pgLocal, $pgTipo, $pgCor, $pgObs)"
        $inserts += $insert
    }
    catch {
        $erros++
        Write-Host "ERRO na linha: $($row.Substring(0,[Math]::Min(80,$row.Length)))"
    }
}

$output += ($inserts -join ",`n")
$output += ";"
$output += ""
$output += "-- Reajusta sequence após insert com IDs explícitos"
$output += "SELECT setval('agendamento_id_seq', (SELECT MAX(id) FROM agendamento));"
$output += ""
$output += "COMMIT;"
$output += ""
$output += "-- Verificação"
$output += "SELECT COUNT(*) as total_importados FROM agendamento;"

$output | Out-File $outputFile -Encoding UTF8
Write-Host "SQL gerado em: $outputFile"
Write-Host "Registros OK: $($inserts.Count) | Erros: $erros"
