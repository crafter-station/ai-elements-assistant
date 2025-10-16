"use client";

import { Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ThemeSwitcherMultiButton } from "@/components/elements/theme-switcher-multi-button";

export function AppHeader() {
  return (
    <header className="border-b bg-gradient-to-b from-background to-muted/20">
      <div className="flex items-center gap-4 px-6 py-3">
        <Link
          href="/"
          className="flex items-center gap-4 hover:opacity-80 transition-opacity"
        >
          <Image
            src="/vercel.svg"
            alt="Vercel"
            width={20}
            height={20}
            className="invert dark:invert-0"
          />
          <div className="flex items-center gap-2">
            <span className="text-base font-semibold tracking-tight">
              AI Elements <span className="italic">Assistant</span>
            </span>

            <Sparkles className="size-4 text-primary" />
          </div>
        </Link>
        <nav className="ml-auto flex items-center gap-4">
          <Link
            href="https://ai-sdk.dev/elements"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Docs
          </Link>
          <Link
            href="https://github.com/crafter-station/ai-elements-assistant/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="GitHub Repository"
          >
            <svg
              className="size-5"
              viewBox="0 0 24 24"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <title>GitHub</title>
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
          </Link>
          <ThemeSwitcherMultiButton />
        </nav>
      </div>
    </header>
  );
}
