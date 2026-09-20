import { createFileRoute } from "@tanstack/react-router";
import { CrudTable } from "@/components/admin/CrudTable";

export const Route = createFileRoute("/_authenticated/admin/reviews")({
  component: () => (
    <CrudTable
      table="review_wall"
      title="Review wall"
      orderBy={{ column: "sort_order", ascending: true }}
      fields={[
        { name: "name", label: "Client name", type: "text", required: true },
        { name: "role_title", label: "Role", type: "text" },
        { name: "company", label: "Company", type: "text" },
        { name: "quote", label: "Review", type: "textarea", required: true },
        { name: "media_type", label: "Type", type: "select", options: ["photo", "video"], required: true },
        { name: "photo_url", label: "Photo", type: "image" },
        { name: "video_url", label: "Video link", type: "text", placeholder: "https://..." },
        { name: "rating", label: "Rating (1-5)", type: "number" },
        { name: "sort_order", label: "Sort order", type: "number" },
        { name: "published", label: "Published", type: "boolean" },
      ]}
      listColumns={[
        { key: "name", label: "Name" },
        { key: "company", label: "Company" },
        { key: "media_type", label: "Type" },
        { key: "rating", label: "★" },
        { key: "published", label: "Live", render: (r) => (r.published ? "✓" : "—") },
      ]}
    />
  ),
});
