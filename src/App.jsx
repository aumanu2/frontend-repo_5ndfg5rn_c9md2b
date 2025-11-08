import { useMemo, useState } from 'react';
import HeaderBar from './components/HeaderBar';
import PlaneViewer from './components/PlaneViewer';
import RouteVisualizer from './components/RouteVisualizer';
import InfoSidebar from './components/InfoSidebar';
import LottieWing from './components/LottieWing';

const translations = {
  id: {
    headline: 'Pemesanan Tiket Pesawat — Interaktif & Ringan',
    sub: 'Jelajahi pesawat, lihat rute, pilih maskapai & fasilitas. Semua dalam satu halaman cepat.',
    rotateLeft: 'Putar Kiri',
    rotateRight: 'Putar Kanan',
    zoom: 'Zoom',
    tipClick: 'Klik tombol untuk ganti sudut',
    tipZoom: 'Geser untuk zoom',
    tipLivery: 'Pilih livery maskapai',
    routeLabel: 'Rute: Jakarta (CGK) → Bali (DPS)',
    airline: 'Maskapai',
    crew: 'Kru Penerbangan',
    facilities: 'Fasilitas',
    miniAnims: 'Animasi Ringan',
    miniAnimsDesc: 'Sayap bergoyang & lampu menyala menggunakan Lottie.',
    footer: '© 2025 HanzTravel — Visit the Whole World · Crafted with precision and passion',
  },
  en: {
    headline: 'Flight Booking — Interactive & Lightweight',
    sub: 'Explore the aircraft, visualize routes, choose airlines & amenities. All in one fast page.',
    rotateLeft: 'Rotate Left',
    rotateRight: 'Rotate Right',
    zoom: 'Zoom',
    tipClick: 'Use buttons to change view',
    tipZoom: 'Slide to zoom',
    tipLivery: 'Choose airline livery',
    routeLabel: 'Route: Jakarta (CGK) → Bali (DPS)',
    airline: 'Airline',
    crew: 'Flight Crew',
    facilities: 'Facilities',
    miniAnims: 'Tiny Animations',
    miniAnimsDesc: 'Wiggling wing & lights using Lottie.',
    footer: '© 2025 HanzTravel — Visit the Whole World · Crafted with precision and passion',
  },
};

export default function App() {
  const [lang, setLang] = useState('id');
  const [dark, setDark] = useState(false);
  const [livery, setLivery] = useState('garuda');
  const t = useMemo(() => translations[lang], [lang]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white dark:from-zinc-950 dark:to-zinc-950 text-zinc-800 dark:text-zinc-100">
      <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        <HeaderBar t={t} lang={lang} setLang={setLang} dark={dark} setDark={setDark} />

        <header className="text-center space-y-2">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight">{t.headline}</h1>
          <p className="text-zinc-600 dark:text-zinc-300 max-w-2xl mx-auto">{t.sub}</p>
        </header>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <PlaneViewer t={t} livery={livery} setLivery={setLivery} />
            <RouteVisualizer t={t} />
            <LottieWing t={t} />
          </div>
          <div className="lg:col-span-1">
            <InfoSidebar t={t} livery={livery} />
          </div>
        </div>

        <footer className="text-center text-sm text-zinc-500 pt-4 border-t border-zinc-200 dark:border-zinc-800">
          {t.footer}
        </footer>
      </div>
    </div>
  );
}
