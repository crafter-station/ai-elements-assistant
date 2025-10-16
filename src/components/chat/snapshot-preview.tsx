"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

type SnapshotPreviewProps = {
  content: string;
};

export function SnapshotPreview({ content }: SnapshotPreviewProps) {
  const [showFull, setShowFull] = useState(false);
  const previewLength = 500;
  const isTruncated = content.length > previewLength;
  const displayContent = showFull ? content : content.slice(0, previewLength);

  return (
    <div className="space-y-2">
      <div className="rounded-md bg-muted/50 p-3 text-xs font-mono whitespace-pre-wrap break-words">
        {displayContent}
        {isTruncated && !showFull && "..."}
      </div>
      {isTruncated && (
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowFull(!showFull)}
        >
          {showFull ? "Show less" : "Show full content"}
        </Button>
      )}
    </div>
  );
}
