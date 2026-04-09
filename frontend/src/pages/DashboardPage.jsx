import { useEffect, useState } from 'react';
import api from '../api';
import Loader from '../components/Loader';

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [registrations, setRegistrations] = useState([]);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        const [{ data: me }, { data: regs }] = await Promise.all([
          api.get('/users/me'),
          api.get('/users/me/registrations')
        ]);
        setUser(me);
        setRegistrations(regs);
      } catch (error) {
        setMsg(error.response?.data?.message || 'Please login first');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const saveProfile = async () => {
    try {
      const { data } = await api.put('/users/me', {
        fullName: user.fullName,
        ign: user.ign,
        characterName: user.characterName
      });
      setUser(data);
      setMsg('Profile updated');
    } catch {
      setMsg('Update failed');
    }
  };

  if (loading) return <Loader />;
  if (!user) return <p>{msg}</p>;

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-white/10 bg-white/5 p-5">
        <h2 className="text-2xl font-bold">Player Profile</h2>
        <div className="mt-3 grid gap-2 md:grid-cols-2">
          <input className="rounded bg-white/10 p-2" value={user.fullName} onChange={(e) => setUser({ ...user, fullName: e.target.value })} />
          <input className="rounded bg-white/10 p-2" value={user.ign} onChange={(e) => setUser({ ...user, ign: e.target.value })} />
          <input className="rounded bg-white/10 p-2" value={user.characterName} onChange={(e) => setUser({ ...user, characterName: e.target.value })} />
          <div className="rounded bg-white/10 p-2">Game: {user.gameSelection}</div>
        </div>
        <button onClick={saveProfile} className="mt-3 rounded bg-neonPurple px-4 py-2">Edit Profile</button>
      </div>

      <div className="rounded-xl border border-white/10 bg-white/5 p-5">
        <h3 className="mb-2 text-xl font-semibold">Registered Tournaments</h3>
        {registrations.length === 0 ? (
          <p className="text-gray-300">No tournaments joined yet.</p>
        ) : (
          <ul className="space-y-2">
            {registrations.map((r) => (
              <li key={r._id} className="rounded bg-black/40 p-3">{r.tournament?.gameName} - {new Date(r.tournament?.date).toLocaleDateString()}</li>
            ))}
          </ul>
        )}
      </div>

      <div className="rounded-xl border border-white/10 bg-white/5 p-5">
        <h3 className="text-xl font-semibold">Stats (Placeholder)</h3>
        <p>Wins: {user.stats?.wins} | Kills: {user.stats?.kills} | Matches: {user.stats?.matches}</p>
      </div>

      {msg && <p className="text-neonBlue">{msg}</p>}
    </div>
  );
}
