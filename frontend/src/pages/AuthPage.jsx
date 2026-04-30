// frontend/src/pages/AuthPage.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import { useAuth } from '../context/AuthContext';

const initial = {
  fullName: '',
  age: '',
  email: '',
  username: '',
  password: '',
  gameSelection: 'BGMI',
  gameId: '',
  ign: ''
};

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState(initial);
  const [message, setMessage] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setMessage('Processing...');
    try {
      const payload = isLogin
        ? { identifier: form.email || form.username, password: form.password }
        : form;
      const endpoint = isLogin ? '/auth/login' : '/auth/signup';
      const { data } = await api.post(endpoint, payload);
      login(data);
      setMessage('Success!');
      navigate('/dashboard');
    } catch (error) {
      setMessage(error.response?.data?.message || 'Request failed');
    }
  };

  return (
    <div className="mx-auto max-w-2xl rounded-2xl border border-white/10 bg-[#161616] p-6 shadow-[0_16px_40px_rgba(0,0,0,0.35)]">
      <h2 className="mb-4 text-2xl font-black uppercase tracking-[0.08em] text-white">{isLogin ? 'Login' : 'Signup'}</h2>
      <form onSubmit={submit} className="grid gap-3 md:grid-cols-2">
        {!isLogin && (
          <>
            <input className="rounded-lg border border-white/10 bg-[#101010] p-2 text-white" placeholder="Full Name" value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} required />
            <input className="rounded-lg border border-white/10 bg-[#101010] p-2 text-white" placeholder="Age" type="number" value={form.age} onChange={(e) => setForm({ ...form, age: e.target.value })} required />
          </>
        )}
        <input className="rounded-lg border border-white/10 bg-[#101010] p-2 text-white" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input className="rounded-lg border border-white/10 bg-[#101010] p-2 text-white" placeholder="Username" value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} />
        <input className="rounded-lg border border-white/10 bg-[#101010] p-2 text-white md:col-span-2" placeholder="Password" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />

        {!isLogin && (
          <>
            <select className="rounded-lg border border-white/10 bg-[#101010] p-2 text-white" value={form.gameSelection} onChange={(e) => setForm({ ...form, gameSelection: e.target.value })}>
              <option>BGMI</option><option>Valorant</option><option>Free Fire</option><option>CS2</option>
            </select>
            <input className="rounded-lg border border-white/10 bg-[#101010] p-2 text-white" placeholder="Game ID" value={form.gameId} onChange={(e) => setForm({ ...form, gameId: e.target.value })} required />
            <input className="rounded-lg border border-white/10 bg-[#101010] p-2 text-white md:col-span-2" placeholder="In-game name (IGN) / Character name" value={form.ign} onChange={(e) => setForm({ ...form, ign: e.target.value })} required />
          </>
        )}

        <button className="rounded-lg border border-[#FF3B3B]/45 bg-[#D61F1F] p-2 font-bold text-white shadow-[0_0_14px_rgba(255,59,59,0.35)] md:col-span-2">{isLogin ? 'Login' : 'Create Account'}</button>
      </form>
      <button onClick={() => setIsLogin(!isLogin)} className="mt-3 text-sm text-red-300">
        {isLogin ? "Don't have an account? Signup" : 'Already registered? Login'}
      </button>
      {message && <p className="mt-3 text-sm text-zinc-300">{message}</p>}
    </div>
  );
}