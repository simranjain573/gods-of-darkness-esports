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
      <h2 className="mb-4 text-3xl font-bold">Upcoming Tournaments</h2>
      <div className="grid gap-4 md:grid-cols-2">
        {list.map((t) => (
          <div key={t._id} className="rounded-xl border border-white/10 bg-white/5 p-4">
            <h3 className="text-xl font-semibold">{t.gameName}</h3>
            <p>{new Date(t.date).toLocaleDateString()}</p>
            <p>Entry: ${t.entryFee} | Max Players: {t.maxPlayers}</p>
            <button onClick={() => join(t._id)} className="mt-3 rounded bg-neonBlue px-3 py-2 text-black">Join Tournament</button>
          </div>
        ))}
      </div>
      {msg && <p className="mt-4">{msg}</p>}
    </div>
  );
}
