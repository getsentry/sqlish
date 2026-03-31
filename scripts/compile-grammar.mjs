import { readFileSync, writeFileSync } from 'node:fs';
import peggy from 'peggy';

const grammar = readFileSync('src/sqlish.pegjs', 'utf8');
const source = peggy.generate(grammar, {
  output: 'source',
  format: 'es',
  optimize: 'speed',
  trace: false,
  cache: false,
});

writeFileSync('src/sqlish-grammar.js', source);
