import * as React from "react";
import { AlertTriangle, Info, CheckCircle2, XCircle } from "lucide-react";
import { cn } from "@/lib/cn";

export type AlertVariant = "info" | "warning" | "success" | "error";

interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: AlertVariant;
  title?: string;
}

const variantStyles: Record<AlertVariant, string> = {
  info: "bg-accent text-accent-foreground border-blue-200",
  warning: "bg-warning-bg text-warning-foreground border-amber-200",
  success: "bg-emerald-50 text-emerald-900 border-emerald-200",
  error: "bg-red-50 text-red-900 border-red-200",
};

const variantIcons: Record<AlertVariant, React.ComponentType<{ className?: string }>> = {
  info: Info,
  warning: AlertTriangle,
  success: CheckCircle2,
  error: XCircle,
};

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant = "info", title, children, ...props }, ref) => {
    const Icon = variantIcons[variant];
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-md border p-4 flex gap-3 items-start text-sm",
          variantStyles[variant],
          className
        )}
        {...props}
      >
        <Icon className="size-5 flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          {title && <div className="font-semibold mb-1">{title}</div>}
          <div>{children}</div>
        </div>
      </div>
    );
  }
);
Alert.displayName = "Alert";
