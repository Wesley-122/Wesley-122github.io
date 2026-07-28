"use client";

import { cn } from "@/lib/cn";

/* -------------------------------------------------------------------------- */
/*  Company Locations                                                          */
/* -------------------------------------------------------------------------- */

const LOCATIONS = [
  {
    name: "总部 · 南宁",
    address: "青秀区民族大道89号金禄大厦11层G座",
    lat: 22.8173,
    lng: 108.3665,
  },
  {
    name: "运营中心 · 柳州",
    address: "城中区桂中大道南端6号九洲国际20层",
    lat: 24.325,
    lng: 109.433,
  },
];

/**
 * Build a Baidu Maps public marker embed URL.
 * This is the official free embed API — no AK or billing required.
 */
function buildMarkerUrl(lat: number, lng: number, title: string, address: string): string {
  const params = new URLSearchParams();
  params.set("location", `${lat},${lng}`);
  params.set("title", `箩筐科技 LKtechnology · ${title}`);
  params.set("content", address);
  params.set("output", "html");
  params.set("coord_type", "bd09ll");
  params.set("src", "lk-it.cn");
  return `https://api.map.baidu.com/marker?${params.toString()}`;
}

/* -------------------------------------------------------------------------- */
/*  ContactMap                                                                */
/* -------------------------------------------------------------------------- */

interface ContactMapProps {
  className?: string;
}

export default function ContactMap({ className }: ContactMapProps) {
  return (
    <div className={cn("space-y-4", className)}>
      <div className="grid gap-4 sm:grid-cols-2">
        {LOCATIONS.map((loc, i) => (
          <div key={i} className="flex flex-col">
            <div className="relative w-full overflow-hidden rounded-lg border border-neutral-200 h-80">
              <iframe
                src={buildMarkerUrl(loc.lat, loc.lng, loc.name, loc.address)}
                title={`百度地图 - ${loc.name}`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer"
                allow="geolocation"
              />
            </div>
            <p className="mt-2 text-center text-xs text-neutral-400">
              📍 {loc.name} — {loc.address}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
