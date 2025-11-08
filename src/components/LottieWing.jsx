import { useEffect, useRef } from 'react';

// Lightweight Lottie player via <lottie-player> web component from unpkg CDN.
// We dynamically inject the script once, then use the element.

const ensureLottieScript = () => {
  if (document.getElementById('lottie-player-script')) return;
  const s = document.createElement('script');
  s.id = 'lottie-player-script';
  s.src = 'https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js';
  document.body.appendChild(s);
};

export default function LottieWing({ t }) {
  const ref = useRef(null);

  useEffect(() => {
    ensureLottieScript();
  }, []);

  return (
    <div className="p-4 rounded-xl bg-white/70 dark:bg-zinc-900/70 border border-zinc-200 dark:border-zinc-800 flex items-center justify-between gap-4">
      <div>
        <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">{t.miniAnims}</h3>
        <p className="text-sm text-zinc-600 dark:text-zinc-300">{t.miniAnimsDesc}</p>
      </div>
      <div className="w-28 h-28">
        <lottie-player
          ref={ref}
          autoplay
          loop
          mode="normal"
          src="https://assets4.lottiefiles.com/packages/lf20_7ZV9n9.json"
          style={{ width: '100%', height: '100%' }}
        ></lottie-player>
      </div>
    </div>
  );
}
