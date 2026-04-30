// frontend/src/pages/AdminPage.jsx
import { useEffect, useState } from 'react';
import api from '../api';

const initialTournament = { gameName: 'BGMI', date: '', entryFee: 0, maxPlayers: 100, description: '' };
const initialProduct = { name: '', description: '', price: 0, image: '', category: 'Jersey' };

export default function AdminPage() {
  const [tokenSet, setTokenSet] = useState(!!localStorage.getItem('godToken'));
  const [login, setLogin] = useState({ username: '', password: '', adminSecret: '' });
  const [stats, setStats] = useState(null);
  const [tournament, setTournament] = useState(initialTournament);
  const [product, setProduct] = useState(initialProduct);
  const [regs, setRegs] = useState([]);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    if (!tokenSet) return;
    api.get('/admin/stats').then((res) => setStats(res.data)).catch(() => setMsg('Admin auth required'));
    api.get('/tournaments/registrations/all').then((res) => setRegs(res.data)).catch(() => {});
  }, [tokenSet]);

  const adminLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post('/auth/admin-login', login);
      localStorage.setItem('godToken', data.token);
      setTokenSet(true);
      setMsg('Admin logged in');
    } catch {
      setMsg('Admin login failed');
    }
  };

  const createTournament = async (e) => {
    e.preventDefault();
    try {
      await api.post('/tournaments', tournament);
      setMsg('Tournament created');
      setTournament(initialTournament);
    } catch {
      setMsg('Failed to create tournament');
    }
  };

  const createProduct = async (e) => {
    e.preventDefault();
    try {
      await api.post('/products', product);
      setMsg('Product created');
      setProduct(initialProduct);
    } catch {
      setMsg('Failed to create product');
    }
  };

  if (!tokenSet) {
    return (
      <form onSubmit={adminLogin} className="mx-auto grid max-w-lg gap-2 rounded-xl border border-white/10 bg-[#171717] p-5">
        <h2 className="text-2xl font-black uppercase tracking-[0.08em] text-white">Admin Login</h2>
        <input className="rounded border border-white/10 bg-[#101010] p-2 text-white" placeholder="Username" onChange={(e) => setLogin({ ...login, username: e.target.value })} />
        <input className="rounded border border-white/10 bg-[#101010] p-2 text-white" placeholder="Password" type="password" onChange={(e) => setLogin({ ...login, password: e.target.value })} />
        <input className="rounded border border-white/10 bg-[#101010] p-2 text-white" placeholder="Admin Secret" onChange={(e) => setLogin({ ...login, adminSecret: e.target.value })} />
        <button className="rounded-lg border border-[#FF3B3B]/45 bg-[#D61F1F] p-2 text-white hover:bg-[#b81a1a]">Login</button>
        {msg && <p className="text-zinc-300">{msg}</p>}
      </form>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-black uppercase tracking-[0.08em] text-white">Admin Panel</h2>
      {stats && <p className="text-zinc-300">Users: {stats.users} | Tournaments: {stats.tournaments} | Products: {stats.products}</p>}

      <form onSubmit={createTournament} className="grid gap-2 rounded-xl border border-white/10 bg-[#171717] p-4 md:grid-cols-2">
        <h3 className="text-xl font-semibold text-white md:col-span-2">Create Tournament</h3>
        <input className="rounded border border-white/10 bg-[#101010] p-2 text-white" placeholder="Game Name" value={tournament.gameName} onChange={(e) => setTournament({ ...tournament, gameName: e.target.value })} />
        <input className="rounded border border-white/10 bg-[#101010] p-2 text-white" type="date" value={tournament.date} onChange={(e) => setTournament({ ...tournament, date: e.target.value })} />
        <input className="rounded border border-white/10 bg-[#101010] p-2 text-white" type="number" placeholder="Entry Fee" value={tournament.entryFee} onChange={(e) => setTournament({ ...tournament, entryFee: Number(e.target.value) })} />
        <input className="rounded border border-white/10 bg-[#101010] p-2 text-white" type="number" placeholder="Max Players" value={tournament.maxPlayers} onChange={(e) => setTournament({ ...tournament, maxPlayers: Number(e.target.value) })} />
        <input className="rounded border border-white/10 bg-[#101010] p-2 text-white md:col-span-2" placeholder="Description" value={tournament.description} onChange={(e) => setTournament({ ...tournament, description: e.target.value })} />
        <button className="rounded-lg border border-[#FF3B3B]/45 bg-[#D61F1F] p-2 text-white md:col-span-2 hover:bg-[#b81a1a]">Save Tournament</button>
      </form>

      <form onSubmit={createProduct} className="grid gap-2 rounded-xl border border-white/10 bg-[#171717] p-4 md:grid-cols-2">
        <h3 className="text-xl font-semibold text-white md:col-span-2">Create Product</h3>
        <input className="rounded border border-white/10 bg-[#101010] p-2 text-white" placeholder="Name" value={product.name} onChange={(e) => setProduct({ ...product, name: e.target.value })} />
        <input className="rounded border border-white/10 bg-[#101010] p-2 text-white" type="number" placeholder="Price" value={product.price} onChange={(e) => setProduct({ ...product, price: Number(e.target.value) })} />
        <input className="rounded border border-white/10 bg-[#101010] p-2 text-white md:col-span-2" placeholder="Image URL" value={product.image} onChange={(e) => setProduct({ ...product, image: e.target.value })} />
        <input className="rounded border border-white/10 bg-[#101010] p-2 text-white md:col-span-2" placeholder="Description" value={product.description} onChange={(e) => setProduct({ ...product, description: e.target.value })} />
        <select className="rounded border border-white/10 bg-[#101010] p-2 text-white" value={product.category} onChange={(e) => setProduct({ ...product, category: e.target.value })}>
          <option>Jersey</option><option>Hoodie</option><option>Accessory</option>
        </select>
        <button className="rounded-lg border border-[#FF3B3B]/45 bg-[#D61F1F] p-2 text-white md:col-span-2 hover:bg-[#b81a1a]">Save Product</button>
      </form>

      <div className="rounded-xl border border-white/10 bg-[#171717] p-4">
        <h3 className="mb-2 text-xl font-semibold text-white">Tournament Registrations</h3>
        {regs.map((r) => (
          <p key={r._id} className="text-zinc-300">{r.user?.fullName} ({r.user?.ign}) → {r.tournament?.gameName}</p>
        ))}
      </div>
      {msg && <p className="text-zinc-300">{msg}</p>}
    </div>
  );
}