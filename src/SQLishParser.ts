import type { Token } from './types';
import { parse } from './sqlish-grammar.js';

export class SQLishParser {
  parse(sql: string): Token[] {
    return parse(sql) as Token[];
  }
}
