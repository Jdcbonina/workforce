import * as React from "react";

import { cn } from "@/lib/utils";

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ as: HTMLHeading = "h1", className, ...props }, ref) => {
    return (
      <HTMLHeading
        className={cn(
          "tracking-tight text-success-900 [text-wrap:balance]",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Heading.displayName = "Heading";

export default Heading;
