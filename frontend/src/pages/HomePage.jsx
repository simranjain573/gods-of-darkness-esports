import { FaDiscord, FaInstagram, FaYoutube } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const games = ['BGMI', 'Valorant', 'Free Fire', 'CS2'];

export default function HomePage() {
  return (
    <div className="space-y-10">
      <section className="glow rounded-2xl border border-neonPurple/30 bg-black/40 p-8 text-center">
        <h1 className="mb-3 text-4xl font-extrabold md:text-6xl">Gods of Darkness</h1>
        <p className="text-xl text-neonBlue">#LETSGETSTARTED</p>
        <p className="mx-auto mt-4 max-w-2xl text-gray-300">
          Elite esports organization forging champions across battle royale and tactical shooters.
        </p>
        <Link to="/auth" className="mt-6 inline-block rounded-xl bg-neonPurple px-6 py-3 font-semibold">
          Join Now
        </Link>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        <div className="rounded-xl border border-white/10 bg-white/5 p-6">
          <h2 className="mb-2 text-2xl font-bold">About</h2>
          <p className="text-gray-300">
            Gods of Darkness develops disciplined players, strategic leaders, and a thriving community.
          </p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 p-6">
          <h2 className="mb-2 text-2xl font-bold">Featured Games</h2>
          <div className="flex flex-wrap gap-2">
            {games.map((g) => (
              <span key={g} className="rounded-full bg-neonBlue/20 px-3 py-1 text-sm">
                {g}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="rounded-xl border border-white/10 bg-white/5 p-6">
        <h2 className="mb-2 text-2xl font-bold">Upcoming Tournaments</h2>
        <p className="text-gray-300">Check live tournaments, register fast, and dominate the leaderboard.</p>
      </section>

      <section className="flex items-center gap-4">
        <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-2xl text-pink-400"><FaInstagram /></a>
        <a href="https://youtube.com" target="_blank" rel="noreferrer" className="text-2xl text-red-500"><FaYoutube /></a>
        <a href="https://discord.com" target="_blank" rel="noreferrer" className="text-2xl text-indigo-400"><FaDiscord /></a>
      </section>
    </div>
  );
}
