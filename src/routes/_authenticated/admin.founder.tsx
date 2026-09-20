import { createFileRoute } from "@tanstack/react-router";
import { CrudTable } from "@/components/admin/CrudTable";

export const Route = createFileRoute("/_authenticated/admin/founder")({
  component: () => (
    <CrudTable
      table="founder_notes"
      title="Founder note"
      orderBy={{ column: "sort_order", ascending: true }}
      fields={[
        { name: "heading", label: "Heading", type: "text", required: true },
        { name: "body", label: "Message", type: "textarea", required: true, help: "Leave a blank line between paragraphs." },
        { name: "name", label: "Name", type: "text", required: true },
        { name: "role_title", label: "Role", type: "text" },
        { name: "signature_name", label: "Signature", type: "text", help: "Shown in handwriting-style large text." },
        { name: "photo_url", label: "Photo", type: "image" },
        { name: "sort_order", label: "Sort order", type: "number" },
        { name: "published", label: "Published", type: "boolean" },
      ]}
      listColumns={[
        { key: "heading", label: "Heading" },
        { key: "name", label: "Name" },
        { key: "published", label: "Live", render: (r) => (r.published ? "✓" : "—") },
      ]}
    />
  ),
});
