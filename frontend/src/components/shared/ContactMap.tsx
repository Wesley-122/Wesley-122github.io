"use client";

import { useEffect, useRef, useCallback } from "react";
import { cn } from "@/lib/cn";

/* -------------------------------------------------------------------------- */
/*  Type declarations for Baidu Maps GL (BMapGL)                              */
/* -------------------------------------------------------------------------- */
/* eslint-disable @typescript-eslint/no-explicit-any */
declare global {
  interface Window {
    BMapGL: any;
  }
}
type BMapInstance = any;
/* eslint-enable @typescript-eslint/no-explicit-any */

/* -------------------------------------------------------------------------- */
/*  Constants                                                                  */
/* -------------------------------------------------------------------------- */

const BAIDU_AK = process.env.NEXT_PUBLIC_BAIDU_MAP_AK ?? "";
const BAIDU_SCRIPT = `https://api.map.baidu.com/api?v=1.0&type=webgl&ak=${BAIDU_AK}`;

const COMPANY_NAME = "箩筐科技 LKtechnology";
const COMPANY_ADDRESS = "南宁市青秀区民族大道89号金禄大厦";
const COMPANY_FULL = "南宁市·青秀区民族大道89号金禄大厦11层G座";
const ZOOM = 17;

/**
 * Generate the InfoWindow HTML, optionally with precise coordinates
 * for the "navigate" deep-link.
 */
function buildPopupHTML(
  lng?: number,
  lat?: number,
): string {
  const encodedAddr = encodeURIComponent(COMPANY_ADDRESS);
  const encodedName = encodeURIComponent(COMPANY_NAME);

  // Navigation links
  const searchUrl = `https://map.baidu.com/search/${encodedAddr}?type=gc`;
  let directionUrl = `https://api.map.baidu.com/direction?destination=${encodedAddr}&output=html&src=lktechnology`;

  // If we have precise coords, use the higher-quality marker page
  let markerUrl = "";
  if (lng != null && lat != null) {
    markerUrl =
      `https://api.map.baidu.com/marker?` +
      `location=${lat},${lng}&title=${encodedName}&content=${encodedAddr}&output=html&coord_type=bd09ll`;
    directionUrl =
      `https://api.map.baidu.com/direction?` +
      `destination=latlng:${lat},${lng}|name:${encodedName}&coord_type=bd09ll&output=html&src=lktechnology`;
  }

  const viewLink = markerUrl || searchUrl;

  return `
    <div style="font-family: system-ui, -apple-system, sans-serif; min-width: 240px;">
      <strong style="font-size: 14px; color: #171717;">${COMPANY_NAME}</strong>
      <p style="margin: 4px 0 10px; font-size: 12px; color: #737373;">${COMPANY_FULL}</p>
      <div style="display: flex; gap: 8px;">
        <a href="${viewLink}"
           target="_blank"
           rel="noopener"
           style="
             display: inline-flex; align-items: center; gap: 4px;
             padding: 5px 12px; font-size: 12px; color: #fff;
             background: #2563EB; border-radius: 6px; text-decoration: none;
           ">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20"/><path d="M2 12h20"/>
          </svg>
          ${"查看地图"}
        </a>
        <a href="${directionUrl}"
           target="_blank"
           rel="noopener"
           style="
             display: inline-flex; align-items: center; gap: 4px;
             padding: 5px 12px; font-size: 12px; color: #2563EB;
             background: #EFF6FF; border-radius: 6px; text-decoration: none;
           ">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polygon points="3,11 22,2 13,21 11,13 3,11"/>
          </svg>
          ${"导航至此"}
        </a>
      </div>
    </div>`;
}

/* -------------------------------------------------------------------------- */
/*  ContactMap                                                                */
/* -------------------------------------------------------------------------- */

interface ContactMapProps {
  className?: string;
}

export default function ContactMap({ className }: ContactMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<BMapInstance>(null);
  /** Store precise geocoded coords so we can rebuild the popup later. */
  const preciseRef = useRef<{ lng: number; lat: number } | null>(null);
  const infoWindowRef = useRef<any>(null);
  const markerRef = useRef<any>(null);

  /** (Re-)open the info window with current best coordinates. */
  const openInfoWindow = useCallback(
    (map: BMapInstance, pt?: { lng: number; lat: number }) => {
      const BMapGL = window.BMapGL;
      if (!BMapGL || !map) return;

      const lng = pt?.lng ?? preciseRef.current?.lng;
      const lat = pt?.lat ?? preciseRef.current?.lat ?? undefined;

      const html = buildPopupHTML(lng, lat as number | undefined);
      const p = pt
        ? new BMapGL.Point(pt.lng, pt.lat)
        : new BMapGL.Point(preciseRef.current!.lng, preciseRef.current!.lat);

      if (infoWindowRef.current) {
        // Update content instead of recreating
        infoWindowRef.current.setContent(html);
      } else {
        infoWindowRef.current = new BMapGL.InfoWindow(html, {
          width: 280,
          title: "",
        });
      }
      map.openInfoWindow(infoWindowRef.current, p);
    },
    [],
  );

  useEffect(() => {
    if (!containerRef.current) return;

    let cancelled = false;

    function bootstrap() {
      if (cancelled || !containerRef.current || mapRef.current) return;

      const BMapGL = window.BMapGL;
      if (!BMapGL) return;

      /* ---- map instance ---- */
      const map = new BMapGL.Map(containerRef.current);
      mapRef.current = map;
      map.enableScrollWheelZoom(false);

      // Controls
      map.addControl(new BMapGL.ScaleControl());
      map.addControl(
        new BMapGL.ZoomControl({ anchor: 1 /* top-right */ }),
      );

      /* ---- initial approximate centre (BD-09) ---- */
      const approx = new BMapGL.Point(108.357, 22.819);
      map.centerAndZoom(approx, ZOOM);

      /* ---- marker ---- */
      const marker = new BMapGL.Marker(approx);
      markerRef.current = marker;
      map.addOverlay(marker);

      // Default popup (before geocode returns)
      const infoWindow = new BMapGL.InfoWindow(buildPopupHTML(), {
        width: 280,
        title: "",
      });
      infoWindowRef.current = infoWindow;
      map.openInfoWindow(infoWindow, approx);

      marker.addEventListener("click", () => {
        openInfoWindow(map);
      });

      /* ---- geocode for precise position ---- */
      const geocoder = new BMapGL.Geocoder();
      geocoder.getPoint(
        COMPANY_ADDRESS,
        (pt: { lng: number; lat: number } | null) => {
          if (cancelled || !pt) return;

          preciseRef.current = { lng: pt.lng, lat: pt.lat };
          const precise = new BMapGL.Point(pt.lng, pt.lat);

          map.centerAndZoom(precise, ZOOM);
          marker.setPosition(precise);
          openInfoWindow(map, pt);
        },
        "南宁市",
      );
    }

    /* ---- script loading ---- */
    if (window.BMapGL) {
      bootstrap();
    } else {
      const existing = document.querySelector<HTMLScriptElement>(
        `script[data-baidu-map]`,
      );
      if (existing) {
        existing.addEventListener("load", bootstrap);
        if (window.BMapGL) bootstrap();
      } else {
        const script = document.createElement("script");
        script.src = BAIDU_SCRIPT;
        script.dataset.baiduMap = "";
        script.async = true;
        script.onload = bootstrap;
        document.head.appendChild(script);
      }
    }

    return () => {
      cancelled = true;
      if (mapRef.current) {
        try {
          mapRef.current.destroy();
        } catch {
          // ignore
        }
        mapRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn("h-64 w-full rounded-xl bg-neutral-100", className)}
      aria-label="Company location map — Baidu Maps"
    />
  );
}
