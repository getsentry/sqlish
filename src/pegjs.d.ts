declare module '*.pegjs' {
  interface PeggyParser {
    parse(input: string): any;
  }
  const parser: PeggyParser;
  export default parser;
} 