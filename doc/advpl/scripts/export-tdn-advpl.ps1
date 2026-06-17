param(
    [string]$OutputRoot = "doc/advpl",
    [int]$Limit = 250
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"
[System.Net.ServicePointManager]::SecurityProtocol = [System.Net.SecurityProtocolType]::Tls12

function Get-WebString {
    param([string]$Url)

    $oResponse = Invoke-WebRequest -UseBasicParsing $Url
    $oResponse.RawContentStream.Position = 0
    $oReader = New-Object System.IO.StreamReader(
        $oResponse.RawContentStream,
        [System.Text.Encoding]::UTF8,
        $true
    )

    try {
        return $oReader.ReadToEnd()
    } finally {
        $oReader.Dispose()
    }
}

function Get-NormalizedText {
    param([object]$Node)

    if ($null -eq $Node) {
        return ""
    }

    $cText = [System.Net.WebUtility]::HtmlDecode([string]$Node.innerText)
    $cText = $cText -replace "`r", ""
    $cText = $cText -replace "[ \t]+\n", "`n"
    $cText = $cText -replace "\n{3,}", "`n`n"
    return $cText.Trim()
}

function Get-SafeFileName {
    param([string]$Name)

    $cFileName = $Name.Trim()
    if ([string]::IsNullOrWhiteSpace($cFileName)) {
        $cFileName = "pagina-sem-titulo"
    }

    $aInvalidChars = [System.IO.Path]::GetInvalidFileNameChars()
    foreach ($cInvalidChar in $aInvalidChars) {
        $cFileName = $cFileName.Replace($cInvalidChar, "-")
    }

    $cFileName = $cFileName -replace "[:]", "-"
    $cFileName = $cFileName -replace "\s+", "-"
    $cFileName = $cFileName -replace "-{2,}", "-"
    $cFileName = $cFileName.Trim(".- ")

    if ([string]::IsNullOrWhiteSpace($cFileName)) {
        $cFileName = "pagina-sem-titulo"
    }

    return $cFileName
}

function Get-CanonicalSectionKey {
    param([string]$Title)

    $cNormalized = $Title.Trim().TrimEnd(":").ToLowerInvariant()
    switch -Regex ($cNormalized) {
        "^descri" { return "descricao" }
        "^sintaxe" { return "sintaxe" }
        "^par" { return "parametros" }
        "^retorno" { return "retorno" }
        "^exemplo" { return "exemplo" }
        "^programa fonte" { return "programa_fonte" }
        "^compat" { return "compatibilidade_banco" }
        "^sistemas operacionais" { return "sistemas_operacionais" }
        "^idioma" { return "idioma" }
        "^observa" { return "observacoes" }
        "^conteudo" { return "conteudo" }
        default { return ($cNormalized -replace "[^a-z0-9]+", "_").Trim("_") }
    }
}

function Add-Section {
    param(
        [System.Collections.Generic.List[object]]$Sections,
        [string]$Title,
        [string]$Value,
        [string]$Render = "text"
    )

    if ([string]::IsNullOrWhiteSpace($Title) -or [string]::IsNullOrWhiteSpace($Value)) {
        return
    }

    $Sections.Add([pscustomobject]@{
        key = Get-CanonicalSectionKey $Title
        title = $Title.Trim().TrimEnd(":")
        value = $Value.Trim()
        render = $Render
    })
}

function Convert-LinesToMarkdownTable {
    param([string[]]$Lines)

    $oOut = New-Object "System.Collections.Generic.List[string]"
    $oOut.Add("| Nome | Tipo | Descrição | Obrigatório |")
    $oOut.Add("| --- | --- | --- | --- |")

    foreach ($cLine in $Lines) {
        if ([string]::IsNullOrWhiteSpace($cLine)) {
            continue
        }

        $aParts = $cLine -split "\t"
        if ($aParts.Count -lt 4) {
            continue
        }

        $cRequired = $aParts[3].Trim()
        if ([string]::IsNullOrWhiteSpace($cRequired)) {
            $cRequired = "N"
        }

        $oOut.Add(
            "| " + $aParts[0].Trim() +
            " | " + $aParts[1].Trim() +
            " | " + $aParts[2].Trim() +
            " | " + $cRequired + " |"
        )
    }

    return ($oOut -join "`n")
}

function Try-ExtractParameterTableSection {
    param([object]$MainContent)

    foreach ($oTable in @($MainContent.getElementsByTagName("table"))) {
        $aRows = @($oTable.rows)
        if ($aRows.Count -lt 2) {
            continue
        }

        $aHeaderCells = @($aRows[0].cells)
        if ($aHeaderCells.Count -lt 4) {
            continue
        }

        $cHeader = ((0..3) | ForEach-Object { Get-NormalizedText $aHeaderCells[$_] }) -join "|"
        if ($cHeader -notmatch "^Nome\|Tipo\|Descri") {
            continue
        }

        $aLines = New-Object "System.Collections.Generic.List[string]"
        for ($nIndex = 1; $nIndex -lt $aRows.Count; $nIndex++) {
            $aCells = @($aRows[$nIndex].cells)
            if ($aCells.Count -lt 4) {
                continue
            }

            $aValues = @()
            foreach ($oCell in $aCells[0..3]) {
                $aValues += (Get-NormalizedText $oCell)
            }

            $aLines.Add(($aValues -join "`t"))
        }

        return [pscustomobject]@{
            title = "Parâmetros"
            markdown = Convert-LinesToMarkdownTable $aLines.ToArray()
            count = $aLines.Count
        }
    }

    return $null
}

function Get-SectionTitleFromLine {
    param([string]$Line)

    foreach ($cTitle in @("Descrição", "Sintaxe", "Parâmetros", "Retorno", "Exemplo", "Programa Fonte", "Observações")) {
        if ($Line -match ("^{0}\s*:" -f [regex]::Escape($cTitle))) {
            return $cTitle
        }
    }

    return ""
}

function Extract-SectionsFromText {
    param([string]$Text)

    $oSections = New-Object "System.Collections.Generic.List[object]"
    $aLines = $Text -split "`n"
    $cCurrentTitle = ""
    $oBuffer = New-Object "System.Collections.Generic.List[string]"

    foreach ($cRawLine in $aLines) {
        $cLine = $cRawLine.TrimEnd()
        $cFoundTitle = Get-SectionTitleFromLine $cLine

        if (-not [string]::IsNullOrWhiteSpace($cFoundTitle)) {
            if (-not [string]::IsNullOrWhiteSpace($cCurrentTitle) -and $oBuffer.Count -gt 0) {
                $cRender = if ($cCurrentTitle -in @("Sintaxe", "Exemplo")) { "code" } else { "text" }
                Add-Section -Sections $oSections -Title $cCurrentTitle -Value ($oBuffer -join "`n").Trim() -Render $cRender
            }

            $cCurrentTitle = $cFoundTitle
            $oBuffer = New-Object "System.Collections.Generic.List[string]"

            $cAfterColon = ($cLine -replace ("^{0}\s*:\s*" -f [regex]::Escape($cFoundTitle)), "").Trim()
            if (-not [string]::IsNullOrWhiteSpace($cAfterColon)) {
                $oBuffer.Add($cAfterColon)
            }
            continue
        }

        if (-not [string]::IsNullOrWhiteSpace($cCurrentTitle)) {
            $oBuffer.Add($cLine)
        }
    }

    if (-not [string]::IsNullOrWhiteSpace($cCurrentTitle) -and $oBuffer.Count -gt 0) {
        $cRender = if ($cCurrentTitle -in @("Sintaxe", "Exemplo")) { "code" } else { "text" }
        Add-Section -Sections $oSections -Title $cCurrentTitle -Value ($oBuffer -join "`n").Trim() -Render $cRender
    }

    return @($oSections.ToArray())
}

function Try-ExtractKeyValueSections {
    param([object]$MainContent)

    $oSections = New-Object "System.Collections.Generic.List[object]"

    foreach ($oTable in @($MainContent.getElementsByTagName("table"))) {
        $aRows = @($oTable.rows)
        if ($aRows.Count -eq 0) {
            continue
        }

        $lFound = $false
        foreach ($oRow in $aRows) {
            $aCells = @($oRow.cells)
            if ($aCells.Count -lt 2) {
                continue
            }

            $cLabel = Get-NormalizedText $aCells[0]
            $cValue = Get-NormalizedText $aCells[1]
            if ([string]::IsNullOrWhiteSpace($cLabel) -or [string]::IsNullOrWhiteSpace($cValue)) {
                continue
            }

            $cRender = if ($cLabel -match "^(Sintaxe|Exemplo)") { "code" } else { "text" }
            Add-Section -Sections $oSections -Title $cLabel -Value $cValue -Render $cRender
            $lFound = $true
        }

        if ($lFound) {
            return @($oSections.ToArray())
        }
    }

    return @($oSections.ToArray())
}

function Merge-SectionsByKey {
    param([object[]]$Sections)

    $oMerged = New-Object "System.Collections.Generic.List[object]"
    foreach ($oSection in $Sections) {
        $oExisting = $oMerged | Where-Object { $_.key -eq $oSection.key } | Select-Object -First 1
        if ($null -eq $oExisting) {
            $oMerged.Add($oSection)
            continue
        }

        if ($oExisting.value -notlike "*$($oSection.value)*") {
            $oExisting.value = ($oExisting.value.Trim() + "`n`n" + $oSection.value.Trim()).Trim()
            if ($oExisting.render -ne $oSection.render) {
                $oExisting.render = "text"
            }
        }
    }

    return @($oMerged.ToArray())
}

function Get-FunctionName {
    param([string]$Title)

    if ($Title -match "^([A-Za-z0-9_]+)\s*\(") {
        return $matches[1]
    }

    if ($Title -match "^([A-Za-z0-9_]+)\b") {
        return $matches[1]
    }

    return $Title
}

function Get-DocType {
    param(
        [string]$Title,
        [object[]]$Sections,
        [bool]$IsRestricted
    )

    if ($IsRestricted) {
        return "restricted"
    }

    $aSectionKeys = @($Sections | ForEach-Object { $_.key })
    if ($aSectionKeys -contains "sintaxe" -or $aSectionKeys -contains "parametros" -or $Title -match "^[A-Za-z0-9_]+(\(\))?(\s|-|$)") {
        return "function"
    }

    return "article"
}

function Add-FrontMatter {
    param(
        [System.Collections.Generic.List[string]]$Lines,
        [pscustomobject]$Metadata
    )

    $Lines.Add("---")
    $Lines.Add("title: `"$($Metadata.title)`"")
    $Lines.Add("function_name: `"$($Metadata.function_name)`"")
    $Lines.Add("doc_type: `"$($Metadata.doc_type)`"")
    $Lines.Add("status: `"$($Metadata.status)`"")
    $Lines.Add("page_id: $($Metadata.page_id)")
    $Lines.Add("source_url: `"$($Metadata.source_url)`"")
    $Lines.Add("tdn_last_modified: `"$($Metadata.tdn_last_modified)`"")
    $Lines.Add("exported_at: `"$($Metadata.exported_at)`"")
    $Lines.Add("has_parameters: $($Metadata.has_parameters.ToString().ToLowerInvariant())")
    $Lines.Add("has_example: $($Metadata.has_example.ToString().ToLowerInvariant())")
    $Lines.Add("section_keys: [$($Metadata.section_keys -join ', ')]")
    $Lines.Add("tags:")
    foreach ($cTag in $Metadata.tags) {
        $Lines.Add("- `"$cTag`"")
    }
    $Lines.Add("---")
    $Lines.Add("")
}

function Add-MarkdownSection {
    param(
        [System.Collections.Generic.List[string]]$Lines,
        [pscustomobject]$Section
    )

    $Lines.Add("## $($Section.title)")
    $Lines.Add("")

    if ($Section.render -in @("code", "table")) {
        if ($Section.render -eq "code") {
            $Lines.Add('```text')
            $Section.value.Split("`n") | ForEach-Object { $Lines.Add($_.TrimEnd()) }
            $Lines.Add('```')
        } else {
            $Section.value.Split("`n") | ForEach-Object { $Lines.Add($_.TrimEnd()) }
        }
    } else {
        $Section.value.Split("`n") | ForEach-Object { $Lines.Add($_.TrimEnd()) }
    }

    $Lines.Add("")
}

function Convert-PageToMarkdown {
    param(
        [pscustomobject]$Page,
        [string]$OutputDirectory
    )

    $cPageUrl = "https://tdn.totvs.com/pages/releaseview.action?pageId=$($Page.id)"
    $cHtml = Get-WebString $cPageUrl

    $oDoc = New-Object -ComObject "HTMLFile"
    $oDoc.IHTMLDocument2_write($cHtml)

    $oMainContent = $oDoc.getElementById("main-content")
    if ($null -eq $oMainContent) {
        throw "Nao foi possivel localizar o conteudo principal da pagina $($Page.title)."
    }

    $cTitle = $Page.title
    $oTitleNode = $oMainContent.getElementsByTagName("h1") | Select-Object -First 1
    if ($null -ne $oTitleNode) {
        $cTitle = Get-NormalizedText $oTitleNode
    }

    $cLastModified = ""
    if ($cHtml -match "class='last-modified'.*?>([^<]+)</a>") {
        $cLastModified = [System.Net.WebUtility]::HtmlDecode($matches[1]).Trim()
    }

    $cMainText = Get-NormalizedText $oMainContent
    $lRestricted = $cMainText -match "Erro:\s+Você está tentando visualizar uma página"

    $oSections = New-Object "System.Collections.Generic.List[object]"
    $oParameterTable = $null

    if (-not $lRestricted) {
        $oParameterTable = Try-ExtractParameterTableSection $oMainContent
        $aKeyValueSections = @()
        if ($null -eq $oParameterTable) {
            $aKeyValueSections = @(Try-ExtractKeyValueSections $oMainContent)
        }

        if ($aKeyValueSections.Count -gt 0) {
            foreach ($oSection in $aKeyValueSections) {
                $oSections.Add($oSection)
            }
        }

        if ($null -ne $oParameterTable) {
            $oMergedSource = New-Object "System.Collections.Generic.List[object]"
            foreach ($oSection in $oSections) {
                if ($oSection.key -ne "parametros") {
                    $oMergedSource.Add($oSection)
                }
            }
            $oMergedSource.Add([pscustomobject]@{
                key = "parametros"
                title = "Parâmetros"
                value = $oParameterTable.markdown
                render = "table"
            })
            $aMergedSections = @(Merge-SectionsByKey $oMergedSource.ToArray())
            $oSections = New-Object "System.Collections.Generic.List[object]"
            foreach ($oSection in $aMergedSections) {
                $oSections.Add($oSection)
            }
        }

        if ($oSections.Count -eq 0) {
            $oParsedTextSections = Extract-SectionsFromText $cMainText
            foreach ($oSection in $oParsedTextSections) {
                $oSections.Add($oSection)
            }
        } else {
            $oParsedTextSections = Extract-SectionsFromText $cMainText
            foreach ($oSection in $oParsedTextSections) {
                if (-not ($oSections | Where-Object { $_.key -eq $oSection.key })) {
                    $oSections.Add($oSection)
                }
            }
        }
    } else {
        Add-Section -Sections $oSections -Title "Conteúdo" -Value $cMainText -Render "text"
    }

    if ($oSections.Count -eq 0) {
        Add-Section -Sections $oSections -Title "Conteúdo" -Value $cMainText -Render "text"
    }

    $oSections = @(Merge-SectionsByKey $oSections.ToArray())

    $cDocType = Get-DocType -Title $cTitle -Sections $oSections -IsRestricted $lRestricted
    $cStatus = if ($lRestricted) { "restricted" } else { "published" }
    $cFunctionName = Get-FunctionName $cTitle
    $cFileName = "$(Get-SafeFileName $cTitle).md"
    $cOutputPath = Join-Path $OutputDirectory $cFileName

    $oMetadata = [pscustomobject]@{
        title = $cTitle
        function_name = $cFunctionName
        doc_type = $cDocType
        status = $cStatus
        page_id = $Page.id
        source_url = $cPageUrl
        tdn_last_modified = $cLastModified
        exported_at = (Get-Date -Format "yyyy-MM-dd HH:mm:ss")
        has_parameters = [bool]($oSections | Where-Object { $_.key -eq "parametros" })
        has_example = [bool]($oSections | Where-Object { $_.key -eq "exemplo" })
        section_keys = @($oSections | ForEach-Object { $_.key })
        tags = @("advpl", "tdn", "totvs", $cDocType)
    }

    $oLines = New-Object "System.Collections.Generic.List[string]"
    Add-FrontMatter -Lines $oLines -Metadata $oMetadata
    $oLines.Add("# $cTitle")
    $oLines.Add("")
    $oLines.Add("> Fonte oficial: $cPageUrl")
    $oLines.Add("")

    foreach ($oSection in $oSections) {
        Add-MarkdownSection -Lines $oLines -Section $oSection
    }

    [System.IO.File]::WriteAllText($cOutputPath, ($oLines -join "`r`n"), [System.Text.UTF8Encoding]::new($false))

    return [pscustomobject]@{
        title = $cTitle
        function_name = $cFunctionName
        page_id = $Page.id
        file_name = $cFileName
        file_path = $cOutputPath
        doc_type = $cDocType
        status = $cStatus
        source_url = $cPageUrl
        section_keys = @($oSections | ForEach-Object { $_.key })
    }
}

$cFunctionsDirectory = Join-Path $OutputRoot "funcoes"
New-Item -ItemType Directory -Force -Path $cFunctionsDirectory | Out-Null
Get-ChildItem -Path $cFunctionsDirectory -Filter "*.md" -File | Remove-Item -Force

$cApiUrl = "https://tdn.totvs.com/rest/api/content/212898493/child/page?limit=$Limit"
$oResponse = Get-WebString $cApiUrl | ConvertFrom-Json
$aPages = @($oResponse.results | Where-Object { $_.title -and $_.title -ne "_TemplateFuncao" })

$aGeneratedFiles = New-Object "System.Collections.Generic.List[object]"
foreach ($oPage in $aPages) {
    try {
        $aGeneratedFiles.Add((Convert-PageToMarkdown -Page $oPage -OutputDirectory $cFunctionsDirectory))
    } catch {
        Write-Warning ("Falha ao gerar pagina {0} ({1}): {2}" -f $oPage.title, $oPage.id, $_.Exception.Message)
    }
}

$aSorted = @($aGeneratedFiles | Sort-Object title)
$nFunctionCount = @($aGeneratedFiles | Where-Object { $_.doc_type -eq "function" -and $_.status -eq "published" }).Count
$nArticleCount = @($aGeneratedFiles | Where-Object { $_.doc_type -eq "article" -and $_.status -eq "published" }).Count
$nRestrictedCount = @($aGeneratedFiles | Where-Object { $_.status -eq "restricted" }).Count

$oReadmeLines = New-Object "System.Collections.Generic.List[string]"
$oReadmeLines.Add("# Referencia local do TDN AdvPL")
$oReadmeLines.Add("")
$oReadmeLines.Add("Colecao em Markdown preparada para leitura humana e ingestao por IA.")
$oReadmeLines.Add("")
$oReadmeLines.Add("- Fonte do indice: https://tdn.totvs.com/pages/viewpage.action?pageId=212898493")
$oReadmeLines.Add("- Total exportado: $($aGeneratedFiles.Count)")
$oReadmeLines.Add("- Funcoes publicadas: $nFunctionCount")
$oReadmeLines.Add("- Artigos publicados: $nArticleCount")
$oReadmeLines.Add("- Paginas restritas: $nRestrictedCount")
$oReadmeLines.Add('- Pasta principal: `funcoes/`')
$oReadmeLines.Add('- Catalogo auxiliar: `catalogo.json`')
$oReadmeLines.Add("- Data de geracao: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')")
$oReadmeLines.Add("")
$oReadmeLines.Add("## Estrutura AI-ready")
$oReadmeLines.Add("")
$oReadmeLines.Add("- Frontmatter YAML com metadados estaveis")
$oReadmeLines.Add("- Secoes canonicas para chunking e busca semantica")
$oReadmeLines.Add('- Classificacao por `doc_type` e `status`')
$oReadmeLines.Add("- Tabelas de parametros preservadas em Markdown")
$oReadmeLines.Add("")
$oReadmeLines.Add("## Arquivos")
$oReadmeLines.Add("")

foreach ($oFile in $aSorted) {
    $oReadmeLines.Add("- [$($oFile.title)](funcoes/$($oFile.file_name)) - $($oFile.doc_type) / $($oFile.status)")
}

[System.IO.File]::WriteAllText(
    (Join-Path $OutputRoot "README.md"),
    ($oReadmeLines -join "`r`n"),
    [System.Text.UTF8Encoding]::new($false)
)

$aCatalog = @($aSorted | ForEach-Object {
    [pscustomobject]@{
        title = $_.title
        function_name = $_.function_name
        page_id = $_.page_id
        file_name = $_.file_name
        relative_path = "funcoes/$($_.file_name)"
        doc_type = $_.doc_type
        status = $_.status
        source_url = $_.source_url
        section_keys = $_.section_keys
    }
})

[System.IO.File]::WriteAllText(
    (Join-Path $OutputRoot "catalogo.json"),
    ($aCatalog | ConvertTo-Json -Depth 6),
    [System.Text.UTF8Encoding]::new($false)
)

Write-Host ("Paginas exportadas: {0}" -f $aGeneratedFiles.Count)
