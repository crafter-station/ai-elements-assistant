"use client";

import {
  PromptInput,
  PromptInputBody,
  type PromptInputMessage,
  PromptInputModelSelect,
  PromptInputModelSelectContent,
  PromptInputModelSelectItem,
  PromptInputModelSelectTrigger,
  PromptInputModelSelectValue,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputToolbar,
  PromptInputTools,
} from "@/components/ai-elements/prompt-input";

type ChatInputProps = {
  input: string;
  model: string;
  status: "submitted" | "streaming";
  models: Array<{ name: string; value: string }>;
  onInputChangeAction: (value: string) => void;
  onModelChangeAction: (value: string) => void;
  onSubmitAction: (message: PromptInputMessage) => void;
};

export function ChatInput({
  input,
  model,
  status,
  models,
  onInputChangeAction,
  onModelChangeAction,
  onSubmitAction,
}: ChatInputProps) {
  return (
    <div className="px-4 py-3 border-t">
      <PromptInput
        onSubmit={onSubmitAction}
        className="mx-auto w-full max-w-3xl"
      >
        <PromptInputBody>
          <PromptInputTextarea
            onChange={(e) => onInputChangeAction(e.target.value)}
            value={input}
            placeholder="Ask me anything about AI Elements..."
          />
        </PromptInputBody>
        <PromptInputToolbar>
          <PromptInputTools>
            <PromptInputModelSelect
              onValueChange={onModelChangeAction}
              value={model}
            >
              <PromptInputModelSelectTrigger>
                <PromptInputModelSelectValue />
              </PromptInputModelSelectTrigger>
              <PromptInputModelSelectContent>
                {models.map((modelItem) => (
                  <PromptInputModelSelectItem
                    key={modelItem.value}
                    value={modelItem.value}
                  >
                    {modelItem.name}
                  </PromptInputModelSelectItem>
                ))}
              </PromptInputModelSelectContent>
            </PromptInputModelSelect>
          </PromptInputTools>
          <PromptInputSubmit disabled={!input} status={status} />
        </PromptInputToolbar>
      </PromptInput>
    </div>
  );
}
