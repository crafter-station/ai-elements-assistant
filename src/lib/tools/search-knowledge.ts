import { tool } from "ai";
import { z } from "zod";

export const searchKnowledgeTool = tool({
  description:
    "Search the AI Elements knowledge base and return up to 5 relevant CHUNKS (text excerpts) with similarity scores and metadata. Each result is a partial excerpt from a document, not the complete document. Results include metadata with snapshotId (use this to retrieve full documents with get-snapshot-contents), documentId, chunkIndex, and other document metadata. Use this tool to discover which documents contain information related to your query.",
  inputSchema: z.object({
    query: z.string().describe("The search query to find relevant information"),
  }),
  execute: async ({ query }) => {
    const searchUrl = `https://www.lupa.build/api/search?projectId=${process.env.LUPA_PROJECT_ID}&deploymentId=${process.env.LUPA_DEPLOYMENT_ID}&query=${encodeURIComponent(query)}`;

    const response = await fetch(searchUrl);

    if (!response.ok) {
      throw new Error(`Search failed: ${response.statusText}`);
    }

    const data = await response.json();

    return {
      query: data.query,
      resultsCount: data.results.length,
      results: data.results.map(
        (result: {
          id: string;
          score: number;
          data: string;
          metadata: {
            snapshotId: string;
            documentId: string;
            chunkIndex: number;
          };
        }) => ({
          id: result.id,
          score: result.score,
          content: result.data,
          metadata: {
            ...result.metadata,
          },
        }),
      ),
    };
  },
});
