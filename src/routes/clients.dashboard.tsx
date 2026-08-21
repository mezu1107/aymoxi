import { createFileRoute, Link } from "@tanstack/react-router";
import { PortalShell, PortalHeading } from "@/components/portal/PortalShell";
import { usePortalRows } from "@/lib/use-portal";
import { FolderKanban, ListChecks, ReceiptText, Bell, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/clients/dashboard")({
  head: () => ({
    meta: [
      { title: "Portal Overview — AYMOXI Client Portal" },
      { name: "description", content: "Your project progress, open tasks, outstanding invoices and latest updates at a glance." },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: () => <PortalShell>{(client) => <Overview clientId={client.id} name={client.name} />}</PortalShell>,
});

function Stat({ icon: Icon, label, value, hint }: { icon: typeof FolderKanban; label: string; value: string; hint?: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className="mb-3 grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary"><Icon className="h-5 w-5" /></div>
      <p className="text-2xl font-black text-foreground">{value}</p>
      <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{label}</p>
      {hint && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}

function Overview({ clientId, name }: { clientId: string; name: string }) {
  const { rows: projects } = usePortalRows<{ id: string; title: string; status: string; progress: number; due_date: string | null }>("projects", clientId, { orderBy: "created_at" });
  const { rows: tasks } = usePortalRows<{ id: string; title: string; status: string; due_date: string | null }>("client_tasks", clientId, { orderBy: "created_at" });
  const { rows: invoices } = usePortalRows<{ id: string; number: string; total: number; amount_paid: number; currency: string; status: string }>("invoices", clientId, { orderBy: "created_at" });
  const { rows: activities } = usePortalRows<{ id: string; action: string; description: string | null; created_at: string }>("client_activities", clientId, { orderBy: "created_at" });

  const openTasks = tasks.filter((t) => t.status !== "done").length;
  const due = invoices.reduce((s, i) => s + Math.max(0, Number(i.total ?? 0) - Number(i.amount_paid ?? 0)), 0);
  const activeProjects = projects.filter((p) => p.status !== "completed").length;

  return (
    <div>
      <PortalHeading title={`Welcome back, ${name.split(" ")[0]}`} subtitle="Here's everything happening on your account." />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Stat icon={FolderKanban} label="Active projects" value={String(activeProjects)} hint={`${projects.length} total`} />
        <Stat icon={ListChecks} label="Open tasks" value={String(openTasks)} hint={`${tasks.length} total`} />
        <Stat icon={ReceiptText} label="Outstanding" value={`$${due.toLocaleString()}`} hint={`${invoices.length} invoices`} />
        <Stat icon={Bell} label="Updates" value={String(activities.length)} hint="Activity events" />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-sm font-black uppercase tracking-widest text-foreground">Project progress</h2>
            <Link to="/clients/projects" className="inline-flex items-center gap-1 text-xs font-bold text-primary">All <ArrowRight className="h-3 w-3" /></Link>
          </div>
          {projects.length === 0 ? <p className="text-sm text-muted-foreground">No projects yet.</p> : (
            <div className="space-y-4">
              {projects.slice(0, 5).map((p) => (
                <div key={p.id}>
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <span className="truncate font-semibold text-foreground">{p.title}</span>
                    <span className="text-xs text-muted-foreground">{p.progress}%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-muted">
                    <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${Math.min(100, Math.max(0, p.progress))}%` }} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="rounded-2xl border border-border bg-card p-5">
          <h2 className="mb-4 font-display text-sm font-black uppercase tracking-widest text-foreground">Recent activity</h2>
          {activities.length === 0 ? <p className="text-sm text-muted-foreground">No activity recorded yet.</p> : (
            <ul className="space-y-3">
              {activities.slice(0, 6).map((a) => (
                <li key={a.id} className="flex gap-3">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary" />
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-foreground">{a.description || a.action}</p>
                    <p className="text-xs text-muted-foreground">{new Date(a.created_at).toLocaleString()}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
