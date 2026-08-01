export function reportLovableError(error: Error, context: Record<string, any> = {}): void {
  if (typeof window === "undefined") return;
  
  const errorData = {
    message: error.message,
    stack: error.stack,
    context,
    timestamp: new Date().toISOString(),
    url: window.location.href,
  };

  console.error("[Lovable Error]", errorData);
  
  // Attempt to send to Lovable (if available)
  if (window.__lovable_error_reporter) {
    try {
      window.__lovable_error_reporter(errorData);
    } catch (e) {
      console.error("Failed to report error to Lovable", e);
    }
  }
}

declare global {
  interface Window {
    __lovable_error_reporter?: (data: any) => void;
  }
}
