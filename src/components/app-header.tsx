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
          <ThemeSwitcherMultiButton />
        </nav>
      </div>
    </header>
  );
}
