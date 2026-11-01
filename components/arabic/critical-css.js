import 'server-only';

import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

// next.config.mjs explicitly includes these authored files in Arabic server traces.
// Read immutable stylesheet content once when this server module initializes.
const baseCss = readFileSync(join(process.cwd(), 'app', 'ar', 'arabic.css'), 'utf8');
const cardsCss = readFileSync(join(process.cwd(), 'components', 'arabic', 'blog', 'cards.css'), 'utf8');

// Page-specific CSS modules stay unlayered and therefore override normal base
// rules regardless of streaming or stylesheet insertion order.
export const arabicCriticalCss = `@layer arabic-base{\n${baseCss}\n${cardsCss}\n}`;
export const arabicCriticalCssHref = `arabic-base-${createHash('sha256').update(arabicCriticalCss).digest('hex').slice(0, 16)}`;
