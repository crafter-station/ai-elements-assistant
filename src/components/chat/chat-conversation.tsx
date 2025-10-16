"use client";

import type { UIMessage } from "ai";
import { Fragment, useCallback } from "react";
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import { Loader } from "@/components/ai-elements/loader";
import { Message, MessageContent } from "@/components/ai-elements/message";
import {
  Reasoning,
  ReasoningContent,
  ReasoningTrigger,
} from "@/components/ai-elements/reasoning";
import { Response } from "@/components/ai-elements/response";
import {
  Tool,
  ToolContent,
  ToolHeader,
  ToolInput,
  ToolOutput,
} from "@/components/ai-elements/tool";
import { SuggestionChips } from "@/components/suggestion-chips";
import { WelcomeState } from "@/components/welcome-state";
import { SnapshotPreview } from "./snapshot-preview";

type ChatConversationProps = {
  messages: UIMessage[];
  status: "idle" | "submitted" | "streaming";
  onSuggestionClickAction: (suggestion: string) => void;
};

export function ChatConversation({
  messages,
  status,
  onSuggestionClickAction,
}: ChatConversationProps) {
  const renderPart = useCallback(
    (
      messageId: string,
      messageRole: UIMessage["role"],
      part: UIMessage["parts"][number],
      index: number,
    ) => {
      switch (part.type) {
        case "reasoning":
          if (part.state === "done" && !part.text.length) return null;
          return (
            <Reasoning
              key={`${messageId}-${index}`}
              className="w-full"
              isStreaming={part.state === "streaming"}
            >
              <ReasoningTrigger />
              <ReasoningContent>{part.text}</ReasoningContent>
            </Reasoning>
          );
        case "text":
          return (
            <Fragment key={`${messageId}-${index}`}>
              <Message from={messageRole}>
                <MessageContent variant="flat">
                  <Response isStreaming={part.state === "streaming"}>
                    {part.text}
                  </Response>
                </MessageContent>
              </Message>
            </Fragment>
          );
        case "tool-search-knowledge":
          return (
            <Tool key={`${messageId}-${index}`}>
              <ToolHeader
                title="Search Knowledge Base"
                type={part.type}
                state={part.state}
              />
              <ToolContent>
                <ToolInput input={part.input} />
                <ToolOutput output={part.output} errorText={part.errorText} />
              </ToolContent>
            </Tool>
          );
        case "tool-get-snapshot-contents":
          return (
            <Tool key={`${messageId}-${index}`}>
              <ToolHeader
                title="Get Snapshot Contents"
                type={part.type}
                state={part.state}
              />
              <ToolContent>
                <ToolInput input={part.input} />
                {part.output ? (
                  <div className="space-y-2 p-4">
                    <h4 className="font-medium text-muted-foreground text-xs uppercase tracking-wide">
                      Result
                    </h4>
                    <SnapshotPreview
                      content={
                        typeof part.output === "object" &&
                        "content" in part.output &&
                        typeof part.output.content === "string"
                          ? part.output.content
                          : JSON.stringify(part.output, null, 2)
                      }
                    />
                  </div>
                ) : null}
                {part.errorText && (
                  <ToolOutput output={part.output} errorText={part.errorText} />
                )}
              </ToolContent>
            </Tool>
          );
        default:
          return null;
      }
    },
    [],
  );

  return (
    <Conversation className="flex-1">
      <ConversationContent>
        {messages.length === 0 ? (
          <>
            <WelcomeState />
            <SuggestionChips
              onSuggestionClickAction={onSuggestionClickAction}
            />
          </>
        ) : (
          messages.map((message) => (
            <div key={message.id}>
              {message.parts.map((part, i) =>
                renderPart(message.id, message.role, part, i),
              )}
            </div>
          ))
        )}
        {status === "submitted" && <Loader />}
      </ConversationContent>
      <ConversationScrollButton />
    </Conversation>
  );
}
