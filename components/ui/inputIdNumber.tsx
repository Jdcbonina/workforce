import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  isInvalid: boolean;
  errorMessage: string | undefined;
  startContent?: React.ReactNode;
}

const InputIdNumber = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { className, isInvalid, errorMessage, startContent, type, ...props },
    ref
  ) => {
    return (
      <div className="relative flex items-center flex-col">
        <input
          type={type}
          className={cn(
            "flex h-9 w-full rounded-md border border-input bg-transparent px-8 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          ref={ref}
          {...props}
        />
        {startContent && (
          <div className="absolute inset-y-0 left-0 flex text-sm text-neutral-500 items-center pl-3">
            {startContent}
          </div>
        )}
        {isInvalid && errorMessage && (
          <span className="text-red-500 text-sm ml-2">{errorMessage}</span>
        )}
      </div>
    );
  }
);
InputIdNumber.displayName = "InputIdNumber";

export { InputIdNumber };
