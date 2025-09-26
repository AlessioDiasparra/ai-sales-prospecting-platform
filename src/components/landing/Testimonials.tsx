import { Star } from "lucide-react";

export const Testimonials = () => {
  return (
    <section id="testimonials" className="relative mx-auto max-w-6xl px-4 py-20 sm:py-28">
      <div className="text-center">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
          Trusted by finance teams worldwide
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
          See how our platform transforms financial operations for businesses
        </p>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((c, i) => (
          <article
            key={i}
            className="rounded-xl border bg-card p-6 shadow-sm"
          >
            <div className="mb-4 flex gap-1 text-primary">
              {Array.from({ length: 5 }).map((_, k) => (
                <Star key={k} className="h-4 w-4 fill-current" />
              ))}
            </div>
            <blockquote className="text-muted-foreground italic">
              “{c.quote}”
            </blockquote>
            <div className="mt-6 flex items-center gap-3">
              <div className="h-9 w-9 rounded-full bg-muted" />
              <div>
                <p className="font-semibold">{c.author}</p>
                <p className="text-sm text-muted-foreground">{c.role}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

const cards = [
  {
    quote:
      "Our payment processing efficiency increased by 40% and transaction failures dropped to near zero. The automation features are game‑changing.",
    author: "Sarah Johnson",
    role: "CFO at TechCorp",
  },
  {
    quote:
      "The real‑time analytics and fraud detection capabilities have saved us millions. We can spot issues before they become problems.",
    author: "Michael Chen",
    role: "Head of Risk at FinanceFlow",
  },
  {
    quote:
      "Compliance used to be a nightmare. Now our regulatory reporting is automated and we're always audit‑ready.",
    author: "Leila Rodriguez",
    role: "Operations Director at GlobalPay",
  },
];

export default Testimonials;