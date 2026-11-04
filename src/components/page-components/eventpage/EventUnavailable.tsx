import Link from "next/link";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout";
import Container from "@/tw-components/container";
import { Section } from "@/tw-components/Section";

// Shown instead of an event when the API won't serve it: suspended by an
// admin (403 EVENT_SUSPENDED), deleted or never existed (404), or any other
// failure.
export const eventUnavailableReason = (error: unknown) => {
  const e = error as { code?: string; status?: number } | null;
  if (e?.code === "EVENT_SUSPENDED") return "suspended" as const;
  if (e?.status === 404) return "missing" as const;
  return "error" as const;
};

const COPY = {
  suspended: {
    title: "This event is no longer available",
    body: "It has been suspended by Plugin and tickets can't be bought. If you already have a ticket, contact the organiser or our support team.",
  },
  missing: {
    title: "Event not found",
    body: "This event doesn't exist or has been removed.",
  },
  error: {
    title: "Something went wrong",
    body: "We couldn't load this event. Please try again in a moment.",
  },
};

export default function EventUnavailable({ error }: { error: unknown }) {
  const copy = COPY[eventUnavailableReason(error)];
  return (
    <Layout title={copy.title} showHeader showFooter>
      <Section id="event-unavailable">
        <Container className="py-20 md:py-28">
          <div className="mx-auto max-w-lg text-center">
            <h1 className="text-2xl md:text-3xl font-semibold">{copy.title}</h1>
            <p className="mt-4 text-base opacity-80">{copy.body}</p>
            <Link href="/explore-events" className="mt-8 inline-block">
              <Button>Explore other events</Button>
            </Link>
          </div>
        </Container>
      </Section>
    </Layout>
  );
}
