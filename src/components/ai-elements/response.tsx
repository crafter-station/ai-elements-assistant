"use client";

import { type ComponentProps, memo, useMemo } from "react";
import { Streamdown } from "streamdown";
import { cn } from "@/lib/utils";

type ResponseProps = ComponentProps<typeof Streamdown> & {
  isStreaming?: boolean;
};

export const Response = memo(
  ({ className, children, isStreaming = false, ...props }: ResponseProps) => {
    const sanitizedContent = useMemo(() => {
      if (typeof children === "string") {
        return children
          .replace(/<reasoning>/g, "&lt;reasoning&gt;")
          .replace(/<\/reasoning>/g, "&lt;/reasoning&gt;")
          .replace(/<tool>/g, "&lt;tool&gt;")
          .replace(/<\/tool>/g, "&lt;/tool&gt;")
          .replace(/<response>/g, "&lt;response&gt;")
          .replace(/<\/response>/g, "&lt;/response&gt;");
      }
      return children;
    }, [children]);

    return (
      <Streamdown
        className={cn(
          "size-full [&>*:first-child]:mt-0 [&>*:last-child]:mb-0",
          className,
        )}
        isAnimating={isStreaming}
        {...props}
      >
        {sanitizedContent}
      </Streamdown>
    );
  },
  (prevProps, nextProps) =>
    prevProps.children === nextProps.children &&
    prevProps.isStreaming === nextProps.isStreaming,
);

Response.displayName = "Response";
