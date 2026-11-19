import { CalendarCheck, ClipboardCheck, FlaskConical, ShieldCheck } from "lucide-react";

import { trustFacts } from "@/data/site-data";

/** Years, jobs, warranty and products. Renders nothing until DMSA fills in data/site-data.js. */
export function TrustFacts({ className = "" }: { className?: string }) {
  const years = trustFacts.foundedYear ? new Date().getFullYear() - Number(trustFacts.foundedYear) : 0;
  const items = [
    trustFacts.foundedYear && { icon: CalendarCheck, label: years > 1 ? `${years} years in operation` : "In operation", value: `Since ${trustFacts.foundedYear}` },
    trustFacts.jobsCompleted && { icon: ClipboardCheck, label: "Completed jobs", value: trustFacts.jobsCompleted },
    trustFacts.warranty && { icon: ShieldCheck, label: "Warranty and re-treatment", value: trustFacts.warranty },
    trustFacts.products && { icon: FlaskConical, label: "Products used", value: trustFacts.products },
  ].filter((item): item is { icon: typeof ShieldCheck; label: string; value: string } => Boolean(item));

  if (items.length === 0) return null;
  return (
    <section className={`section trust-facts-section ${className}`.trim()} aria-label="Why customers trust DMSA">
      <div className="site-container">
        <ul className="trust-facts">
          {items.map(({ icon: Icon, label, value }) => (
            <li key={label}><Icon aria-hidden="true" /><span><strong>{label}</strong><small>{value}</small></span></li>
          ))}
        </ul>
      </div>
    </section>
  );
}
