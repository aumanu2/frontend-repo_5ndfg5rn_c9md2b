import { useState } from 'react';

const images = {
  garuda: {
    front: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=1600&auto=format&fit=crop',
    side: 'https://images.unsplash.com/photo-1524593023291-7747d803a1e3?q=80&w=1600&auto=format&fit=crop',
    top: 'https://images.unsplash.com/photo-1548686304-84f6e02f4a8b?q=80&w=1600&auto=format&fit=crop',
  },
  emirates: {
    front: 'https://images.unsplash.com/photo-1553406621-67ebd3c2ba37?q=80&w=1600&auto=format&fit=crop',
    side: 'https://images.unsplash.com/photo-1556409233-6c3a8f8a660e?q=80&w=1600&auto=format&fit=crop',
    top: 'https://images.unsplash.com/photo-1504214208698-ea1916a2195a?q=80&w=1600&auto=format&fit=crop',
  },
  singapore: {
    front: 'https://images.unsplash.com/photo-1526711657229-e7e080ed7aa0?q=80&w=1600&auto=format&fit=crop',
    side: 'https://images.unsplash.com/photo-1485965418477-36fdc2dfb3b8?q=80&w=1600&auto=format&fit=crop',
    top: 'https://images.unsplash.com/photo-1521043726650-5a810fda9664?q=80&w=1600&auto=format&fit=crop',
  },
};

export default function PlaneViewer({ t, livery, setLivery }) {
  const [angle, setAngle] = useState('front');
  const [zoom, setZoom] = useState(1);

  const cycleAngle = (dir) => {
    const order = ['front', 'side', 'top'];
    const idx = order.indexOf(angle);
    const next = dir === 'left' ? (idx - 1 + order.length) % order.length : (idx + 1) % order.length;
    setAngle(order[next]);
  };

  const src = images[livery][angle];

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          {['garuda','emirates','singapore'].map((name) => (
            <button
              key={name}
              onClick={() => setLivery(name)}
              className={`px-3 py-1.5 rounded-md text-sm border ${livery===name? 'bg-blue-600 text-white border-blue-600' : 'border-zinc-300 dark:border-zinc-700 text-zinc-800 dark:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800'}`}
            >
              {name.charAt(0).toUpperCase()+name.slice(1)}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <button onClick={() => cycleAngle('left')} className="px-3 py-1.5 rounded-md border border-zinc-300 dark:border-zinc-700 text-sm">⟲ {t.rotateLeft}</button>
          <button onClick={() => cycleAngle('right')} className="px-3 py-1.5 rounded-md border border-zinc-300 dark:border-zinc-700 text-sm">⟳ {t.rotateRight}</button>
        </div>
      </div>

      <div className="relative w-full aspect-video overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
        <img
          src={src}
          alt={`${livery} ${angle}`}
          className="w-full h-full object-contain transition-transform duration-300"
          style={{ transform: `scale(${zoom})` }}
        />

        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-white/70 dark:bg-zinc-900/70 backdrop-blur px-3 py-1.5 rounded-full border border-zinc-200 dark:border-zinc-800">
          <span className="text-xs text-zinc-500">{t.zoom}</span>
          <input type="range" min="1" max="2" step="0.05" value={zoom} onChange={(e)=>setZoom(parseFloat(e.target.value))} />
        </div>

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white/30 dark:from-black/30 via-transparent to-transparent"></div>
      </div>

      <div className="grid grid-cols-3 gap-2 text-xs text-zinc-600 dark:text-zinc-300">
        <div className="p-2 rounded-md bg-white/70 dark:bg-zinc-900/70 border border-zinc-200 dark:border-zinc-800">{t.tipClick} ⟲ ⟳</div>
        <div className="p-2 rounded-md bg-white/70 dark:bg-zinc-900/70 border border-zinc-200 dark:border-zinc-800">{t.tipZoom}</div>
        <div className="p-2 rounded-md bg-white/70 dark:bg-zinc-900/70 border border-zinc-200 dark:border-zinc-800">{t.tipLivery}</div>
      </div>
    </div>
  );
}
