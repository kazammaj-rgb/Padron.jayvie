"use client";

import { contactInfo } from "@/lib/data";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  Crosshair,
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

const DARK_STYLE =
  "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json";

export function PremiumLocationMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const markerRef = useRef<maplibregl.Marker | null>(null);
  const [ready, setReady] = useState(false);
  const [zoom, setZoom] = useState(mapConfig.zoom);

  const flyHome = useCallback(
    (duration = 1200) => {
      mapRef.current?.flyTo({
        center: [mapConfig.lng, mapConfig.lat],
        zoom: mapConfig.zoom,
        pitch: mapConfig.pitch,
        bearing: mapConfig.bearing,
        duration,
        essential: true,
      });
    },
    []
  );

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = new maplibregl.Map({
      container: containerRef.current,
      style: DARK_STYLE,
      center: [mapConfig.lng, mapConfig.lat],
      zoom: mapConfig.zoom - 0.8,
      pitch: 42,
      bearing: mapConfig.bearing,
      attributionControl: false,
    });

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
        pitch: mapConfig.pitch,
        bearing: mapConfig.bearing,
        duration: 2200,
        essential: true,
      });

      setReady(true);
    });

    map.on("zoom", () => setZoom(Number(map.getZoom().toFixed(1))));

    mapRef.current = map;

    return () => {
      markerRef.current?.remove();
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
      essential: true,
    });
  };

  const tiltCycle = () => {
    const map = mapRef.current;
    if (!map) return;
    const nextPitch = map.getPitch() > 20 ? 0 : mapConfig.pitch;
    map.easeTo({ pitch: nextPitch, duration: 700 });
  };

  return (
    <div className="premium-map group relative overflow-hidden rounded-2xl border border-cyan-400/20 bg-slate-950 shadow-[0_0_40px_rgba(0,245,255,0.08)]">
      {/* HUD header */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: ready ? 1 : 0, y: ready ? 0 : -8 }}
        className="pointer-events-none absolute left-0 right-0 top-0 z-20 flex items-center justify-between gap-3 border-b border-cyan-400/15 bg-slate-950/85 px-4 py-3 backdrop-blur-md"
      >
        <motion.div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-400" />
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-cyan-400/90">
            Geo API Â· Live
          </span>
        </motion.div>
        <span className="font-mono text-[10px] text-[var(--text-muted)]">
          ZOOM {zoom}
        </span>
      </motion.div>

      {/* Scanline overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-10 opacity-[0.04]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,245,255,0.5) 2px, rgba(0,245,255,0.5) 4px)",
        }}
        aria-hidden
      />

      {/* Corner brackets */}
      <div className="pointer-events-none absolute inset-3 z-10 border border-cyan-400/10" aria-hidden>
        <span className="absolute left-0 top-0 h-4 w-4 border-l-2 border-t-2 border-cyan-400/50" />
        <span className="absolute right-0 top-0 h-4 w-4 border-r-2 border-t-2 border-cyan-400/50" />
        <span className="absolute bottom-0 left-0 h-4 w-4 border-b-2 border-l-2 border-purple-400/50" />
        <span className="absolute bottom-0 right-0 h-4 w-4 border-b-2 border-r-2 border-purple-400/50" />
      </div>

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
        <div className="absolute inset-0 z-[5] flex items-center justify-center bg-slate-950">
          <motion.div
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.2, repeat: Infinity }}
            className="font-mono text-xs uppercase tracking-widest text-cyan-400"
          >
            Initializing map engineâ€¦
          </motion.div>
        </div>
      )}

      {/* Controls */}
      <div className="absolute bottom-4 right-4 z-20 flex flex-col gap-2">
        {[
          { icon: Plus, label: "Zoom in", action: () => adjustZoom(0.85) },
          { icon: Minus, label: "Zoom out", action: () => adjustZoom(-0.85) },
          { icon: RotateCcw, label: "Reset view", action: () => flyHome() },
          { icon: Crosshair, label: "Toggle 3D tilt", action: tiltCycle },
        ].map(({ icon: Icon, label, action }) => (
          <motion.button
            key={label}
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              action();
            }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-400/25 bg-slate-950/90 text-cyan-400 shadow-neon backdrop-blur-md transition-colors hover:border-cyan-400/50 hover:bg-cyan-400/10"
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
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: ready ? 1 : 0, y: ready ? 0 : 8 }}
        transition={{ delay: 0.3 }}
        whileHover={{ scale: 1.02 }}
        className="absolute bottom-4 left-4 z-20 flex max-w-[calc(100%-5.5rem)] items-center gap-3 rounded-xl border border-purple-500/25 bg-slate-950/90 px-4 py-3 backdrop-blur-md transition-all hover:border-cyan-400/40 hover:shadow-neon"
      >
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-400/20 to-purple-500/20">
          <MapPin className="h-4 w-4 text-cyan-400" />
        </div>
        <div className="min-w-0 text-left">
          <p className="truncate text-sm font-semibold text-[var(--text-primary)]">
            {mapConfig.label}
          </p>
          <p className="flex items-center gap-1 text-xs text-cyan-400/90">
            Open in Google Maps
            <ExternalLink className="h-3 w-3 shrink-0" />
          </p>
        </div>
      </motion.a>

      <p className="pointer-events-none absolute bottom-1 right-20 z-20 font-mono text-[9px] text-slate-500">
        Click map Â· navigate
      </p>
    </div>
  );
}
