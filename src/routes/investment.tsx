import { createFileRoute } from "@tanstack/react-router";
import { PackagesPage } from "@/components/packages-page";

export const Route = createFileRoute("/investment")({
  head: () => ({
    meta: [
      { title: "باقات الاستثمار | حساب المشرق" },
      {
        name: "description",
        content: "استثمر في ٧ باقات متدرجة بعوائد يومية تصل إلى ١٫٨٪.",
      },
    ],
  }),
  component: PackagesPage,
});
