"use client";

import { Lightbulb } from "lucide-react";
import { motion } from "motion/react";

type SuggestionChipsProps = {
  onSuggestionClickAction: (suggestion: string) => void;
};

const suggestions = [
  "How do I use the Response component?",
  "Show me Conversation examples",
  "What AI Elements are available?",
  "Explain the PromptInput API",
];

export function SuggestionChips({
  onSuggestionClickAction,
}: SuggestionChipsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.5 }}
      className="px-4 pb-4"
    >
      <div className="flex items-center gap-2 mb-3">
        <Lightbulb className="size-4 text-muted-foreground" />
        <span className="text-xs font-medium text-muted-foreground">
          Try asking:
        </span>
      </div>
      <div className="gap-2 grid grid-cols-2">
        {suggestions.map((suggestion, index) => (
          <motion.button
            key={suggestion}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.9 + index * 0.1, duration: 0.3 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onSuggestionClickAction(suggestion)}
            type="button"
            className="px-3 py-1.5 text-sm rounded-full border bg-card hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            {suggestion}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}
