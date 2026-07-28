"use client";

export interface MapLocation {
  longitude: number;
  latitude: number;
  title: string;
  address?: string;
}

interface BaiduMapProps {
  longitude?: number;
  latitude?: number;
  locations?: MapLocation[];
  zoom?: number;
  title?: string;
  className?: string;
  height?: string;
}

/**
 * Build a Baidu Maps public marker embed URL (no AK required, free).
 * https://api.map.baidu.com/marker is a public service for generating
 * interactive map pages with a single marker.
 */
function buildMarkerUrl(loc: MapLocation): string {
  const params = new URLSearchParams();
  // location = lat,lng (BD-09 coordinate system)
  params.set("location", `${loc.latitude},${loc.longitude}`);
  params.set("title", loc.title);
  params.set("content", loc.address ?? loc.title);
  params.set("output", "html");
  params.set("coord_type", "bd09ll");
  params.set("src", "lk-it.cn");
  return `https://api.map.baidu.com/marker?${params.toString()}`;
}

export default function BaiduMap({
  locations,
  longitude,
  latitude,
  zoom: _zoom,
  title = "公司位置",
  className = "",
  height = "400px",
}: BaiduMapProps) {
  // Build location list
  const points: MapLocation[] =
    locations && locations.length > 0
      ? locations
      : [{ longitude: longitude ?? 108.3665, latitude: latitude ?? 22.8173, title }];

  return (
    <div className={className}>
      <div
        className="grid gap-4"
        style={{ gridTemplateColumns: `repeat(${Math.min(points.length, 2)}, 1fr)` }}
      >
        {points.map((loc, i) => (
          <div key={i} className="flex flex-col">
            <div
              className="relative w-full overflow-hidden rounded-lg border border-neutral-200"
              style={{ height }}
            >
              <iframe
                src={buildMarkerUrl(loc)}
                title={`百度地图 - ${loc.title}`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer"
                allow="geolocation"
              />
            </div>
            <p className="mt-2 text-center text-xs text-neutral-400">
              📍 {loc.title}
              {loc.address && ` — ${loc.address}`}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
