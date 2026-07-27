"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { cn } from "@/lib/cn";

interface ContactMapProps {
  className?: string;
}

/** Inline SVG marker — no external image dependency (Turbopack-safe). */
const MARKER_HTML = `
<div style="
  display:flex; align-items:center; justify-content:center;
  width:32px; height:44px;
">
  <svg width="32" height="44" viewBox="0 0 24 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 0C5.372 0 0 5.372 0 12c0 9 12 24 12 24s12-15 12-24C24 5.372 18.628 0 12 0z" fill="#2563EB"/>
    <circle cx="12" cy="12" r="5" fill="white"/>
  </svg>
</div>`;

// Marker icon created lazily to avoid module-level L.divIcon() call
function createMarkerIcon() {
  return L.divIcon({
    html: MARKER_HTML,
    className: "",
    iconSize: [32, 44],
    iconAnchor: [16, 44],
    popupAnchor: [0, -44],
  });
}

/**
 * Tile-layer sources — ordered by likelihood of working inside mainland China.
 * Falls back through the list until one loads successfully.
 */
const TILE_SOURCES: Array<{ name: string; url: string; attribution: string }> = [
  {
    name: "高德",
    url: "https://webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}",
    attribution:
      '&copy; <a href="https://www.amap.com/">高德地图</a> AutoNavi',
  },
  {
    name: "OSM (tile.openstreetmap.org)",
    url: "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  },
  {
    name: "CartoDB Positron",
    url: "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png",
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>',
  },
];

export default function ContactMap({ className }: ContactMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    // Company HQ: 南宁市·青秀区民族大道89号金禄大厦
    const HQ_COORDS: L.LatLngTuple = [22.815, 108.350];

    const map = L.map(mapContainerRef.current, {
      center: HQ_COORDS,
      zoom: 15,
      scrollWheelZoom: false,
      attributionControl: false,
    });

    // Attempt tile sources in order; stop at the first one that loads
    let tileIndex = 0;
    let currentLayer: L.TileLayer | null = null;

    function tryNextTileSource() {
      if (tileIndex >= TILE_SOURCES.length) return;

      const source = TILE_SOURCES[tileIndex];
      const subdomains = source.url.includes("{s}")
        ? ["0", "1", "2", "3"]
        : undefined;

      const layer = L.tileLayer(source.url, {
        attribution: source.attribution,
        maxZoom: 19,
        ...(subdomains ? { subdomains: subdomains.map(String) } : {}),
      });

      layer.on("tileerror", () => {
        map.removeLayer(layer);
        tileIndex++;
        tryNextTileSource();
      });

      layer.addTo(map);
      currentLayer = layer;

      // eslint-disable-next-line no-console
      console.log(`[ContactMap] Trying tile source: ${source.name}`);
    }

    tryNextTileSource();

    // Marker
    L.marker(HQ_COORDS, {
      icon: createMarkerIcon(),
      title: "箩筐科技 LKtechnology",
    })
      .addTo(map)
      .bindPopup(
        "<strong>箩筐科技 LKtechnology</strong><br/>南宁市·青秀区民族大道89号金禄大厦11层G座"
      );

    // Fix tile layout after CSS has settled (handles rounded corners etc.)
    setTimeout(() => map.invalidateSize(), 100);

    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  return (
    <div
      ref={mapContainerRef}
      className={cn("h-64 w-full rounded-xl bg-neutral-100", className)}
      aria-label="Company location map"
    />
  );
}
