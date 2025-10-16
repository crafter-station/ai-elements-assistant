# AI Elements Assistant

> An open-source AI assistant built to demonstrate the power of **[Lupa](https://www.lupa.build)** — a knowledge platform that makes building intelligent, context-aware AI applications effortless.

[![Next.js](https://img.shields.io/badge/Next.js-15-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue)](https://react.dev/)
[![AI SDK](https://img.shields.io/badge/AI_SDK-5.0-purple)](https://sdk.vercel.ai/)
[![Powered by Lupa](https://img.shields.io/badge/Powered_by-Lupa-orange)](https://www.lupa.build)

## What is This?

AI Elements Assistant is a **reference implementation** showcasing how [Lupa](https://www.lupa.build) enables developers to build production-ready AI assistants with deep knowledge integration. This assistant specializes in [Vercel AI SDK Elements](https://ai-sdk.dev/elements) — a component library for building rich AI interfaces — but the same architecture can power assistants for any domain.

**Key capabilities:**
- 🧠 **Semantic search** across knowledge bases via Lupa's vector search API
- 📄 **Full document retrieval** for comprehensive context
- 🤖 **Tool-augmented generation** using AI SDK's tool calling
- 💬 **Streaming responses** with reasoning transparency
- 🎨 **Production-ready UI** with 20+ AI Elements components

## Why Lupa?

[**Lupa**](https://www.lupa.build) is a knowledge platform that handles the complex infrastructure of building AI-powered applications:

- **Vector Search as a Service**: Index and search documents semantically without managing embeddings infrastructure
- **Simple API**: Two endpoints (`/search` and `/snapshots/{id}`) replace hours of RAG pipeline engineering
- **Document Management**: Upload, version, and snapshot knowledge bases through a simple interface
- **No Lock-in**: Use any LLM provider (OpenAI, Anthropic, etc.) — Lupa only handles knowledge retrieval

### How This App Uses Lupa

This assistant demonstrates Lupa's two-step retrieval pattern:

1. **Discovery** (`search-knowledge` tool → Lupa `/search` API)
   - Semantic search returns relevant text chunks with metadata
   - Each result includes a `snapshotId` pointing to the source document
   
2. **Deep Retrieval** (`get-snapshot-contents` tool → Lupa `/snapshots/{id}` API)
   - Fetches full document markdown when chunks aren't enough
   - Enables comprehensive answers spanning multiple document sections

See the implementation in [`src/lib/tools/`](src/lib/tools/) and [`src/app/api/chat/route.ts`](src/app/api/chat/route.ts:30).

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                         User Interface                          │
│  Next.js 15 + React 19 + AI SDK Elements + Tailwind CSS v4     │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                    Chat API Route (/api/chat)                   │
│  • AI SDK streamText with OpenAI Responses (GPT-5)             │
│  • Tool calling: search-knowledge, get-snapshot-contents       │
│  • Reasoning transparency with detailed summaries              │
└────────────┬────────────────────────┬───────────────────────────┘
             │                        │
             ▼                        ▼
┌────────────────────────┐  ┌────────────────────────────────────┐
│   Lupa Search API      │  │   Lupa Snapshots API               │
│   GET /api/search      │  │   GET /api/snapshots/{id}          │
│   • Vector search      │  │   • Full document retrieval        │
│   • Returns chunks     │  │   • Markdown content               │
│   • With snapshotId    │  │   • Complete context               │
└────────────────────────┘  └────────────────────────────────────┘
```

## Features

### For Users
- 💬 **Conversational interface** powered by GPT-5 with reasoning transparency
- 🔍 **Intelligent knowledge search** across AI SDK Elements documentation
- 📖 **Full document previews** for comprehensive understanding
- 🎨 **Beautiful UI** with dark/light/system theme support
- ⚡️ **Real-time streaming** responses with tool execution visibility

### For Developers
- 🏗️ **Reference architecture** for Lupa-powered AI assistants
- 🧩 **20+ AI Elements components** (Conversation, Message, Tool, Reasoning, etc.)
- 🛠️ **Tool calling patterns** with semantic search and document retrieval
- 📐 **Type-safe** with TypeScript strict mode
- 🎯 **Production-ready** code structure and error handling

## Getting Started

### Prerequisites

- **Node.js 20+** or **Bun 1.0+**
- **OpenAI API key** with access to GPT-5 Responses models
- **Lupa account** with a project and deployment ([Sign up free](https://www.lupa.build))

### Environment Variables

Create a `.env.local` file:

```bash
# OpenAI API key (for GPT-5 Responses models)
OPENAI_API_KEY=sk-...

# Lupa configuration (get these from your Lupa dashboard)
LUPA_PROJECT_ID=your-project-id
LUPA_DEPLOYMENT_ID=your-deployment-id
```

> **Getting Lupa credentials:** Sign up at [lupa.build](https://www.lupa.build), create a project, upload your knowledge base documents, and deploy. Copy the Project ID and Deployment ID from your dashboard.

### Installation

```bash
# Install dependencies
bun install
# or
npm install

# Run development server
bun dev
# or
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to start chatting.

### Building for Production

```bash
# Build the application
bun run build
# or
npm run build

# Start production server
bun start
# or
npm start
```

## Project Structure

```
aielements-assistant/
├── src/
│   ├── app/
│   │   ├── api/chat/route.ts       # Streaming chat API with tool calling
│   │   ├── layout.tsx              # Root layout with fonts & metadata
│   │   ├── page.tsx                # Home page (AIPlayground)
│   │   └── providers/              # Theme provider setup
│   ├── components/
│   │   ├── ai-elements/            # 20+ AI SDK Elements components
│   │   │   ├── conversation.tsx    # Chat container with scroll
│   │   │   ├── message.tsx         # Message bubbles
│   │   │   ├── tool.tsx            # Tool execution UI
│   │   │   ├── reasoning.tsx       # Collapsible reasoning display
│   │   │   └── ...                 # response, loader, code-block, etc.
│   │   ├── chat/
│   │   │   ├── chat-conversation.tsx  # Message rendering logic
│   │   │   ├── chat-input.tsx         # Input with model selector
│   │   │   └── snapshot-preview.tsx   # Document preview component
│   │   ├── elements/               # Custom UI components
│   │   └── ui/                     # shadcn/ui primitives (Radix UI)
│   └── lib/
│       ├── prompts/
│       │   └── system.ts           # System prompt with tool usage guidelines
│       ├── tools/
│       │   ├── search-knowledge.ts       # Lupa search integration
│       │   └── get-snapshot-contents.ts  # Lupa snapshot retrieval
│       └── utils.ts                # Utility functions (cn, etc.)
├── public/                         # Static assets
├── biome.json                      # Biome linter/formatter config
├── next.config.ts                  # Next.js configuration
├── tailwind.config.ts              # Tailwind CSS v4 config
├── tsconfig.json                   # TypeScript configuration
└── package.json                    # Dependencies & scripts
```

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | [Next.js 15](https://nextjs.org/) (App Router, React Server Components) |
| **UI Library** | [React 19](https://react.dev/) with Server Actions support |
| **AI SDK** | [Vercel AI SDK 5.0](https://sdk.vercel.ai/) with Elements & tool calling |
| **LLM Provider** | [OpenAI GPT-5 Responses](https://platform.openai.com/docs/guides/responses) with reasoning |
| **Knowledge Platform** | [Lupa](https://www.lupa.build) (vector search & document retrieval) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) with `@tailwindcss/postcss` |
| **Components** | [Radix UI](https://www.radix-ui.com/) primitives + shadcn/ui patterns |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Fonts** | [Geist Sans & Geist Mono](https://vercel.com/font) |
| **Linting** | [Biome](https://biomejs.dev/) (ESLint + Prettier replacement) |
| **Type Safety** | TypeScript 5 (strict mode) |
| **Runtime** | Bun 1.0+ or Node.js 20+ |

## Code Style & Conventions

This project follows strict conventions for consistency:

- **Formatter**: Biome with 2-space indentation
- **TypeScript**: Strict mode, no `any`, explicit return types
- **Imports**: Use `@/` alias for all src imports
- **Components**: Functional components with `type` (not `interface`) for props
- **Naming**: 
  - `camelCase` for variables/functions
  - `PascalCase` for components/types
  - `kebab-case` for file names
- **Styling**: Tailwind CSS with `cn()` utility for className merging
- **Error Handling**: Try-catch in API routes with JSON error responses
- **Conventions**: Arrow functions, destructured props, spread remaining `{...props}`

Run linting and formatting:

```bash
# Check code style
bun run lint
# or
npm run lint

# Auto-format code
bun run format
# or
npm run format
```

## Key Implementation Details

### 1. AI Elements Integration

This app showcases 20+ components from AI SDK Elements:

- **Conversation**: Chat container with auto-scroll and scroll-to-bottom button
- **Message**: User/assistant message bubbles with flat variant
- **Tool**: Collapsible tool execution UI with header, input, and output
- **Reasoning**: Expandable reasoning display (GPT-5 Responses feature)
- **Response**: Streaming text with markdown rendering
- **Loader**: Loading spinner during tool execution
- **PromptInput**: Multi-modal input with file upload support

See implementations in [`src/components/ai-elements/`](src/components/ai-elements/).

### 2. Lupa Integration Pattern

**Search tool** ([`search-knowledge.ts`](src/lib/tools/search-knowledge.ts)):
```typescript
const searchUrl = `https://www.lupa.build/api/search?projectId=${LUPA_PROJECT_ID}&deploymentId=${LUPA_DEPLOYMENT_ID}&query=${query}`;
const response = await fetch(searchUrl);
const { results } = await response.json();
// Returns: { id, score, content (chunk), metadata: { snapshotId, ... } }
```

**Snapshot retrieval tool** ([`get-snapshot-contents.ts`](src/lib/tools/get-snapshot-contents.ts)):
```typescript
const snapshotUrl = `https://www.lupa.build/api/snapshots/${snapshotId}`;
const content = await fetch(snapshotUrl).then(r => r.text());
// Returns: Full markdown content of the document
```

**System prompt guidelines** ([`system.ts`](src/lib/prompts/system.ts)):
- Use `search-knowledge` to discover relevant documents
- Use `get-snapshot-contents` when the same `snapshotId` appears multiple times
- Prefer full documents over fragmented chunks for comprehensive answers

### 3. Streaming & Tool Calling

The chat API ([`route.ts`](src/app/api/chat/route.ts)) uses AI SDK's `streamText`:

```typescript
const result = streamText({
  model: openai.responses(model || "gpt-5"),
  providerOptions: {
    openai: {
      reasoningEffort: "low",           // GPT-5 reasoning effort
      reasoningSummary: "detailed",     // Stream detailed reasoning
      include: ["reasoning.encrypted_content"],
    },
  },
  messages: convertToModelMessages(messages),
  system: systemPrompt,
  tools: {
    "search-knowledge": searchKnowledgeTool,
    "get-snapshot-contents": getSnapshotContentsTool,
  },
  stopWhen: stepCountIs(15),  // Prevent infinite loops
});

return result.toUIMessageStreamResponse({
  sendReasoning: true,  // Include reasoning in UI messages
});
```

## Use Cases Beyond AI Elements

While this demo focuses on AI SDK Elements documentation, the same architecture can power assistants for:

- **Internal knowledge bases**: Company wikis, documentation, SOPs
- **Customer support**: Product manuals, troubleshooting guides, FAQs
- **Research**: Academic papers, legal documents, medical literature
- **Code repositories**: Codebase documentation, API references, tutorials

Simply:
1. Upload your documents to Lupa
2. Update environment variables (`LUPA_PROJECT_ID`, `LUPA_DEPLOYMENT_ID`)
3. Customize the system prompt in [`src/lib/prompts/system.ts`](src/lib/prompts/system.ts)
4. Deploy

## Learn More

### Documentation
- [Lupa Documentation](https://www.lupa.build/docs) — Knowledge platform setup & API reference
- [AI SDK Elements](https://ai-sdk.dev/elements) — Component library for AI interfaces
- [AI SDK Documentation](https://sdk.vercel.ai/) — Vercel AI SDK guides
- [OpenAI Responses](https://platform.openai.com/docs/guides/responses) — GPT-5 with reasoning

### Related Resources
- [Next.js App Router](https://nextjs.org/docs/app) — Server Components & routing
- [Tailwind CSS v4](https://tailwindcss.com/blog/tailwindcss-v4-alpha) — Latest Tailwind features
- [Radix UI](https://www.radix-ui.com/) — Headless UI primitives
- [Biome](https://biomejs.dev/) — Fast linter & formatter

## Deployment

### Deploy to Vercel

The easiest way to deploy this Next.js app:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/aielements-assistant)

**Environment variables to set:**
- `OPENAI_API_KEY` — Your OpenAI API key
- `LUPA_PROJECT_ID` — From Lupa dashboard
- `LUPA_DEPLOYMENT_ID` — From Lupa dashboard

### Other Platforms

This app works on any platform supporting Next.js 15:
- **Netlify**: Add build command `npm run build`
- **Cloudflare Pages**: Enable Node.js compatibility
- **Railway**: Auto-detects Next.js apps
- **Self-hosted**: Use `bun start` after `bun run build`

## Contributing

Contributions welcome! This is a reference implementation, so focus on:

- 🐛 **Bug fixes**: Improve stability and error handling
- 📚 **Documentation**: Clarify setup steps or architecture
- 🎨 **UI/UX improvements**: Better accessibility or mobile experience
- 🧩 **New Elements examples**: Showcase unused AI SDK Elements components

Please open an issue before starting major changes.

## License

MIT License — free to use, modify, and distribute.

## Credits

Built with ❤️ to showcase [**Lupa**](https://www.lupa.build) — the knowledge platform that makes building intelligent AI applications effortless.

**Powered by:**
- [Vercel AI SDK](https://sdk.vercel.ai/) for streaming & tool calling
- [OpenAI GPT-5 Responses](https://platform.openai.com/) for reasoning-enabled LLMs
- [Next.js](https://nextjs.org/) for the React framework
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Radix UI](https://www.radix-ui.com/) for accessible components

---

**Questions?** Check out [Lupa's documentation](https://www.lupa.build/docs) or open an issue.
