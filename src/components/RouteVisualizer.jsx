import { useEffect, useRef } from 'react';

// Simple Leaflet-like minimal map using MapLibre GL JS via CDN is not guaranteed here.
// We'll implement a lightweight canvas based arc to avoid external deps.

export default function RouteVisualizer({ t }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.parentElement.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = rect.width + 'px';
      canvas.style.height = rect.height + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw();
    };

    const draw = () => {
      const w = canvas.width / (window.devicePixelRatio || 1);
      const h = canvas.height / (window.devicePixelRatio || 1);
      ctx.clearRect(0, 0, w, h);

      // Background grid mimicking a map
      ctx.fillStyle = getComputedStyle(document.body).classList?.contains('dark') ? '#0a0a0a' : '#f8fafc';
      ctx.fillStyle = document.body.classList.contains('dark') ? '#0a0a0a' : '#f8fafc';
      ctx.fillRect(0, 0, w, h);
      ctx.strokeStyle = document.body.classList.contains('dark') ? '#1f2937' : '#e5e7eb';
      for (let i = 0; i < w; i += 24) {
        ctx.beginPath();
        ctx.moveTo(i, 0); ctx.lineTo(i, h); ctx.stroke();
      }
      for (let j = 0; j < h; j += 24) {
        ctx.beginPath();
        ctx.moveTo(0, j); ctx.lineTo(w, j); ctx.stroke();
      }

      // Project lat/lon to simple mercator-like projection onto canvas
      const lonLatToXY = (lon, lat) => {
        const x = (lon + 180) * (w / 360);
        const latRad = lat * Math.PI / 180;
        const mercN = Math.log(Math.tan(Math.PI / 4 + latRad / 2));
        const y = (h / 2) - (w * mercN / (2 * Math.PI));
        return { x, y };
      };

      const jakarta = lonLatToXY(106.8456, -6.2088);
      const bali = lonLatToXY(115.1889, -8.4095);

      // Compute control point for a nice arc
      const cx = (jakarta.x + bali.x) / 2;
      const cy = Math.min(jakarta.y, bali.y) - Math.hypot(bali.x - jakarta.x, bali.y - jakarta.y) * 0.2;

      // Draw arc
      ctx.lineWidth = 2;
      ctx.strokeStyle = '#2563eb';
      ctx.beginPath();
      ctx.moveTo(jakarta.x, jakarta.y);
      ctx.quadraticCurveTo(cx, cy, bali.x, bali.y);
      ctx.stroke();

      // Draw points
      ctx.fillStyle = '#10b981';
      ctx.beginPath(); ctx.arc(jakarta.x, jakarta.y, 5, 0, Math.PI*2); ctx.fill();
      ctx.fillStyle = '#ef4444';
      ctx.beginPath(); ctx.arc(bali.x, bali.y, 5, 0, Math.PI*2); ctx.fill();

      // Plane icon moving along the arc
      const tNow = ((Date.now()/1000) % 6) / 6; // loop every 6s
      const { x: px, y: py } = pointOnQuad(jakarta, {x: cx, y: cy}, bali, easeInOutSine(tNow));

      drawPlane(px, py);

      requestAnimationFrame(draw);
    };

    const easeInOutSine = (t) => -(Math.cos(Math.PI * t) - 1) / 2;

    const pointOnQuad = (p0, p1, p2, t) => {
      const x = (1 - t) * (1 - t) * p0.x + 2 * (1 - t) * t * p1.x + t * t * p2.x;
      const y = (1 - t) * (1 - t) * p0.y + 2 * (1 - t) * t * p1.y + t * t * p2.y;
      return { x, y };
    };

    const drawPlane = (x, y) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.fillStyle = '#111827';
      ctx.beginPath();
      ctx.moveTo(0, -6);
      ctx.lineTo(18, 0);
      ctx.lineTo(0, 6);
      ctx.lineTo(4, 0);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas.parentElement);
    return () => ro.disconnect();
  }, []);

  return (
    <div className="relative w-full h-64 sm:h-72 md:h-80 lg:h-96 rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
      <canvas ref={canvasRef} className="w-full h-full" />
      <div className="absolute top-3 left-3 px-2 py-1.5 rounded-md text-xs bg-white/70 dark:bg-zinc-900/70 backdrop-blur border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300">
        {t.routeLabel}
      </div>
    </div>
  );
}
