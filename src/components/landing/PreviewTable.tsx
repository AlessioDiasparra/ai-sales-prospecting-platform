"use client";

import { motion } from "framer-motion";

export const PreviewTable = () => {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-8 sm:pb-12">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="rounded-xl border bg-card shadow-sm"
      >
        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-2 border-b px-3 py-2 sm:px-4">
          <div className="inline-flex items-center gap-2 rounded-md border px-2.5 py-1.5 text-sm">
            <span className="inline-flex items-center gap-1">
              <span className="h-2 w-2 rounded-sm bg-emerald-500" aria-hidden />
              Top companies
            </span>
            <span className="text-muted-foreground">▼</span>
          </div>
          <div className="text-sm text-muted-foreground">Sorted by <span className="font-medium text-foreground">Last email interaction</span></div>
          <div className="ml-auto flex items-center gap-2 text-sm text-muted-foreground">
            <span className="hidden sm:inline">View settings</span>
            <span>•</span>
            <span className="hidden sm:inline">Import / Export</span>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="bg-muted/60 text-muted-foreground">
              <tr>
                <th className="px-4 py-2 font-medium">Company</th>
                <th className="px-4 py-2 font-medium">Domains</th>
                <th className="px-4 py-2 font-medium">Associated deals</th>
                <th className="px-4 py-2 font-medium">ICP Fit</th>
                <th className="px-4 py-2 font-medium">Estimated ARR</th>
                <th className="px-4 py-2 font-medium">Connection</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.company} className="border-t">
                  <td className="px-4 py-2">
                    <div className="flex items-center gap-2">
                      <span className="grid h-6 w-6 place-items-center rounded-md bg-secondary text-[10px] font-semibold">
                        {r.initials}
                      </span>
                      <span className="font-medium">{r.company}</span>
                    </div>
                  </td>
                  <td className="px-4 py-2">
                    <a className="rounded-md border px-2 py-0.5 text-foreground/80 hover:bg-accent" href="#">
                      {r.domain}
                    </a>
                  </td>
                  <td className="px-4 py-2">
                    <div className="flex flex-wrap gap-1.5">
                      {r.deals.map((d) => (
                        <span key={d} className="rounded-md border px-2 py-0.5 text-foreground/80">
                          {d}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-2">
                    <span className="inline-flex items-center gap-1 rounded-md bg-amber-50 px-2 py-0.5 text-amber-700 dark:bg-amber-500/10 dark:text-amber-300">
                      AI is thinking…
                    </span>
                  </td>
                  <td className="px-4 py-2 text-muted-foreground">AI is thinking…</td>
                  <td className="px-4 py-2">
                    <span className={`inline-flex items-center gap-1 text-xs ${r.connection === "Very strong" ? "text-emerald-600 dark:text-emerald-400" : r.connection === "Strong" ? "text-emerald-500" : "text-amber-500"}`}>
                      <span className={`h-2.5 w-2.5 rounded-full ${r.connection === "Very strong" ? "bg-emerald-500" : r.connection === "Strong" ? "bg-emerald-400" : "bg-amber-400"}`} />
                      {r.connection}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </section>
  );
};

const rows = [
  { company: "Vercel", initials: "V", domain: "vercel.com", deals: ["Vercel"], connection: "Very strong" },
  { company: "DigitalOcean", initials: "DO", domain: "digitalocean.com", deals: ["DigitalOcean"], connection: "Strong" },
  { company: "GitHub", initials: "GH", domain: "github.com", deals: ["GitHub – x20 Enterprise"], connection: "Very strong" },
  { company: "Stripe", initials: "S", domain: "stripe.com", deals: ["Stripe"], connection: "Very strong" },
  { company: "Figma", initials: "F", domain: "figma.com", deals: ["Figma"], connection: "Very strong" },
  { company: "Intercom", initials: "IC", domain: "intercom.com", deals: ["Intercom – Automations"], connection: "Very strong" },
  { company: "Segment", initials: "SG", domain: "segment.com", deals: ["Segment – x30 Pro"], connection: "Strong" },
];

export default PreviewTable;