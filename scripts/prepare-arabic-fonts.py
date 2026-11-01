"""Prepare licensed Arabic/Latin WOFF2 subsets. Requires fonttools and brotli.
The application builds from committed assets and does not run this script.
"""
from pathlib import Path
from fontTools import subset
from fontTools.ttLib import TTFont

font_root = Path(__file__).resolve().parents[1] / 'public/assets/arabic/fonts'
# Keep a stable Arabic repertoire, including future text, rather than only
# characters present in today's articles. Retain common borrowed letters used
# in Egyptian articles, brands and names: peh, tcheh, jeh, veh and gaf.
arabic = (set(range(0x600, 0x620)) | set(range(0x621, 0x63b)) |
          set(range(0x640, 0x66e)) | {0x670, 0x671} |
          set(range(0x6f0, 0x6fa)) | {0x67e, 0x686, 0x698, 0x6a4, 0x6af})
allowed = (set(range(0x20, 0x250)) | arabic |
           set(range(0x2000, 0x2070)) | set(range(0x20a0, 0x20d0)) |
           set(range(0x2190, 0x2200)) | set(range(0x25a0, 0x27c0)))
for weight in (400, 500, 600):
    font = TTFont(font_root / f'plex-{weight}.woff2', recalcTimestamp=False)
    options = subset.Options()
    options.layout_features = ['*']  # Preserve Arabic shaping and ligatures.
    worker = subset.Subsetter(options=options)
    worker.populate(unicodes=allowed)
    worker.subset(font)
    for record in font['name'].names:
        if record.nameID in (1, 3, 4, 6, 16):
            name = record.toUnicode().replace('IBM Plex Sans Arabic', 'UAE Arabic').replace('IBMPlexSansArabic', 'UAEArabic')
            record.string = name.encode(record.getEncoding())
    font.flavor = 'woff2'
    target = font_root / f'uae-arabic-{weight}.woff2'
    font.save(target)
    print(target.name, target.stat().st_size)
