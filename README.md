# Edward Mendoza — Portfolio

A single-page personal portfolio built with React and Vite. The page is composed of focused sections for the introduction, projects, skills/about content, and contact.

## Requirements

- Node.js compatible with the installed Vite version
- npm

## Getting started

```sh
npm install
npm run dev
```

Vite prints the local development URL in the terminal.

## Available commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the local Vite development server |
| `npm run build` | Create the production bundle in `dist/` |
| `npm run preview` | Serve the production bundle locally |
| `npm run lint` | Run ESLint across the project |

## Project architecture

The application is a client-rendered React page with no router or server-side application layer. `src/App.jsx` composes the shared navigation, page sections, and footer; `src/main.jsx` mounts the app and loads global styles.

See [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md) for the source layout, render flow, state ownership, styling and animation conventions, and guidance for extending the app.
