import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MessageSquareQuote, Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import { FinalCta, PageHero } from "@/components/site/page-elements";
import { testimonials } from "@/data/testimonials-data";

export const metadata: Metadata = {
  title: "Client Testimonials",
  description:
    "Read permission-cleared DMSA customer feedback, shared with names omitted and locations kept general.",
  alternates: { canonical: "/testimonials" },
};

function RatingStars({ rating }: { rating: number }) {
  return (
    <div className="testimonial-stars" role="img" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, index) => (
        <Star
          key={index}
          aria-hidden="true"
          className={index < rating ? "is-filled" : undefined}
        />
      ))}
    </div>
  );
}

export default function TestimonialsPage() {
  return (
    <main id="main-content">
      <PageHero
        eyebrow="Client testimonials"
        title="Feedback shared with care."
        description="Customer ratings and comments are published only after approval. Every review is credited by general service area, without a customer name."
      />

      <section className="section testimonials-section" aria-label="Customer feedback">
        <div className="site-container">
          {testimonials.length > 0 ? (
            <div className="testimonials-grid">
              {testimonials.map((review) => (
                <article className="testimonial-card" key={review.id}>
                  <RatingStars rating={review.rating} />
                  <blockquote>{review.quote}</blockquote>
                  <p className="testimonial-attribution">Client from {review.location}</p>
                </article>
              ))}
            </div>
          ) : (
            <div className="testimonial-empty-state">
              <div className="testimonial-empty-copy">
                <p className="eyebrow"><span aria-hidden="true" />Client feedback</p>
                <h2>Client stories are being prepared.</h2>
                <p>
                  This page is ready for approved star ratings and written comments.
                  Reviews will use a general service area only, with no customer
                  names or property details.
                </p>
                <Button asChild size="lg">
                  <Link href="/request-quote">
                    Request a quotation <ArrowRight aria-hidden="true" />
                  </Link>
                </Button>
              </div>
              <aside className="testimonial-format" aria-label="Review display format">
                <span className="testimonial-format-label">Review format</span>
                <div className="testimonial-stars testimonial-stars-placeholder" aria-hidden="true">
                  {Array.from({ length: 5 }, (_, index) => <Star key={index} />)}
                </div>
                <div className="testimonial-format-quote">
                  <MessageSquareQuote aria-hidden="true" />
                  <p>Approved client comments will appear here.</p>
                </div>
                <p className="testimonial-attribution">Client from [general service area]</p>
                <small>Placeholder format · No customer review supplied</small>
              </aside>
            </div>
          )}
        </div>
      </section>

      <FinalCta />
    </main>
  );
}
