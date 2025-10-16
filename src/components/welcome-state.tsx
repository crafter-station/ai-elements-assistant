"use client";

import { FileText, Search, Sparkles, Zap } from "lucide-react";
import { motion } from "motion/react";

export function WelcomeState() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="flex h-full items-center justify-center p-8"
    >
      <div className="max-w-2xl text-center space-y-6">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex justify-center"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
            <Sparkles
              className="size-16 text-primary relative"
              strokeWidth={1.5}
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="space-y-2"
        >
          <h2 className="text-2xl font-semibold tracking-tight">
            AI Elements Assistant
          </h2>
          <p className="text-muted-foreground text-base">
            Your expert guide to Vercel AI SDK Elements. Learn how to build rich
            AI interfaces with composable React components.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4"
        >
          <div className="flex flex-col items-center gap-2 p-4 rounded-lg border bg-card/50 backdrop-blur-sm">
            <Search className="size-5 text-primary" />
            <span className="text-sm font-medium">Component Docs</span>
            <span className="text-xs text-muted-foreground text-center">
              Learn about AI Elements
            </span>
          </div>
          <div className="flex flex-col items-center gap-2 p-4 rounded-lg border bg-card/50 backdrop-blur-sm">
            <FileText className="size-5 text-primary" />
            <span className="text-sm font-medium">Code Examples</span>
            <span className="text-xs text-muted-foreground text-center">
              See how to implement
            </span>
          </div>
          <div className="flex flex-col items-center gap-2 p-4 rounded-lg border bg-card/50 backdrop-blur-sm">
            <Zap className="size-5 text-primary" />
            <span className="text-sm font-medium">Best Practices</span>
            <span className="text-xs text-muted-foreground text-center">
              Build better AI UIs
            </span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
