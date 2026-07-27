"use client";

import dynamic from "next/dynamic";

/**
 * Client-side wrapper that dynamically imports ContactMap with SSR disabled.
 * Leaflet references `window` at module level, so it cannot be server-rendered.
 */
const ContactMap = dynamic(() => import("@/components/shared/ContactMap"), {
  ssr: false,
  loading: () => (
    <div className="h-64 w-full animate-pulse rounded-xl bg-neutral-100" />
  ),
});

export default ContactMap;
