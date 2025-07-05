<p>
  <a href="./README.md"><strong>English</strong></a> | <a href="./README.zh-CN.md">简体中文</a>
</p>

# ANTLR Playground

This is an online ANTLR grammar parser and visualizer built with React and Vite.

## Features

- **Live Parsing**: Edit your ANTLR v4 grammar (Lexer & Parser) and input text, then see the parse tree instantly.
- **Interactive Parse Tree**: The generated parse tree is rendered on an HTML5 Canvas, allowing you to zoom, pan, and click to focus on specific nodes.
- **Pre-loaded Grammars**: Comes with a list of pre-loaded grammar examples to get you started quickly.
- **Custom Grammar Management**:
    - **Save & Load**: Save your custom grammars locally in your browser.
    - **Fork**: Create a new grammar based on an existing one.
    - **Rename & Delete**: Manage your collection of custom grammars.
## Project Structure

- `apps/web`: The frontend React application.
- `netlify/functions`: Netlify serverless functions responsible for compiling the ANTLR grammar on the backend.

## Getting Started

To run the project locally, execute the following commands from the root directory:

```bash
pnpm install
pnpm dev
```

This will start both the frontend application and the Netlify Functions emulator concurrently.
- The frontend app will be available at `http://localhost:5175`.
- The Netlify Functions will run at `http://localhost:8888` for the frontend to call.

## Running Services Separately

If you need to start the frontend or backend services individually for debugging, you can use the following commands from the root directory:

- **Start only the frontend application:**
```bash
pnpm run dev:web
```

- **Start only the Netlify Functions emulator:**
```bash
pnpm run dev:api
```

## Testing

This project uses Playwright for end-to-end testing. For a detailed guide on testing, please refer to the [AI Testing Guide](./AI_README.md).

## TODO

- [ ] Integrate AI to generate and iterate on grammars.