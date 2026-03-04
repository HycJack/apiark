# ApiArk

**The API platform that respects your privacy, your RAM, and your Git workflow.**

Local-first. Native-speed. Zero login. Full power.

## What is ApiArk?

ApiArk is a next-generation API development platform built with Tauri v2 + React + TypeScript. It's designed as a fast, private, Git-native alternative to Postman.

### Key Features

- **Native Performance** — Tauri v2 (Rust backend + OS webview). Target: <100MB RAM, <2s startup
- **Local-First** — Your data stays on your machine as plain YAML files. No accounts, no cloud sync
- **Git-Native** — Every request is a `.yaml` file. Collections are directories. Everything is diffable
- **Full Protocol Support** — REST, GraphQL, gRPC, WebSocket, SSE, MQTT
- **TypeScript Scripting** — Pre/post-request scripts with full type definitions
- **Extensible** — JS + WASM plugin system

## Getting Started

### Prerequisites

- Node.js 22+
- pnpm 10+
- Rust toolchain (rustc, cargo)
- Tauri v2 system dependencies ([see Tauri docs](https://v2.tauri.app/start/prerequisites/))

### Development

```bash
# Install dependencies
pnpm install

# Run in development mode
pnpm tauri dev

# Build for production
pnpm tauri build
```

### Project Structure

```
apiark/
├── apps/
│   ├── desktop/          # Tauri v2 desktop app
│   │   ├── src/          # React frontend
│   │   └── src-tauri/    # Rust backend
│   └── cli/              # CLI tool
├── packages/
│   ├── types/            # Shared TypeScript types
│   └── importer/         # Collection importers
└── CLAUDE.md             # Full product & engineering blueprint
```

## License

MIT
