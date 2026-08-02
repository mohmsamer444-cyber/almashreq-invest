import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/deposits")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/admin/deposits"!</div>;
}
