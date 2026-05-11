// frontend/src/pages/DashboardPage.jsx
import { useEffect, useState } from 'react';
import api from '../api';
import Loader from '../components/Loader';

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [draft, setDraft] = useState({ fullName: '', ign: '' });
  const [showEdit, setShowEdit] = useState(false);
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
        setDraft({ fullName: me.fullName, ign: me.ign });
        setRegistrations(regs);
      } catch (error) {
        setMsg(error.response?.data?.message || 'Please login first');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const openEdit = () => {
    setDraft({ fullName: user.fullName, ign: user.ign });
    setShowEdit(true);
  };

  const saveProfile = async () => {
    try {
      const { data } = await api.put('/users/me', {
        fullName: draft.fullName,
        ign: draft.ign
      });
      setUser(data);
      setShowEdit(false);
      setMsg('Profile updated');
    } catch {
      setMsg('Update failed');
    }
  };

  if (loading) return <Loader />;
  if (!user) return <p className="text-zinc-300">{msg}</p>;

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-white/10 bg-[#171717] p-5">
        <h2 className="text-2xl font-black uppercase tracking-[0.08em] text-white">Player Profile</h2>
        <div className="mt-3 grid gap-2 md:grid-cols-2">
          <div className="rounded bg-[#101010] p-2 text-zinc-200">Name: {user.fullName}</div>
          <div className="rounded bg-[#101010] p-2 text-zinc-200">IGN/Character: {user.ign}</div>
          <div className="rounded bg-[#101010] p-2 text-zinc-200">Game: {user.gameSelection}</div>
          <div className="rounded bg-[#101010] p-2 text-zinc-200">Game ID: {user.gameId}</div>
        </div>
        <button onClick={openEdit} className="mt-3 rounded-lg border border-[#FF3B3B]/45 bg-[#D61F1F] px-4 py-2 text-white hover:bg-[#b81a1a]">Edit Profile</button>
      </div>

      {showEdit && (
        <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/70 p-4">
          <div className="w-full max-w-md rounded-xl border border-white/10 bg-[#181818] p-5">
            <h3 className="mb-3 text-xl font-bold text-white">Edit Profile</h3>
            <div className="space-y-2">
              <input className="w-full rounded border border-white/10 bg-[#101010] p-2 text-white" value={draft.fullName} onChange={(e) => setDraft({ ...draft, fullName: e.target.value })} />
              <input className="w-full rounded border border-white/10 bg-[#101010] p-2 text-white" value={draft.ign} onChange={(e) => setDraft({ ...draft, ign: e.target.value })} />
            </div>
            <div className="mt-4 flex gap-2">
              <button onClick={saveProfile} className="rounded-lg border border-[#FF3B3B]/45 bg-[#D61F1F] px-3 py-2 text-white hover:bg-[#b81a1a]">Save</button>
              <button onClick={() => setShowEdit(false)} className="rounded-lg border border-white/10 bg-white/10 px-3 py-2 text-white">Cancel</button>
            </div>
          </div>
        </div>
      )}

      <div className="rounded-xl border border-white/10 bg-[#171717] p-5">
        <h3 className="mb-2 text-xl font-semibold text-white">Registered Tournaments</h3>
        {registrations.length === 0 ? (
          <p className="text-zinc-300">No tournaments joined yet.</p>
        ) : (
          <ul className="space-y-2">
            {registrations.map((r) => (
              <li key={r._id} className="rounded bg-[#101010] p-3 text-zinc-200">{r.tournament?.gameName} - {new Date(r.tournament?.date).toLocaleDateString()}</li>
            ))}
          </ul>
        )}
      </div>

      <div className="rounded-xl border border-white/10 bg-[#171717] p-5">
        <h3 className="text-xl font-semibold text-white">Stats (Placeholder)</h3>
        <p className="text-zinc-300">Wins: {user.stats?.wins} | Kills: {user.stats?.kills} | Matches: {user.stats?.matches}</p>
      </div>

      {msg && <p className="text-zinc-300">{msg}</p>}
    </div>
  );
}