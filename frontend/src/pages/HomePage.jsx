// frontend/src/pages/HomePage.jsx
import { FaDiscord, FaInstagram, FaTrophy, FaUsers, FaYoutube } from 'react-icons/fa';
import { GiCrossedSwords } from 'react-icons/gi';
import { Link } from 'react-router-dom';

const games = [
  { name: 'BGMI', mode: 'Battle Royale', accent: 'from-emerald-500/20 to-emerald-500/5' },
  { name: 'Valorant', mode: 'Tactical FPS', accent: 'from-red-500/20 to-red-500/5' },
  { name: 'Free Fire', mode: 'Fast BR', accent: 'from-orange-500/20 to-orange-500/5' },
  { name: 'CS2', mode: 'Competitive FPS', accent: 'from-sky-500/20 to-sky-500/5' }
];

const stats = [
  { label: 'Tournaments Won', value: '28+', icon: FaTrophy },
  { label: 'Active Players', value: '150+', icon: FaUsers },
  { label: 'Matches Played', value: '900+', icon: GiCrossedSwords }
];

export default function HomePage() {
  return (
    <div className="space-y-10">
      <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#111111] p-8 text-center shadow-[0_20px_50px_rgba(0,0,0,0.45)] md:p-12">
        <div className="pointer-events-none absolute -left-20 -top-20 h-56 w-56 rounded-full bg-[#D61F1F]/25 blur-3xl" />
        <div className="pointer-events-none absolute -right-20 -bottom-20 h-56 w-56 rounded-full bg-[#FF3B3B]/20 blur-3xl" />

        <h1 className="relative mb-3 text-4xl font-black uppercase tracking-[0.12em] md:text-6xl">
          <span className="text-[#D61F1F]">Gods of </span>
          <span className="text-white drop-shadow-[0_0_14px_rgba(255,59,59,0.55)]">Darkness</span>
        </h1>
        <p className="relative text-lg font-semibold tracking-[0.2em] text-zinc-200">#LETSGETSTARTED</p>
        <p className="relative mx-auto mt-4 max-w-2xl text-zinc-300">
          Built for pressure. Trained for championships. We craft elite esports athletes across battle royale and tactical arenas.
        </p>

        <div className="relative mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/auth"
            className="rounded-xl border border-[#FF3B3B]/50 bg-[#D61F1F] px-6 py-3 font-semibold text-white shadow-[0_0_18px_rgba(255,59,59,0.35)] transition hover:bg-[#b81a1a]"
          >
            Join Now
          </Link>
          <Link
            to="/tournaments"
            className="rounded-xl border border-white/20 bg-white/5 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
          >
            View Tournaments
          </Link>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {stats.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.label} className="rounded-2xl border border-white/10 bg-[#1a1a1a] p-5">
              <Icon className="mb-3 text-2xl text-[#FF3B3B]" />
              <p className="text-3xl font-black text-white">{item.value}</p>
              <p className="text-sm text-zinc-400">{item.label}</p>
            </div>
          );
        })}
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-[#1b1b1b] p-6">
          <h2 className="mb-3 text-2xl font-bold text-white">About The Organization</h2>
          <p className="text-zinc-300">
            Gods of Darkness is a performance-first esports organization focused on discipline, strategy, and team chemistry.
            Our rosters are built to compete at the highest level while growing a powerful gaming community.
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#1b1b1b] p-6">
          <h2 className="mb-3 text-2xl font-bold text-white">Featured Games</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {games.map((game) => (
              <div key={game.name} className={`rounded-xl border border-white/10 bg-gradient-to-br p-4 ${game.accent}`}>
                <p className="text-lg font-bold text-white">{game.name}</p>
                <p className="text-sm text-zinc-300">{game.mode}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-white/10 bg-[#1a1a1a] p-6">
        <h2 className="mb-2 text-2xl font-bold text-white">Upcoming Tournaments</h2>
        <p className="text-zinc-300">Registrations are live. Secure your spot, climb the leaderboard, and represent the darkness.</p>
      </section>

      <section className="rounded-2xl border border-white/10 bg-[#141414] p-5">
        <h3 className="mb-3 text-lg font-semibold text-white">Follow the Grind</h3>
        <div className="flex items-center gap-4">
          <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-2xl text-pink-400 transition hover:scale-110"><FaInstagram /></a>
          <a href="https://youtube.com" target="_blank" rel="noreferrer" className="text-2xl text-red-500 transition hover:scale-110"><FaYoutube /></a>
          <a href="https://discord.com" target="_blank" rel="noreferrer" className="text-2xl text-indigo-400 transition hover:scale-110"><FaDiscord /></a>
        </div>
      </section>
    </div>
  );
}