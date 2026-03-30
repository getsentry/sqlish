import type { Token } from "./types";
import { string } from "./formatters/string";
import { SQLishParser } from "./SQLishParser";

type StringFormatterOptions = Parameters<typeof string>[1];

export class SQLishFormatter {
  parser: SQLishParser;

  constructor() {
    this.parser = new SQLishParser();
  }

  toString(sql: string, options?: StringFormatterOptions): string {
    let tokens: Token[];

    try {
      tokens = this.parser.parse(sql);
    } catch {
      // If we fail to parse the SQL, return the original string
      return sql;
    }

    return string(tokens, options);
  }
}
