import * as React from "react";
import { cn } from "@/lib/cn";

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
}

export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, children, required, ...props }, ref) => (
    <label
      ref={ref}
      className={cn(
        "text-sm font-medium text-foreground leading-none mb-1.5 inline-block",
        className
      )}
      {...props}
    >
      {children}
      {required && <span className="text-red-600 ml-0.5">*</span>}
    </label>
  )
);
Label.displayName = "Label";
