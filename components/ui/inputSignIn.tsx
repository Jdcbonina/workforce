import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  isInvalid: boolean;
  errorMessage: string | undefined;
  endContent?: React.ReactNode;
}

const InputSignIn = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, isInvalid, errorMessage, type, endContent, ...props }, ref) => {
    return (
      <div className="relative flex items-center flex-col">
        <input
          type={type}
          className={cn(
            "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
            endContent ? "pr-12" : "",
            className
          )}
          ref={ref}
          {...props}
        />
        {endContent && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            {endContent}
          </div>
        )}
        {isInvalid && errorMessage && (
          <span className="text-red-500 text-sm ml-2">{errorMessage}</span>
        )}
      </div>
    );
  }
);
InputSignIn.displayName = "Input";

export { InputSignIn };
