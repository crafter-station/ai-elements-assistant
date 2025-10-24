"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useCallback, useState } from "react";
import type { PromptInputMessage } from "@/components/ai-elements/prompt-input";
import { AppFooter } from "./app-footer";
import { AppHeader } from "./app-header";
import { ChatConversation } from "./chat/chat-conversation";
import { ChatInput } from "./chat/chat-input";

const models = [
  {
    name: "GPT-5",
    value: "gpt-5",
  },
  {
    name: "GPT-5 mini",
    value: "gpt-5-mini",
  },
  {
    name: "GPT-5 nano",
    value: "gpt-5-nano",
  },
  {
    name: "GPT-5 codex",
    value: "gpt-5-codex	",
  },
];

export function AIPlayground() {
  const [input, setInput] = useState("");
  const [model, setModel] = useState<string>(models[0].value);
  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({
      api: "/chat",
    }),
    onError: (error) => {
      console.error("Chat error:", error);
    },
  });

  const handleSubmit = useCallback(
    (message: PromptInputMessage) => {
      const hasText = Boolean(message.text);

      if (!hasText) {
        return;
      }

      sendMessage(
        {
          text: message.text || "",
        },
        {
          body: {
            model,
          },
        },
      );
      setInput("");
    },
    [sendMessage, model],
  );

  const handleSuggestionClick = useCallback(
    (suggestion: string) => {
      setInput(suggestion);
      sendMessage(
        {
          text: suggestion,
        },
        {
          body: {
            model,
          },
        },
      );
      setInput("");
    },
    [sendMessage, model],
  );

  return (
    <div className="flex flex-col h-[100dvh]">
      <AppHeader />
      <div className="flex flex-col flex-1 min-h-0">
        <ChatConversation
          messages={messages}
          status={status as "idle" | "submitted" | "streaming"}
          onSuggestionClickAction={handleSuggestionClick}
        />
        <ChatInput
          input={input}
          model={model}
          status={status as "submitted" | "streaming"}
          models={models}
          onInputChangeAction={setInput}
          onModelChangeAction={setModel}
          onSubmitAction={handleSubmit}
        />
      </div>
      <AppFooter />
    </div>
  );
}
