import * as React from "react";

import { cn } from "@/lib/utils";

interface TextProps extends React.HTMLAttributes<HTMLElement> {
  as: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "small" | "span";
}

const Text = ({ as: HTMLText, className, ...props }: TextProps) => {
  return <HTMLText className={cn(className)} {...props} />;
};

export default Text;
