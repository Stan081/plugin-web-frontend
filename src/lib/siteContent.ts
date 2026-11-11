import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export type SiteHero = {
  backgroundImage?: string;
  title?: string;
  description?: string;
};

export type SiteContent = {
  hero?: SiteHero;
  testimonials?: Array<{ name?: string; quote?: string; imageUrl?: string }>;
  footer?: { email?: string; phone?: string; address?: string };
};

/** The API's envelope, as cached under SITE_CONTENT_QUERY_KEY. */
export type SiteContentResponse = { data?: SiteContent } | null;

export const SITE_CONTENT_QUERY_KEY = ["publicSiteContent"];

/** Shown only when the API gives no banner image, or the image fails to load. */
export const FALLBACK_BANNER_IMAGE = "/images/banner_fallback.jpg";

// Kept free of the browser-only helpers in lib/constants so it also runs in
// getStaticProps.
const siteContentUrl = () =>
  `${(process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8001").replace(/\/$/, "")}/api/site-content`;

/**
 * Fetch the site content. Resolves to null instead of throwing, so a slow or
 * down API never breaks a page render; callers fall back to defaults.
 */
export const fetchSiteContent = async (timeoutMs = 5000): Promise<SiteContentResponse> => {
  try {
    const res = await axios.get(siteContentUrl(), {
      headers: { Accept: "application/json" },
      timeout: timeoutMs,
    });
    return res.data ?? null;
  } catch {
    return null;
  }
};

/**
 * Site content shared by the hero, testimonials and footer (one request, one
 * cache entry). Pass the content fetched at render time as `initial` so the
 * first paint already has it.
 */
export const usePublicSiteContent = (initial?: SiteContentResponse) =>
  useQuery({
    queryKey: SITE_CONTENT_QUERY_KEY,
    queryFn: () => fetchSiteContent(),
    // Server-rendered content counts as fresh for the default stale time, so
    // the page doesn't refetch straight after hydrating.
    ...(initial ? { initialData: initial, initialDataUpdatedAt: Date.now() } : {}),
    retry: false,
  });
