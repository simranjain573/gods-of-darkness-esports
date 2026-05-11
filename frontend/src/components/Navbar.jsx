// frontend/src/components/Navbar.jsx
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const navItems = [
  ['Home', '/'],
  ['Tournaments', '/tournaments'],
  ['Team', '/team'],
  ['Store', '/store'],
  ['Dashboard', '/dashboard'],
  ['Admin', '/admin']
];

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="sticky top-0 z-20 border-b border-white/10 bg-[#0f0f10]/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link to="/" className="text-xl font-black uppercase tracking-[0.08em]">
          <span className="text-[#D61F1F]">Gods of </span>
          <span className="text-white drop-shadow-[0_0_8px_rgba(255,59,59,0.45)]">Darkness</span>
        </Link>
        <div className="flex flex-wrap items-center gap-2 text-sm text-zinc-200 md:gap-3">
          {navItems.map(([label, path]) => (
            <Link
              key={path}
              to={path}
              className="rounded-lg px-2 py-1 transition hover:bg-white/10 hover:text-white"
            >
              {label}
            </Link>
          ))}
          {user ? (
            <button
              onClick={logout}
              className="rounded-lg border border-red-500/40 bg-red-600/80 px-3 py-1 text-xs font-semibold text-white hover:bg-red-500"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/auth"
              className="rounded-lg border border-[#FF3B3B]/45 bg-[#D61F1F] px-3 py-1 text-xs font-semibold text-white hover:bg-[#b81a1a]"
            >
              Login/Signup
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}