import { z } from "zod";
import { createMcpHandler } from "mcp-handler";

const handler = createMcpHandler(
  (server) => {
    server.tool(
      "search-knowledge",
      "Search the AI Elements knowledge base and return up to 5 relevant CHUNKS (text excerpts) with similarity scores and metadata. Each result is a partial excerpt from a document, not the complete document. Results include metadata with snapshotId (use this to retrieve full documents with get-snapshot-contents), documentId, chunkIndex, and other document metadata. Use this tool to discover which documents contain information related to your query.",
      {
        query: z
          .string()
          .describe("The search query to find relevant information"),
      },
      async ({ query }) => {
        const searchUrl = `https://www.lupa.build/api/search?projectId=${process.env.LUPA_PROJECT_ID}&deploymentId=${process.env.LUPA_DEPLOYMENT_ID}&query=${encodeURIComponent(query)}`;

        const response = await fetch(searchUrl, {
          headers: {
            Authorization: `Bearer ${process.env.LUPA_API_KEY}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Search failed: ${response.statusText}`);
        }

        const data = await response.json();

        return {
          content: [
            {
              type: "text" as const,
              text: JSON.stringify(
                {
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
                },
                null,
                2,
              ),
            },
          ],
        };
      },
    );

    server.tool(
      "get-snapshot-contents",
      "Retrieve the COMPLETE markdown content of a specific document snapshot from the AI Elements knowledge base. Use this tool when: (1) the same snapshotId appears repeatedly in search results, indicating high relevance; (2) users ask to summarize, analyze, review, or explain a document; (3) you need full document context to answer comprehensively; (4) users request detailed information spanning multiple sections; (5) the question requires understanding the complete document rather than isolated fragments. Always use this after search-knowledge identifies relevant snapshots. Input the snapshotId from search results metadata.",
      {
        snapshotId: z
          .string()
          .describe("The snapshot ID to retrieve the full content for"),
      },
      async ({ snapshotId }) => {
        const snapshotUrl = `https://www.lupa.build/api/snapshots/${snapshotId}`;

        const response = await fetch(snapshotUrl, {
          headers: {
            Authorization: `Bearer ${process.env.LUPA_API_KEY}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch snapshot: ${response.statusText}`);
        }

        const content = await response.text();

        return {
          content: [
            {
              type: "text" as const,
              text: `# Snapshot ${snapshotId}\n\nContent Length: ${content.length} characters\n\n${content}`,
            },
          ],
        };
      },
    );
  },
  {
    // Optional server options
  },
  {
    // Optional redis config
    redisUrl: process.env.REDIS_URL,
    basePath: "/api", // this needs to match where the [transport] is located.
    maxDuration: 60,
    verboseLogs: true,
  },
);

export { handler as GET, handler as POST };
