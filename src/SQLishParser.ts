import type { Token } from './types';
import { parse } from './sqlish-grammar.js';

export class SQLishParser {
  parse(sql: string): Token[] {
    return parse(sanitize(sql)) as Token[];
  }
}

// Strips Unicode control characters that have no meaning in SQL syntax and
// cause the PEG parser to fail. These typically appear from copy-paste
// artifacts (terminals, rich text editors, web pages) or data pipelines.
//
// Stripped ranges:
//   \u0000-\u0008  C0 controls: NUL, SOH, STX, ETX, EOT, ENQ, ACK, BEL, BS
//   \u000B         Vertical tab
//   \u000C         Form feed
//   \u000E-\u001F  C0 controls: SO, SI, DLE, DC1-DC4, NAK, SYN, ETB, CAN, EM, SUB, ESC, FS, GS, RS, US
//   \u007F         DEL
//   \u0080-\u009F  C1 controls (rarely used, often copy-paste artifacts from legacy encodings)
//
// Preserved: \u0009 (tab), \u000A (line feed), \u000D (carriage return) —
// these are valid whitespace that the grammar tokenizes normally.
/* oxlint-disable no-control-regex */
const CONTROL_CHARACTERS = new RegExp(
  '[\\u0000-\\u0008\\u000B\\u000C\\u000E-\\u001F\\u007F-\\u009F]',
  'g'
);
/* oxlint-enable no-control-regex */

function sanitize(sql: string): string {
  return sql.replace(CONTROL_CHARACTERS, '');
}
