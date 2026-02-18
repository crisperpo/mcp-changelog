# mcp-changelog

MCP server that helps maintain changelogs following the [Keep a Changelog](https://keepachangelog.com/) format.

## Features

- **changelog_suggest** - Analyzes git changes and suggests changelog entries with appropriate section and scope
- **changelog_apply** - Adds changelog entries under the "Unreleased" section
- **changelog_check** - Validates that user-facing changes include corresponding changelog updates

## Installation

```bash
pnpm install
```

## Usage

Build the project:

```bash
pnpm build
```

Run in development mode:

```bash
pnpm dev
```

## Adding to Your Project

Add this MCP server to your VS Code settings. Open your workspace settings (`.vscode/settings.json`):

```json
{
  "mcp.servers": {
    "changelog": {
      "command": "node",
      "args": ["<absolute-path-to-mcp-changelog>/dist/index.js"]
    }
  }
}
```

Replace `<absolute-path-to-mcp-changelog>` with the actual path to this repository.

Restart VS Code to load the server.

## Configuration

Create a `.changelogrc.json` in your repository root to customize:

- `changelogPath` - Path to your CHANGELOG.md (default: `CHANGELOG.md`)
- `unreleasedHeader` - Header for unreleased changes (default: `## [Unreleased]`)
- `codePrefixes` - Directory prefixes that indicate user-facing code changes

## Tools

### changelog_suggest

Suggests a changelog entry based on current git changes.

**Parameters:**
- `staged` (optional) - Only analyze staged changes
- `cwd` (optional) - Working directory

**Returns:** Suggested changelog entry with inferred section and scope.

### changelog_apply

Adds an entry to your changelog.

**Parameters:**
- `entryLine` - The changelog entry text
- `section` - One of: `Added`, `Changed`, `Fixed`, `Breaking Changes` (default: `Changed`)
- `cwd` (optional) - Working directory

**Returns:** Confirmation of the update.

### changelog_check

Checks if changelog was updated when user-facing files changed.

**Parameters:**
- `baseRef` - Base git reference
- `headRef` - Head git reference
- `cwd` (optional) - Working directory

**Returns:** OK or FAIL based on whether changelog requirement is satisfied.

## License

MIT
