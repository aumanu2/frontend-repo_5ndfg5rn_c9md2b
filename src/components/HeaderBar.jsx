import { useEffect } from 'react';

export default function HeaderBar({ t, lang, setLang, dark, setDark }) {
  useEffect(() => {
    if (dark) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [dark]);

  return (
    <div className="flex items-center justify-between px-4 py-3 rounded-xl bg-white/70 dark:bg-zinc-900/70 backdrop-blur border border-zinc-200 dark:border-zinc-800 shadow-sm">
      <div className="flex items-center gap-2">
        <span className="font-semibold text-zinc-900 dark:text-zinc-100">HanzTravel</span>
        <span className="text-xs text-zinc-500">✈️</span>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => setDark((d) => !d)}
          className="px-3 py-1.5 text-sm rounded-md border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-100"
        >
          {dark ? '🌙 Dark' : '☀️ Light'}
        </button>
        <button
          onClick={() => setLang(lang === 'id' ? 'en' : 'id')}
          className="px-3 py-1.5 text-sm rounded-md border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-100"
        >
          {lang === 'id' ? '🇮🇩 IN' : '🇬🇧 EN'}
        </button>
      </div>
    </div>
  );
}
