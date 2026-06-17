param(
    [string]$OutputRoot = "doc/advpl-terminal",
    [string]$CategoryUrl = "https://terminaldeinformacao.com/knowledgebase_category/advpl/"
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

    foreach ($cInvalidChar in [System.IO.Path]::GetInvalidFileNameChars()) {
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
        "^resumo" { return "resumo" }
        "^descri" { return "descricao" }
        "^exemplo da rotina" { return "assinatura" }
        "^exemplo em v" { return "video" }
        "^observa" { return "observacoes" }
        "^refer" { return "referencias" }
        "^exemplo" { return "exemplo" }
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

function Merge-Sections {
    param([object[]]$Sections)

    $oMerged = New-Object "System.Collections.Generic.List[object]"
    foreach ($oSection in $Sections) {
        $oExisting = $oMerged | Where-Object { $_.key -eq $oSection.key -and $_.title -eq $oSection.title } | Select-Object -First 1
        if ($null -eq $oExisting) {
            $oMerged.Add($oSection)
            continue
        }

        if ($oExisting.value -notlike "*$($oSection.value)*") {
            $oExisting.value = ($oExisting.value.Trim() + "`n`n" + $oSection.value.Trim()).Trim()
        }
    }

    return @($oMerged.ToArray())
}

function Convert-ListToMarkdown {
    param([string]$Text)

    $aLines = $Text -split "`n" | Where-Object { -not [string]::IsNullOrWhiteSpace($_.Trim()) }
    $oOut = New-Object "System.Collections.Generic.List[string]"
    foreach ($cLine in $aLines) {
        $oOut.Add("- " + $cLine.Trim())
    }
    return ($oOut -join "`n")
}

function Get-FunctionName {
    param([string]$Title)

    if ($Title -match "^([A-Za-z0-9_\.]+)\s*\(") {
        return $matches[1]
    }

    if ($Title -match "^([A-Za-z0-9_\.]+)\b") {
        return $matches[1]
    }

    return $Title
}

function Get-TdnLookup {
    param([string]$CatalogPath)

    $oLookup = @{}
    if (-not (Test-Path $CatalogPath)) {
        return $oLookup
    }

    $aItems = Get-Content $CatalogPath -Encoding UTF8 | ConvertFrom-Json
    foreach ($oItem in $aItems) {
        $cKey = ([string]$oItem.function_name).ToLowerInvariant()
        if (-not [string]::IsNullOrWhiteSpace($cKey) -and -not $oLookup.ContainsKey($cKey)) {
            $oLookup[$cKey] = [pscustomobject]@{
                title = $oItem.title
                relative_path = "doc/advpl/" + $oItem.relative_path
                doc_type = $oItem.doc_type
            }
        }
    }

    return $oLookup
}

function Get-CommunityLinks {
    param([string]$Url)

    $cHtml = Get-WebString $Url
    $oDoc = New-Object -ComObject "HTMLFile"
    $oDoc.IHTMLDocument2_write($cHtml)

    $oLinks = @{}
    foreach ($oAnchor in @($oDoc.getElementsByTagName("a"))) {
        $cHref = [string]$oAnchor.href
        $cText = Get-NormalizedText $oAnchor

        if ($cHref -notmatch "^https://terminaldeinformacao\.com/knowledgebase/[^/]+/?$") {
            continue
        }

        if ($cText -like "*Home*" -or $cText -like "*Knowledgebase*" -or [string]::IsNullOrWhiteSpace($cText)) {
            continue
        }

        if (-not $oLinks.ContainsKey($cHref)) {
            $oLinks[$cHref] = [pscustomobject]@{
                title = $cText
                url = $cHref
            }
        }
    }

    return @($oLinks.Values | Sort-Object title)
}

function Convert-CommunityPage {
    param(
        [pscustomobject]$Link,
        [string]$OutputDirectory,
        [hashtable]$TdnLookup
    )

    $cHtml = Get-WebString $Link.url
    $oDoc = New-Object -ComObject "HTMLFile"
    $oDoc.IHTMLDocument2_write($cHtml)

    $oArticle = $oDoc.getElementsByTagName("article") | Select-Object -First 1
    if ($null -eq $oArticle) {
        throw "Nao foi possivel localizar o artigo principal."
    }

    $cTitle = $Link.title
    $oHeader = $oArticle.getElementsByTagName("header") | Select-Object -First 1
    if ($null -ne $oHeader) {
        $cHeaderText = Get-NormalizedText $oHeader
        if (-not [string]::IsNullOrWhiteSpace($cHeaderText)) {
            $cTitle = ($cHeaderText -split "`n" | Select-Object -First 1).Trim()
        }
    }

    $cArticleClass = [string]$oArticle.className
    $cCategorySlug = "advpl"
    if ($cArticleClass -match "kbe_taxonomy-([a-z0-9\-]+)") {
        $cCategorySlug = $matches[1]
    }

    $oEntryContent = $oArticle.children | Where-Object { $_.className -like "*entry-content*" } | Select-Object -First 1
    if ($null -eq $oEntryContent) {
        throw "Nao foi possivel localizar o bloco entry-content."
    }

    $oSections = New-Object "System.Collections.Generic.List[object]"
    $cSummary = ""
    $cCurrentHeading = ""
    $nExampleCount = 0
    $lHasVideo = $false

    foreach ($oChild in @($oEntryContent.children)) {
        $cTag = ([string]$oChild.tagName).ToUpperInvariant()
        $cText = Get-NormalizedText $oChild

        if ([string]::IsNullOrWhiteSpace($cText)) {
            continue
        }

        switch ($cTag) {
            "H1" {
                $cCurrentHeading = $cText.Trim()
                continue
            }
            "PRE" {
                if ($cCurrentHeading -match "^Exemplo da Rotina") {
                    Add-Section -Sections $oSections -Title "Exemplo da Rotina" -Value $cText -Render "code"
                } elseif ($cCurrentHeading -match "^Exemplo") {
                    $nExampleCount++
                    Add-Section -Sections $oSections -Title $cCurrentHeading -Value $cText -Render "code"
                } else {
                    Add-Section -Sections $oSections -Title "Código" -Value $cText -Render "code"
                }
                continue
            }
            "UL" {
                if (-not [string]::IsNullOrWhiteSpace($cCurrentHeading)) {
                    $cRender = if ($cCurrentHeading -match "^Refer") { "list" } else { "list" }
                    Add-Section -Sections $oSections -Title $cCurrentHeading -Value (Convert-ListToMarkdown $cText) -Render $cRender
                }
                continue
            }
            "DIV" {
                continue
            }
            default {
                if ([string]::IsNullOrWhiteSpace($cCurrentHeading) -and [string]::IsNullOrWhiteSpace($cSummary)) {
                    $cSummary = $cText
                    continue
                }

                if ($cCurrentHeading -match "^Exemplo em V") {
                    $lHasVideo = $true
                }

                if (-not [string]::IsNullOrWhiteSpace($cCurrentHeading)) {
                    Add-Section -Sections $oSections -Title $cCurrentHeading -Value $cText -Render "text"
                }
            }
        }
    }

    if (-not [string]::IsNullOrWhiteSpace($cSummary)) {
        Add-Section -Sections $oSections -Title "Resumo" -Value $cSummary -Render "text"
    }

    $aSections = Merge-Sections $oSections.ToArray()
    $cFunctionName = Get-FunctionName $cTitle
    $cLookupKey = $cFunctionName.ToLowerInvariant()
    $oRelatedTdn = $null
    if ($TdnLookup.ContainsKey($cLookupKey)) {
        $oRelatedTdn = $TdnLookup[$cLookupKey]
    }

    $cFileName = "$(Get-SafeFileName $cTitle).md"
    $cOutputPath = Join-Path $OutputDirectory $cFileName

    $oLines = New-Object "System.Collections.Generic.List[string]"
    $oLines.Add("---")
    $oLines.Add("title: `"$cTitle`"")
    $oLines.Add("function_name: `"$cFunctionName`"")
    $oLines.Add('source_type: "community"')
    $oLines.Add('authority: "supplemental"')
    $oLines.Add('doc_type: "knowledgebase_item"')
    $oLines.Add('needs_review: true')
    $oLines.Add("category_slug: `"$cCategorySlug`"")
    $oLines.Add("source_url: `"$($Link.url)`"")
    $oLines.Add("has_examples: $(([bool]($nExampleCount -gt 0)).ToString().ToLowerInvariant())")
    $oLines.Add("example_count: $nExampleCount")
    $oLines.Add("has_video_reference: $($lHasVideo.ToString().ToLowerInvariant())")
    if ($null -ne $oRelatedTdn) {
        $oLines.Add("related_tdn_path: `"$($oRelatedTdn.relative_path)`"")
        $oLines.Add("related_tdn_title: `"$($oRelatedTdn.title)`"")
    } else {
        $oLines.Add('related_tdn_path: ""')
        $oLines.Add('related_tdn_title: ""')
    }
    $oLines.Add("section_keys: [$((@($aSections | ForEach-Object { $_.key }) -join ', '))]")
    $oLines.Add("exported_at: `"$((Get-Date).ToString('yyyy-MM-dd HH:mm:ss'))`"")
    $oLines.Add("---")
    $oLines.Add("")
    $oLines.Add("# $cTitle")
    $oLines.Add("")
    $oLines.Add("> Fonte comunitaria: $($Link.url)")
    if ($null -ne $oRelatedTdn) {
        $oLines.Add("> Referencia oficial relacionada: $($oRelatedTdn.relative_path)")
    }
    $oLines.Add("")

    foreach ($oSection in $aSections) {
        $oLines.Add("## $($oSection.title)")
        $oLines.Add("")
        if ($oSection.render -eq "code") {
            $oLines.Add('```advpl')
            $oSection.value.Split("`n") | ForEach-Object { $oLines.Add($_.TrimEnd()) }
            $oLines.Add('```')
        } else {
            $oSection.value.Split("`n") | ForEach-Object { $oLines.Add($_.TrimEnd()) }
        }
        $oLines.Add("")
    }

    [System.IO.File]::WriteAllText($cOutputPath, ($oLines -join "`r`n"), [System.Text.UTF8Encoding]::new($false))

    return [pscustomobject]@{
        title = $cTitle
        function_name = $cFunctionName
        file_name = $cFileName
        relative_path = "itens/$cFileName"
        category_slug = $cCategorySlug
        source_url = $Link.url
        example_count = $nExampleCount
        has_video_reference = $lHasVideo
        related_tdn_path = if ($null -ne $oRelatedTdn) { $oRelatedTdn.relative_path } else { "" }
        section_keys = @($aSections | ForEach-Object { $_.key })
    }
}

$cItemsDirectory = Join-Path $OutputRoot "itens"
New-Item -ItemType Directory -Force -Path $cItemsDirectory | Out-Null
Get-ChildItem -Path $cItemsDirectory -Filter "*.md" -File | Remove-Item -Force

$hTdnLookup = Get-TdnLookup -CatalogPath "doc/advpl/catalogo.json"
$aLinks = Get-CommunityLinks $CategoryUrl
$aGenerated = New-Object "System.Collections.Generic.List[object]"

foreach ($oLink in $aLinks) {
    try {
        $aGenerated.Add((Convert-CommunityPage -Link $oLink -OutputDirectory $cItemsDirectory -TdnLookup $hTdnLookup))
    } catch {
        Write-Warning ("Falha ao gerar item {0}: {1}" -f $oLink.url, $_.Exception.Message)
    }
}

$aSorted = @($aGenerated | Sort-Object title)
$nWithExamples = @($aGenerated | Where-Object { $_.example_count -gt 0 }).Count
$nWithTdn = @($aGenerated | Where-Object { -not [string]::IsNullOrWhiteSpace($_.related_tdn_path) }).Count

$oReadme = New-Object "System.Collections.Generic.List[string]"
$oReadme.Add("# Referencia comunitaria AdvPL - Terminal de Informacao")
$oReadme.Add("")
$oReadme.Add("Colecao separada da base oficial, voltada para exemplos praticos e consulta humano+AI.")
$oReadme.Add("")
$oReadme.Add("- Fonte base: $CategoryUrl")
$oReadme.Add("- Total exportado: $($aGenerated.Count)")
$oReadme.Add("- Itens com exemplos: $nWithExamples")
$oReadme.Add("- Itens com correspondencia no corpus TDN: $nWithTdn")
$oReadme.Add('- Pasta principal: `itens/`')
$oReadme.Add('- Catalogo auxiliar: `catalogo.json`')
$oReadme.Add("")
$oReadme.Add("## Regras de uso")
$oReadme.Add("")
$oReadme.Add("- Tratar este corpus como complementar ao TDN")
$oReadme.Add("- Revisar exemplos antes de reutilizar em codigo produtivo")
$oReadme.Add("- Priorizar a documentacao oficial para assinatura e comportamento")
$oReadme.Add("")
$oReadme.Add("## Arquivos")
$oReadme.Add("")
foreach ($oItem in $aSorted) {
    $oReadme.Add("- [$($oItem.title)](itens/$($oItem.file_name)) - exemplos: $($oItem.example_count) - categoria: $($oItem.category_slug)")
}

[System.IO.File]::WriteAllText(
    (Join-Path $OutputRoot "README.md"),
    ($oReadme -join "`r`n"),
    [System.Text.UTF8Encoding]::new($false)
)

[System.IO.File]::WriteAllText(
    (Join-Path $OutputRoot "catalogo.json"),
    (($aSorted | ConvertTo-Json -Depth 6) -as [string]),
    [System.Text.UTF8Encoding]::new($false)
)

Write-Host ("Itens exportados: {0}" -f $aGenerated.Count)
