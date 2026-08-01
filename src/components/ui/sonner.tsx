import { Toaster as SonnerToaster, ToasterProps } from "sonner";

export function Toaster(props: ToasterProps) {
  return (
    <SonnerToaster
      {...props}
      theme="dark"
      toastOptions={{
        classNames: {
          toast: "bg-background border border-border rounded-lg shadow-lg",
          description: "text-muted-foreground",
          success: "border-success/40",
          error: "border-destructive/40",
          warning: "border-warning/40",
        },
      }}
    />
  );
}
