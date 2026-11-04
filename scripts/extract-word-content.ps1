param(
  [Parameter(Mandatory=$true)][string]$Source,
  [Parameter(Mandatory=$true)][string]$OutputDirectory
)
$ErrorActionPreference = 'Stop'
New-Item -ItemType Directory -Path $OutputDirectory -Force | Out-Null
Add-Type -AssemblyName System.IO.Compression.FileSystem
$stream = [IO.File]::Open((Resolve-Path -LiteralPath $Source).ProviderPath, [IO.FileMode]::Open, [IO.FileAccess]::Read, [IO.FileShare]::ReadWrite)
$zip = [IO.Compression.ZipArchive]::new($stream, [IO.Compression.ZipArchiveMode]::Read)
try {
  function Read-Entry([string]$name) {
    $entry = $zip.GetEntry($name)
    if (-not $entry) { return $null }
    $reader = [IO.StreamReader]::new($entry.Open())
    try { $reader.ReadToEnd() } finally { $reader.Dispose() }
  }
  [xml]$doc = Read-Entry 'word/document.xml'
  [xml]$relationships = Read-Entry 'word/_rels/document.xml.rels'
  [xml]$numbering = Read-Entry 'word/numbering.xml'
  [xml]$styles = Read-Entry 'word/styles.xml'
  $ns = [Xml.XmlNamespaceManager]::new($doc.NameTable)
  $ns.AddNamespace('w', 'http://schemas.openxmlformats.org/wordprocessingml/2006/main')
  $ns.AddNamespace('a', 'http://schemas.openxmlformats.org/drawingml/2006/main')
  $ns.AddNamespace('r', 'http://schemas.openxmlformats.org/officeDocument/2006/relationships')
  $ns.AddNamespace('wp', 'http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing')
  function W-Value($node) { if ($node) { $node.GetAttribute('val', $ns.LookupNamespace('w')) } else { '' } }
  function Toggle-Value($node) { if (-not $node) { return $null }; (W-Value $node) -notin @('0','false','off') }
  $rels = @{}
  foreach ($rel in $relationships.Relationships.Relationship) { $rels[$rel.Id] = $rel.Target }
  $styleMap = @{}
  foreach ($style in $styles.SelectNodes('//w:style', $ns)) { $styleMap[$style.GetAttribute('styleId', $ns.LookupNamespace('w'))] = $style }
  function Paragraph-Block($node) {
    $styleId = W-Value ($node.SelectSingleNode('w:pPr/w:pStyle', $ns))
    $style = $styleMap[$styleId]
    $number = $node.SelectSingleNode('w:pPr/w:numPr', $ns)
    if (-not $number -and $style) { $number = $style.SelectSingleNode('w:pPr/w:numPr', $ns) }
    $numId = if ($number) { W-Value ($number.SelectSingleNode('w:numId', $ns)) } else { '' }
    $level = if ($number) { W-Value ($number.SelectSingleNode('w:ilvl', $ns)) } else { '' }
    if ($numId -and -not $level) { $level = '0' }
    $numberFormat = ''
    $numberStart = 1
    if ($numId -and $numbering) {
      $definition = $numbering.SelectSingleNode("//w:num[@w:numId='$numId']", $ns)
      $abstractId = W-Value ($definition.SelectSingleNode('w:abstractNumId', $ns))
      $levelNode = $numbering.SelectSingleNode("//w:abstractNum[@w:abstractNumId='$abstractId']/w:lvl[@w:ilvl='$level']", $ns)
      $numberFormat = W-Value ($levelNode.SelectSingleNode('w:numFmt', $ns))
      $startOverride = $definition.SelectSingleNode("w:lvlOverride[@w:ilvl='$level']/w:startOverride", $ns)
      $start = if ($startOverride) { W-Value $startOverride } else { W-Value ($levelNode.SelectSingleNode('w:start', $ns)) }
      if ($start) { $numberStart = [int]$start }
    }
    $runs = @($node.SelectNodes('.//w:r', $ns) | ForEach-Object {
      $text = ($_.SelectNodes('w:t|w:tab|w:br', $ns) | ForEach-Object { if ($_.LocalName -eq 't') { $_.InnerText } elseif ($_.LocalName -eq 'tab') { "`t" } else { "`n" } }) -join ''
      if ($text) {
        $parent = $_.ParentNode
        while ($parent -and $parent -ne $node -and $parent.LocalName -ne 'hyperlink') { $parent = $parent.ParentNode }
        $url = if ($parent -and $parent.LocalName -eq 'hyperlink') { $rels[$parent.GetAttribute('id', $ns.LookupNamespace('r'))] } else { $null }
        $bold = Toggle-Value ($_.SelectSingleNode('w:rPr/w:b|w:rPr/w:bCs', $ns))
        $italic = Toggle-Value ($_.SelectSingleNode('w:rPr/w:i|w:rPr/w:iCs', $ns))
        if ($null -eq $bold -and $style) { $bold = Toggle-Value ($style.SelectSingleNode('w:rPr/w:b|w:rPr/w:bCs', $ns)) }
        [pscustomobject]@{ text=$text; bold=[bool]$bold; italic=[bool]$italic; url=$url }
      }
    })
    $pictures = @($node.SelectNodes('.//a:blip', $ns) | ForEach-Object {
      $drawing = $_.ParentNode
      while ($drawing -and $drawing.LocalName -ne 'drawing') { $drawing = $drawing.ParentNode }
      $properties = $drawing.SelectSingleNode('.//wp:docPr', $ns)
      [pscustomobject]@{ path=$rels[$_.GetAttribute('embed',$ns.LookupNamespace('r'))]; alt=$properties.GetAttribute('descr'); title=$properties.GetAttribute('title') }
    })
    [pscustomobject]@{ style=$styleId; text=($runs.text -join ''); runs=$runs; images=$pictures; numId=$numId; level=$level; numberFormat=$numberFormat; numberStart=$numberStart; outlineLevel=if($style){W-Value ($style.SelectSingleNode('w:pPr/w:outlineLvl', $ns))}else{''} }
  }
  $index = 0
  $blocks = @($doc.DocumentElement.SelectSingleNode('w:body', $ns).ChildNodes | ForEach-Object {
    if ($_.LocalName -eq 'p') {
      $paragraph = Paragraph-Block $_
      $paragraph | Add-Member -NotePropertyName index -NotePropertyValue $index
      $index++
      $paragraph | Add-Member -NotePropertyName type -NotePropertyValue 'p'
      $paragraph
    } elseif ($_.LocalName -eq 'tbl') {
      [pscustomobject]@{index=$index++; type='table'; rows=@($_.SelectNodes('w:tr',$ns) | ForEach-Object { ,@($_.SelectNodes('w:tc',$ns) | ForEach-Object { @($_.SelectNodes('w:p',$ns) | ForEach-Object { Paragraph-Block $_ }) }) })}
    }
  })
  $blocks | ConvertTo-Json -Depth 20 | Set-Content -LiteralPath (Join-Path $OutputDirectory 'document-blocks.json') -Encoding utf8
  $blocks | ForEach-Object { "[$($_.index)] [$($_.style)] [num:$($_.numId)/$($_.level)/$($_.numberFormat)] $($_.text)"; foreach ($picture in $_.images) { "IMAGE: $($picture.path) ALT: $($picture.alt)" } } | Set-Content -LiteralPath (Join-Path $OutputDirectory 'document-text.txt') -Encoding utf8
  $media = @($zip.Entries | Where-Object { $_.FullName.StartsWith('word/media/') })
  foreach ($entry in $media) { [IO.Compression.ZipFileExtensions]::ExtractToFile($entry, (Join-Path $OutputDirectory $entry.Name), $true) }
  [pscustomobject]@{ Blocks=$blocks.Count; Images=$media.Count; Headings=@($blocks | Where-Object {$_.style -match 'Heading|Title' -or $_.text -match '^H[1-3]\s*:'}).Count; NativeListItems=@($blocks | Where-Object numId).Count; OutputDirectory=$OutputDirectory } | ConvertTo-Json -Compress
} finally { $zip.Dispose() }
