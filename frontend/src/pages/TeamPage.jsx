const members = [
  { name: 'DarkFury', role: 'IGL', stats: 'K/D 3.4', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80' },
  { name: 'NightScope', role: 'Sniper', stats: 'Headshots 67%', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80' },
  { name: 'GhostAid', role: 'Support', stats: 'Clutch 81%', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80' }
];

export default function TeamPage() {
  return (
    <div>
      <h2 className="mb-6 text-3xl font-bold">Core Team</h2>
      <div className="grid gap-4 md:grid-cols-3">
        {members.map((m) => (
          <div key={m.name} className="rounded-xl border border-white/10 bg-white/5 p-4 text-center">
            <img src={m.image} alt={m.name} className="mx-auto mb-3 h-44 w-full rounded-lg object-cover" />
            <h3 className="text-xl font-semibold">{m.name}</h3>
            <p className="text-neonBlue">{m.role}</p>
            <p className="text-sm text-gray-300">{m.stats}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
