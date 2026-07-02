"use client";

import { useEffect, useRef } from "react";

export function GridPerspective() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let frame = 0;
    let animationId: number;

    const onMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      };
    };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const draw = () => {
      frame += 0.008;
      const w = canvas.width;
      const h = canvas.height;
      const mx = (mouseRef.current.x - 0.5) * 0.15;
      const my = (mouseRef.current.y - 0.5) * 0.1;

      ctx.clearRect(0, 0, w, h);

      const horizon = h * (0.42 + my * 0.05);
      const vanishX = w * (0.5 + mx);
      const lines = 28;
      const depth = 12;

      ctx.strokeStyle = "rgba(0, 245, 255, 0.06)";
      ctx.lineWidth = 1;

      for (let i = -lines; i <= lines; i++) {
        const spread = (i / lines) * w * 1.4;
        ctx.beginPath();
        ctx.moveTo(vanishX + spread * 0.02, horizon);
        ctx.lineTo(vanishX + spread, h);
        ctx.stroke();
      }

      for (let d = 0; d < depth; d++) {
        const t = (d + 1) / depth;
        const y =
          horizon + (h - horizon) * Math.pow(t, 1.6) + Math.sin(frame + d) * 2;
        const alpha = 0.04 + t * 0.08;
        ctx.strokeStyle = `rgba(168, 85, 247, ${alpha})`;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      const grad = ctx.createRadialGradient(
        vanishX,
        horizon,
        0,
        vanishX,
        horizon,
        w * 0.6
      );
      grad.addColorStop(0, "rgba(0, 245, 255, 0.12)");
      grad.addColorStop(0.4, "rgba(168, 85, 247, 0.04)");
      grad.addColorStop(1, "transparent");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      animationId = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[2] opacity-70 mix-blend-screen"
      aria-hidden
    />
  );
}
