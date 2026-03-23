# @sentry/sqlish

A SQL-ish parser and formatter for syntax highlighting and pretty-printing.

## Installation

```bash
pnpm add @sentry/sqlish
```

For React formatting support, also install React:

```bash
pnpm add react
```

## Usage

### Parsing

```typescript
import {SQLishParser} from '@sentry/sqlish';

const parser = new SQLishParser();
const tokens = parser.parse('SELECT id, name FROM users WHERE id = 42');
```

### String Formatting

```typescript
import {SQLishFormatter} from '@sentry/sqlish';

const formatter = new SQLishFormatter();
const formatted = formatter.toString('SELECT id, name FROM users WHERE id = 42');
```

You can also use the low-level `string` formatter directly:

```typescript
import {SQLishParser, string} from '@sentry/sqlish';

const parser = new SQLishParser();
const tokens = parser.parse('SELECT id, name FROM users WHERE id = 42');
const formatted = string(tokens, {maxLineLength: 80});
```

### React Markup (optional)

Requires `react` as a peer dependency.

```tsx
import {SQLishParser} from '@sentry/sqlish';
import {simpleMarkup} from '@sentry/sqlish/react';

const parser = new SQLishParser();
const tokens = parser.parse('SELECT id, name FROM users WHERE id = 42');
const highlighted = simpleMarkup(tokens);

return <div>{highlighted}</div>;
```

## API

### SQLishParser

- `parse(sql: string): Token[]` — Parses a SQL-ish string into tokens

### SQLishFormatter

- `toString(sql: string, options?): string` — Parses and formats SQL as a pretty-printed string

### Utility Functions

- `string(tokens: Token[], options?): string` — Formats tokens as a plain string (low-level)
- `simpleMarkup(tokens: Token[]): React.ReactElement[]` — Formats tokens as React elements with syntax highlighting (from `@sentry/sqlish/react`)

## Development

```bash
# Install dependencies
pnpm install

# Build the project
pnpm run build

# Run tests
pnpm test
```

## License

Apache-2.0
