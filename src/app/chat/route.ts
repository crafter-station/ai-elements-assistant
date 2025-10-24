import { type OpenAIResponsesProviderOptions, openai } from "@ai-sdk/openai";
import {
  convertToModelMessages,
  stepCountIs,
  streamText,
  type UIMessage,
} from "ai";
import { systemPrompt } from "@/lib/prompts/system";
import { getSnapshotContentsTool } from "@/lib/tools/get-snapshot-contents";
import { searchKnowledgeTool } from "@/lib/tools/search-knowledge";

export const maxDuration = 120;

export async function POST(request: Request) {
  try {
    const { messages, model }: { messages: UIMessage[]; model: string } =
      await request.json();

    const result = streamText({
      model: openai.responses(model || "gpt-5"),
      providerOptions: {
        openai: {
          reasoningEffort: "low",
          reasoningSummary: "detailed",
          include: ["reasoning.encrypted_content"],
        } satisfies OpenAIResponsesProviderOptions,
      },
      messages: convertToModelMessages(messages),
      system: systemPrompt,
      tools: {
        "search-knowledge": searchKnowledgeTool,
        "get-snapshot-contents": getSnapshotContentsTool,
      },
      stopWhen: stepCountIs(15), // Stop after maximum 10 steps
    });

    return result.toUIMessageStreamResponse({
      sendReasoning: true,
    });
  } catch (error) {
    console.error("Chat API error:", error);

    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : "Internal server error",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}
