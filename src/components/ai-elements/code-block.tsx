"use client";

import { CheckIcon, CopyIcon } from "lucide-react";
import { useTheme } from "next-themes";
import type { ComponentProps, HTMLAttributes, ReactNode } from "react";
import { createContext, memo, useContext, useEffect, useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  oneDark,
  oneLight,
} from "react-syntax-highlighter/dist/esm/styles/prism";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type CodeBlockContextType = {
  code: string;
};

const CodeBlockContext = createContext<CodeBlockContextType>({
  code: "",
});

export type CodeBlockProps = HTMLAttributes<HTMLDivElement> & {
  code: string;
  language: string;
  showLineNumbers?: boolean;
  children?: ReactNode;
  isStreaming?: boolean;
};

const PlainCodeBlock = memo(
  ({ code, showLineNumbers }: { code: string; showLineNumbers?: boolean }) => (
    <pre
      className="overflow-auto p-4 font-mono text-sm"
      style={{
        margin: 0,
        fontSize: "0.875rem",
        background: "hsl(var(--muted))",
        color: "hsl(var(--foreground))",
      }}
    >
      {showLineNumbers
        ? code.split("\n").map((line, i) => (
            <div key={`${i}-${line.slice(0, 10)}`}>
              <span className="text-muted-foreground pr-4 min-w-[2.5rem] inline-block text-right select-none">
                {i + 1}
              </span>
              {line}
            </div>
          ))
        : code}
    </pre>
  ),
);

PlainCodeBlock.displayName = "PlainCodeBlock";

const HighlightedCodeBlock = ({
  code,
  language,
  showLineNumbers,
  isDark,
}: {
  code: string;
  language: string;
  showLineNumbers?: boolean;
  isDark: boolean;
}) => (
  <SyntaxHighlighter
    className="overflow-hidden"
    codeTagProps={{
      className: "font-mono text-sm",
    }}
    customStyle={{
      margin: 0,
      padding: "1rem",
      fontSize: "0.875rem",
      background: "hsl(var(--background))",
      color: "hsl(var(--foreground))",
    }}
    language={language}
    lineNumberStyle={{
      color: "hsl(var(--muted-foreground))",
      paddingRight: "1rem",
      minWidth: "2.5rem",
    }}
    showLineNumbers={showLineNumbers}
    style={isDark ? oneDark : oneLight}
  >
    {code}
  </SyntaxHighlighter>
);

HighlightedCodeBlock.displayName = "HighlightedCodeBlock";

const CodeBlockInner = ({
  code,
  language,
  showLineNumbers = false,
  className,
  children,
  isStreaming = false,
  ...props
}: CodeBlockProps) => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [shouldHighlight, setShouldHighlight] = useState(!isStreaming);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isStreaming && !shouldHighlight) {
      const timer = setTimeout(() => {
        setShouldHighlight(true);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isStreaming, shouldHighlight]);

  const isDark = mounted ? resolvedTheme === "dark" : false;

  return (
    <CodeBlockContext.Provider value={{ code }}>
      <div
        className={cn(
          "relative w-full overflow-hidden rounded-md border bg-background text-foreground",
          className,
        )}
        style={{ willChange: isStreaming ? "contents" : "auto" }}
        {...props}
      >
        <div className="relative">
          {shouldHighlight && !isStreaming ? (
            <HighlightedCodeBlock
              code={code}
              language={language}
              showLineNumbers={showLineNumbers}
              isDark={isDark}
            />
          ) : (
            <PlainCodeBlock code={code} showLineNumbers={showLineNumbers} />
          )}
          {children && (
            <div className="absolute top-2 right-2 flex items-center gap-2">
              {children}
            </div>
          )}
        </div>
      </div>
    </CodeBlockContext.Provider>
  );
};

CodeBlockInner.displayName = "CodeBlockInner";

export const CodeBlock = (props: CodeBlockProps) => (
  <CodeBlockInner {...props} />
);

export type CodeBlockCopyButtonProps = ComponentProps<typeof Button> & {
  onCopy?: () => void;
  onError?: (error: Error) => void;
  timeout?: number;
};

export const CodeBlockCopyButton = ({
  onCopy,
  onError,
  timeout = 2000,
  children,
  className,
  ...props
}: CodeBlockCopyButtonProps) => {
  const [isCopied, setIsCopied] = useState(false);
  const { code } = useContext(CodeBlockContext);

  const copyToClipboard = async () => {
    if (typeof window === "undefined" || !navigator.clipboard.writeText) {
      onError?.(new Error("Clipboard API not available"));
      return;
    }

    try {
      await navigator.clipboard.writeText(code);
      setIsCopied(true);
      onCopy?.();
      setTimeout(() => setIsCopied(false), timeout);
    } catch (error) {
      onError?.(error as Error);
    }
  };

  const Icon = isCopied ? CheckIcon : CopyIcon;

  return (
    <Button
      className={cn("shrink-0", className)}
      onClick={copyToClipboard}
      size="icon"
      variant="ghost"
      {...props}
    >
      {children ?? <Icon size={14} />}
    </Button>
  );
};
