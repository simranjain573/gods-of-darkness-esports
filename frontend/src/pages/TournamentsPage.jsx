// frontend/src/pages/TournamentsPage.jsx
import { useEffect, useState } from 'react';
import api from '../api';
import Loader from '../components/Loader';

export default function TournamentsPage() {
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState([]);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    api.get('/tournaments').then((res) => setList(res.data)).catch(() => setMsg('Failed to load tournaments')).finally(() => setLoading(false));
  }, []);

  const join = async (id) => {
    try {
      await api.post(`/tournaments/${id}/register`);
      setMsg('Registered successfully!');
    } catch (error) {
      setMsg(error.response?.data?.message || 'Registration failed');
    }
  };

  if (loading) return <Loader />;

  return (
    <div>
      <h2 className="mb-4 text-3xl font-black uppercase tracking-[0.08em] text-white">Upcoming Tournaments</h2>
      <div className="grid gap-4 md:grid-cols-2">
        {list.map((t) => (
          <div key={t._id} className="rounded-xl border border-white/10 bg-[#1a1a1a] p-4 shadow-[0_10px_28px_rgba(0,0,0,0.3)]">
            <h3 className="text-xl font-semibold text-white">{t.gameName}</h3>
            <p className="text-zinc-300">{new Date(t.date).toLocaleDateString()}</p>
            <p className="text-zinc-300">Entry: Rs. {t.entryFee} | Max Players: {t.maxPlayers}</p>
            <button onClick={() => join(t._id)} className="mt-3 rounded-lg border border-[#FF3B3B]/45 bg-[#D61F1F] px-3 py-2 text-white hover:bg-[#b81a1a]">Join Tournament</button>
          </div>
        ))}
      </div>
      {msg && <p className="mt-4 text-zinc-200">{msg}</p>}
    </div>
  );
}