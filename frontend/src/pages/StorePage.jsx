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
      <h2 className="text-3xl font-bold">Merchandise Store</h2>
      <div className="grid gap-4 md:grid-cols-3">
        {products.map((p) => (
          <div key={p._id} className="rounded-xl border border-white/10 bg-white/5 p-4">
            <img src={p.image} alt={p.name} className="h-40 w-full rounded object-cover" />
            <h3 className="mt-2 text-lg font-semibold">{p.name}</h3>
            <p className="text-sm text-gray-300">{p.description}</p>
            <p className="mt-1 font-bold">${p.price}</p>
            <button onClick={() => add(p)} className="mt-2 rounded bg-neonPurple px-3 py-2">Add to Cart</button>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-white/10 bg-white/5 p-4">
        <h3 className="text-xl font-semibold">Cart ({cart.length})</h3>
        <ul className="mb-3 text-sm text-gray-300">
          {cart.map((item, i) => <li key={`${item._id}-${i}`}>{item.name} - ${item.price}</li>)}
        </ul>
        <form onSubmit={submitCheckout} className="grid gap-2 md:grid-cols-3">
          <input className="rounded bg-white/10 p-2" placeholder="Name" value={checkout.name} onChange={(e) => setCheckout({ ...checkout, name: e.target.value })} />
          <input className="rounded bg-white/10 p-2" placeholder="Address" value={checkout.address} onChange={(e) => setCheckout({ ...checkout, address: e.target.value })} />
          <input className="rounded bg-white/10 p-2" placeholder="Phone" value={checkout.phone} onChange={(e) => setCheckout({ ...checkout, phone: e.target.value })} />
          <button className="rounded bg-neonBlue p-2 text-black md:col-span-3">Checkout</button>
        </form>
        {msg && <p className="mt-2">{msg}</p>}
      </div>
    </div>
  );
}
