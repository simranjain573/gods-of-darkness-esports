// frontend/src/pages/StorePage.jsx
import { useEffect, useState } from 'react';
import api from '../api';

export default function StorePage() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [checkout, setCheckout] = useState({ name: '', address: '', phone: '' });
  const [msg, setMsg] = useState('');

  useEffect(() => {
    api.get('/products').then((res) => setProducts(res.data)).catch(() => setMsg('Failed to load products'));
  }, []);

  const add = (product) => setCart((c) => [...c, product]);

  const submitCheckout = (e) => {
    e.preventDefault();
    if (!checkout.name || !checkout.address || !checkout.phone) {
      return setMsg('Please complete checkout form');
    }
    setMsg(`Order placed for ${cart.length} item(s). Payment gateway integration pending.`);
    setCart([]);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-black uppercase tracking-[0.08em] text-white">Merchandise Store</h2>
      <div className="grid gap-4 md:grid-cols-3">
        {products.map((p) => (
          <div key={p._id} className="rounded-xl border border-white/10 bg-[#171717] p-4">
            <img src={p.image} alt={p.name} className="h-40 w-full rounded object-cover" />
            <h3 className="mt-2 text-lg font-semibold text-white">{p.name}</h3>
            <p className="text-sm text-zinc-300">{p.description}</p>
            <p className="mt-1 font-bold text-red-300">${p.price}</p>
            <button onClick={() => add(p)} className="mt-2 rounded-lg border border-[#FF3B3B]/45 bg-[#D61F1F] px-3 py-2 text-white hover:bg-[#b81a1a]">Add to Cart</button>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-white/10 bg-[#171717] p-4">
        <h3 className="text-xl font-semibold text-white">Cart ({cart.length})</h3>
        <ul className="mb-3 text-sm text-zinc-300">
          {cart.map((item, i) => <li key={`${item._id}-${i}`}>{item.name} - ${item.price}</li>)}
        </ul>
        <form onSubmit={submitCheckout} className="grid gap-2 md:grid-cols-3">
          <input className="rounded-lg border border-white/10 bg-[#101010] p-2 text-white" placeholder="Name" value={checkout.name} onChange={(e) => setCheckout({ ...checkout, name: e.target.value })} />
          <input className="rounded-lg border border-white/10 bg-[#101010] p-2 text-white" placeholder="Address" value={checkout.address} onChange={(e) => setCheckout({ ...checkout, address: e.target.value })} />
          <input className="rounded-lg border border-white/10 bg-[#101010] p-2 text-white" placeholder="Phone" value={checkout.phone} onChange={(e) => setCheckout({ ...checkout, phone: e.target.value })} />
          <button className="rounded-lg border border-[#FF3B3B]/45 bg-[#D61F1F] p-2 text-white md:col-span-3 hover:bg-[#b81a1a]">Checkout</button>
        </form>
        {msg && <p className="mt-2 text-zinc-300">{msg}</p>}
      </div>
    </div>
  );
}