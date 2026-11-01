"use client";

import { contactInfo } from "@/lib/data";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  ExternalLink,
  MapPin,
  Minus,
  Plus,
  RotateCcw,
} from "lucide-react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { useCallback, useEffect, useRef, useState } from "react";

const { map: mapConfig, mapUrl } = contactInfo;

const DARK_STYLE = "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json";
const LIGHT_STYLE = "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json";
const getMapStyle = () => document.documentElement.classList.contains("light") ? LIGHT_STYLE : DARK_STYLE;

export function PremiumLocationMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const markerRef = useRef<maplibregl.Marker | null>(null);
  const [unavailable, setUnavailable] = useState(false);
  const [ready, setReady] = useState(false);
  const [zoom, setZoom] = useState(mapConfig.zoom);

  const flyHome = useCallback(
    (duration = 1200) => {
      mapRef.current?.flyTo({
        center: [mapConfig.lng, mapConfig.lat],
        zoom: mapConfig.zoom,
        pitch: 0,
        bearing: 0,
        duration,
        essential: false,
      });
    },
    []
  );

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    let map: maplibregl.Map;
    try {
      map = new maplibregl.Map({
      container: containerRef.current,
      style: getMapStyle(),
      center: [mapConfig.lng, mapConfig.lat],
      zoom: mapConfig.zoom - 0.8,
      pitch: 0,
      bearing: 0,
      attributionControl: false,
      });
    } catch {
      setUnavailable(true);
      return;
    }
    // Keep the map consistent with the sidebar theme, without recreating it.
    let currentStyle = getMapStyle();
    const themeObserver = new MutationObserver(() => {
      const nextStyle = getMapStyle();
      if (nextStyle !== currentStyle) {
        currentStyle = nextStyle;
        map.setStyle(nextStyle);
      }
    });
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    map.on("error", () => { if (!map.loaded()) setUnavailable(true); });

    map.addControl(
      new maplibregl.AttributionControl({ compact: true }),
      "bottom-left"
    );

    map.on("load", () => {
      mapRef.current = map;

      const el = document.createElement("div");
      el.className = "map-marker-pulse";
      el.innerHTML = `<span class="map-marker-core"></span><span class="map-marker-ring"></span>`;

      markerRef.current = new maplibregl.Marker({ element: el, anchor: "bottom" })
        .setLngLat([mapConfig.lng, mapConfig.lat])
        .addTo(map);

      map.flyTo({
        center: [mapConfig.lng, mapConfig.lat],
        zoom: mapConfig.zoom,
        pitch: 0,
        bearing: 0,
        duration: 600,
        essential: false,
      });

      setReady(true);
      setUnavailable(false);
    });

    map.on("zoom", () => setZoom(Number(map.getZoom().toFixed(1))));

    mapRef.current = map;

    return () => {
      themeObserver.disconnect();
      markerRef.current?.remove();
      markerRef.current = null;
      map.remove();
      mapRef.current = null;
    };
  }, []);

  const adjustZoom = (delta: number) => {
    const map = mapRef.current;
    if (!map) return;
    map.easeTo({
      zoom: map.getZoom() + delta,
      duration: 450,
      essential: false,
    });
  };

  return (
    <div className="premium-map group relative overflow-hidden rounded-2xl border border-accent/20 bg-[var(--bg-secondary)] ">
      {/* HUD header */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: ready ? 1 : 0, y: ready ? 0 : -8 }}
        className="pointer-events-none absolute left-0 right-0 top-0 z-20 flex items-center justify-between gap-3 border-b border-accent/15 bg-[var(--bg-secondary)] px-4 py-3 backdrop-blur-md"
      >
        <motion.div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent/90">
            Geo API Â· Live
          </span>
        </motion.div>
        <span className="font-mono text-[10px] text-[var(--text-muted)]">
          ZOOM {zoom}
        </span>
      </motion.div>

      <div
        ref={containerRef}
        className={cn(
          "premium-map-canvas relative h-[min(420px,55vh)] w-full min-h-[280px] transition-opacity duration-700 md:h-[420px]",
          ready ? "opacity-100" : "opacity-0"
        )}
        role="application"
        aria-label={`Interactive map of ${mapConfig.label}`}
      />

      {!ready && (
        <div className="absolute inset-0 z-[5] flex items-center justify-center bg-[var(--bg-secondary)]">
          <motion.div
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, repeat: Infinity }}
            className="font-mono text-xs uppercase tracking-widest text-accent"
          >
            {unavailable ? mapConfig.label : "Initializing map engineâ€¦"}
          </motion.div>
        </div>
      )}

      {/* Controls */}
      <div className="absolute bottom-4 right-4 z-20 flex flex-col gap-2">
        {[
          { icon: Plus, label: "Zoom in", action: () => adjustZoom(0.85) },
          { icon: Minus, label: "Zoom out", action: () => adjustZoom(-0.85) },
          { icon: RotateCcw, label: "Reset view", action: () => flyHome() },
        ].map(({ icon: Icon, label, action }) => (
          <motion.button
            key={label}
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              action();
            }}
            disabled={!ready}
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.95 }}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-accent/25 bg-[var(--bg-secondary)] text-accent transition-colors hover:border-accent/50 hover:bg-accent/10"
            aria-label={label}
          >
            <Icon className="h-4 w-4" />
          </motion.button>
        ))}
      </div>

      {/* Footer CTA */}
      <motion.a
        href={mapUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => e.stopPropagation()}
        initial={false}
        transition={{ delay: 0.3 }}
        whileHover={{ y: -1 }}
        className="absolute bottom-4 left-4 z-20 flex max-w-[calc(100%-5.5rem)] items-center gap-3 rounded-xl border border-accent/25 bg-[var(--bg-secondary)] px-4 py-3 backdrop-blur-md transition-all hover:border-accent/40 hover:shadow-neon"
      >
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-accent/20 to-accent/20">
          <MapPin className="h-4 w-4 text-accent" />
        </div>
        <div className="min-w-0 text-left">
          <p className="truncate text-sm font-semibold text-[var(--text-primary)]">
            {mapConfig.label}
          </p>
          <p className="flex items-center gap-1 text-xs text-accent/90">
            Open in Google Maps
            <ExternalLink className="h-3 w-3 shrink-0" />
          </p>
        </div>
      </motion.a>

      <p className="pointer-events-none absolute bottom-1 right-20 z-20 font-mono text-[9px] text-[var(--text-muted)]">
        Click map Â· navigate
      </p>
    </div>
  );
}
