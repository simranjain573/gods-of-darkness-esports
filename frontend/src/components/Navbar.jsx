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
    <nav className="sticky top-0 z-20 border-b border-purple-800/40 bg-black/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link to="/" className="text-xl font-bold text-slate-900">
          GODS OF DARKNESS
        </Link>
        <div className="flex flex-wrap items-center gap-3 text-sm">
          {navItems.map(([label, path]) => (
            <Link key={path} to={path} className="transition hover:text-neonBlue">
              {label}
            </Link>
          ))}
          {user ? (
            <button onClick={logout} className="rounded bg-neonPurple px-3 py-1 text-xs font-semibold">
              Logout
            </button>
          ) : (
            <Link to="/auth" className="rounded bg-neonBlue px-3 py-1 text-xs font-semibold text-black">
              Login/Signup
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}