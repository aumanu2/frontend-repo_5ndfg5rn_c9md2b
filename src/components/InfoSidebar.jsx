import { useMemo } from 'react';

const crewData = {
  garuda: {
    name: 'Garuda Indonesia',
    crew: ['Capt. A. Pratama', 'FO N. Siregar', 'FA L. Saraswati', 'FA R. Putra'],
    facilities: ['In-flight Wi‑Fi', 'Hot meals', 'USB charging', '30kg baggage'],
  },
  emirates: {
    name: 'Emirates',
    crew: ['Capt. H. Al Maktoum', 'FO S. Khan', 'FA M. Ali', 'FA N. Rahman'],
    facilities: ['ICE entertainment', 'Onboard Wi‑Fi', 'Gourmet dining', 'Generous legroom'],
  },
  singapore: {
    name: 'Singapore Airlines',
    crew: ['Capt. T. Lim', 'FO J. Tan', 'FA C. Ong', 'FA P. Lee'],
    facilities: ['KrisWorld', 'Comfort kit', 'Wi‑Fi', 'Checked bag 30kg'],
  },
};

export default function InfoSidebar({ t, livery }) {
  const info = useMemo(() => crewData[livery], [livery]);

  return (
    <aside className="space-y-4">
      <div className="p-4 rounded-xl bg-white/70 dark:bg-zinc-900/70 border border-zinc-200 dark:border-zinc-800">
        <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">{t.airline}</h3>
        <p className="text-sm text-zinc-600 dark:text-zinc-300">{info.name}</p>
      </div>
      <div className="p-4 rounded-xl bg-white/70 dark:bg-zinc-900/70 border border-zinc-200 dark:border-zinc-800">
        <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-2">{t.crew}</h3>
        <ul className="text-sm space-y-1 text-zinc-700 dark:text-zinc-300">
          {info.crew.map((c) => (
            <li key={c}>• {c}</li>
          ))}
        </ul>
      </div>
      <div className="p-4 rounded-xl bg-white/70 dark:bg-zinc-900/70 border border-zinc-200 dark:border-zinc-800">
        <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-2">{t.facilities}</h3>
        <ul className="text-sm space-y-1 text-zinc-700 dark:text-zinc-300">
          {info.facilities.map((f) => (
            <li key={f}>• {f}</li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
