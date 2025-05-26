# sqlish

A SQL-like parser and formatter for syntax highlighting and formatting, written in TypeScript.

## Installation

```bash
npm install sqlish
# or
pnpm add sqlish
# or
bun install sqlish
# or
yarn add sqlish
```

## Usage

### Basic Parsing

```typescript
import { SQLishParser } from 'sqlish';

const parser = new SQLishParser();
const tokens = parser.parse('SELECT id, name FROM users WHERE id = 42');

console.log(tokens);
// Returns an array of Token objects with type and content information
```

### Formatting

```typescript
import { SQLishFormatter } from 'sqlish';
import { string } from 'sqlish';

const formatter = new SQLishFormatter();
const tokens = parser.parse('SELECT id, name FROM users WHERE id = 42');

// Format as string
const formatted = string(tokens);
console.log(formatted);

// Format as React components (for syntax highlighting)
const reactElements = formatter.format(tokens);
```

### React Integration

```typescript
import { SQLishParser, simpleMarkup } from 'sqlish';

const parser = new SQLishParser();
const tokens = parser.parse('SELECT id, name FROM users WHERE id = 42');
const highlighted = simpleMarkup(tokens);

// Use highlighted in your React component
return <div>{highlighted}</div>;
```

## API

### SQLishParser

- `parse(sql: string): Token[]` - Parses SQL string into tokens

### SQLishFormatter

- `format(tokens: Token[]): React.ReactElement[]` - Formats tokens as React elements

### Utility Functions

- `string(tokens: Token[]): string` - Formats tokens as a plain string
- `simpleMarkup(tokens: Token[]): React.ReactElement[]` - Simple syntax highlighting

## Development

```bash
# Install dependencies
npm install

# Build the project
npm run build

# Run tests
npm test

# Clean build artifacts
npm run clean
```