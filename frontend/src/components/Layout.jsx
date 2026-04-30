// frontend/src/components/Layout.jsx
import Navbar from './Navbar';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#1a0f12_0%,#0a0a0a_45%,#050505_100%)] text-white">
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
    </div>
  );
}