import { tool } from "ai";
import { z } from "zod";

export const getSnapshotContentsTool = tool({
  description:
    "Retrieve the COMPLETE markdown content of a specific document snapshot from the AI Elements knowledge base. Use this tool when: (1) the same snapshotId appears repeatedly in search results, indicating high relevance; (2) users ask to summarize, analyze, review, or explain a document; (3) you need full document context to answer comprehensively; (4) users request detailed information spanning multiple sections; (5) the question requires understanding the complete document rather than isolated fragments. Always use this after search-knowledge identifies relevant snapshots. Input the snapshotId from search results metadata.",
  inputSchema: z.object({
    snapshotId: z
      .string()
      .describe("The snapshot ID to retrieve the full content for"),
  }),
  execute: async ({ snapshotId }) => {
    const snapshotUrl = `https://www.lupa.build/api/snapshots/${snapshotId}`;

    const response = await fetch(snapshotUrl);

    if (!response.ok) {
      throw new Error(`Failed to fetch snapshot: ${response.statusText}`);
    }

    const content = await response.text();

    return {
      snapshotId,
      content,
      contentLength: content.length,
    };
  },
});
