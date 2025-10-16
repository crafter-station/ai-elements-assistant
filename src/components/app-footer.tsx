export function AppFooter() {
  return (
    <footer className="border-t bg-muted/30 px-6 py-2">
      <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
        <span>Open source assistant built with</span>
        <a
          href="https://www.lupa.build"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-foreground hover:underline transition-colors"
        >
          Lupa
        </a>
        <span>·</span>
        <a
          href="https://ai-sdk.dev/elements"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-foreground hover:underline transition-colors"
        >
          AI SDK Elements
        </a>
      </div>
    </footer>
  );
}
