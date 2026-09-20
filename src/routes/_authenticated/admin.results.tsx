import { createFileRoute } from "@tanstack/react-router";
import { CrudTable } from "@/components/admin/CrudTable";

export const Route = createFileRoute("/_authenticated/admin/results")({
  component: () => (
    <CrudTable
      table="before_after"
      title="Before & after results"
      orderBy={{ column: "sort_order", ascending: true }}
      fields={[
        { name: "title", label: "Title", type: "text", required: true },
        { name: "client", label: "Client", type: "text" },
        { name: "category", label: "Category", type: "text" },
        { name: "summary", label: "Summary", type: "textarea" },
        { name: "before_url", label: "Before image", type: "image" },
        { name: "after_url", label: "After image", type: "image" },
        { name: "metric_value", label: "Result value", type: "text", placeholder: "+64%" },
        { name: "metric_label", label: "Result label", type: "text", placeholder: "Completed checkouts" },
        { name: "link_url", label: "Case study link", type: "text" },
        { name: "sort_order", label: "Sort order", type: "number" },
        { name: "published", label: "Published", type: "boolean" },
      ]}
      listColumns={[
        { key: "title", label: "Title" },
        { key: "client", label: "Client" },
        { key: "metric_value", label: "Result" },
        { key: "published", label: "Live", render: (r) => (r.published ? "✓" : "—") },
      ]}
    />
  ),
});
