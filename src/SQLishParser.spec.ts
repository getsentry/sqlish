import { SQLishParser } from './SQLishParser';

describe('SQLishParser', () => {
  describe('SQLishParser()', () => {
    const parser = new SQLishParser();

    it.each([
      'SELECT;',
      'SELECT hello;',
      'SELECT *;', // Wildcards
      'WHERE age = 10;', // Equality
      'WHERE age != 10;', // Inequality
      'total / time', // Division
      'sum(age)::numeric(0, 5)', // Type casting
      'WHERE age > 10 AND age < 20;', // Comparison
      "WHERE$1 ILIKE ' % ' || 'text'", // Conditionals
      'SELECT id, name;', // Column lists
      'columns AS `tags[column]`', // ClickHouse backtics
      'SELECT * FROM #temp', // Temporary tables
      '# Fetches', // Comments
      '\r\n', // Windows newlines
      '✌🏻', // Emoji
      'ă', // Unicode
      'SELECT id, nam*', // Truncation
      'AND created >= :c1', // PHP-Style I
      'LIMIT $2', // PHP-style II
      'created >= %s', // Python-style
      'created >= $1', // Rails-style
      '@@ to_tsquery', // Postgres full-text search
      'flags & %s)', // Bitwise AND
      'flags | %s)', // Bitwise OR
      'flags ^ %s)', // Bitwise XOR
      'flags ~ %s)', // Bitwise NOT
      'FROM temp{%s}', // Relay integer stripping
      '+ %s as count', // Arithmetic I
      '- %s as count', // Arithmetic II
      "ILIKE '\\_')", // Backslash
      'SELECT\x00 hello', // Null byte
      'SELECT\x08 hello', // Backspace
      'SELECT\x7F hello', // DEL
      'SELECT\x80 hello', // C1 control
      '\x01\x02\x03SELECT hello\x1F', // Multiple C0 controls
    ])('Parses %s', (sql) => {
      expect(() => {
        parser.parse(sql);
      }).not.toThrow();
    });
  });

  describe('SQLishParser.parse', () => {
    const parser = new SQLishParser();

    it('Distinguishes between real keywords and interpolated words', () => {
      expect(parser.parse('SELECT country')).toEqual([
        {
          type: 'Keyword',
          content: 'SELECT',
        },
        {
          type: 'Whitespace',
          content: ' ',
        },
        {
          type: 'GenericToken',
          content: 'country',
        },
      ]);

      expect(parser.parse('SELECT discount')).toEqual([
        {
          type: 'Keyword',
          content: 'SELECT',
        },
        {
          type: 'Whitespace',
          content: ' ',
        },
        {
          type: 'GenericToken',
          content: 'discount',
        },
      ]);
    });

    it('Detects collapsed columns', () => {
      expect(parser.parse('select ..')).toEqual([
        {
          type: 'Keyword',
          content: 'SELECT',
        },
        {
          type: 'Whitespace',
          content: ' ',
        },
        {
          type: 'CollapsedColumns',
          content: '..',
        },
      ]);
    });

    it('Strips control characters from input', () => {
      const clean = parser.parse('SELECT hello');

      // C0 controls, DEL, and C1 controls are stripped
      expect(parser.parse('SELECT\x00\x08\x7F\x80 hello')).toEqual(clean);

      // Multiple control chars scattered throughout
      expect(parser.parse('\x01SELECT\x1F \x7Fhello\x9F')).toEqual(clean);
    });

    it('Preserves tab and newline whitespace', () => {
      expect(parser.parse('SELECT\thello')).toEqual([
        { type: 'Keyword', content: 'SELECT' },
        { type: 'Whitespace', content: '\t' },
        { type: 'GenericToken', content: 'hello' },
      ]);

      expect(parser.parse('SELECT\nhello')).toEqual([
        { type: 'Keyword', content: 'SELECT' },
        { type: 'Whitespace', content: '\n' },
        { type: 'GenericToken', content: 'hello' },
      ]);
    });

    it('Detects whitespace between generic tokens and JOIN commands', () => {
      expect(parser.parse('sentry_users INNER JOIN sentry_messages')).toEqual([
        {
          type: 'GenericToken',
          content: 'sentry_users',
        },
        { type: 'Whitespace', content: ' ' },
        { type: 'Keyword', content: 'INNER' },
        { type: 'Whitespace', content: ' ' },
        { type: 'Keyword', content: 'JOIN' },
        { type: 'Whitespace', content: ' ' },
        {
          type: 'GenericToken',
          content: 'sentry_messages',
        },
      ]);
    });
  });
});
