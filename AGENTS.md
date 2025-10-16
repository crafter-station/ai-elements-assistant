# Agent Guidelines

## Commands
- **Dev**: `bun dev` or `npm run dev`
- **Build**: `bun run build` or `npm run build`
- **Lint**: `bun run lint` or `npm run lint` (uses Biome)
- **Format**: `bun run format` or `npm run format`
- **Tests**: No test suite configured

## Code Style
- **Formatter**: Biome with 2-space indentation
- **TypeScript**: Strict mode enabled, no unannotated types
- **Imports**: Use `@/` alias for src imports; organize imports automatically via Biome
- **Components**: Functional components with TypeScript types; use `type` for props (not `interface`)
- **Naming**: camelCase for variables/functions, PascalCase for components/types, kebab-case for files
- **Styling**: Tailwind CSS with `cn()` utility from `@/lib/utils` for className merging
- **UI Components**: Use Radix UI primitives; follow shadcn/ui patterns (see `src/components/ui/`)
- **Error Handling**: Try-catch in API routes with JSON error responses; log errors to console
- **Dependencies**: Next.js 15, React 19, AI SDK (`ai`, `@ai-sdk/*`), Tailwind v4, Biome linter
- **Conventions**: Arrow functions preferred; destructure props; spread remaining props with `{...props}`
