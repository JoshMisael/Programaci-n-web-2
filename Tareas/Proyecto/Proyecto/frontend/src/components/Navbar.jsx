import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <header className="h-20 border-b border-slate-800 bg-slate-950/50 backdrop-blur-xl flex items-center justify-between px-6 md:px-8">
      <div>
        <p className="text-sm text-slate-400">Panel administrativo</p>
        <h1 className="text-lg font-bold text-white">Dashboard Bicitaxis</h1>
      </div>

      <div className="flex items-center gap-3">
        <Link
          to="/vehicles"
          className="hidden sm:inline-flex bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-2xl font-semibold transition"
        >
          Nuevo Registro
        </Link>

        <div className="glass rounded-2xl px-4 py-2 text-right">
          <p className="text-sm font-semibold text-white">{user.name || 'Usuario'}</p>
          <p className="text-xs text-blue-300">{user.role || 'admin'}</p>
        </div>

        <button
          onClick={handleLogout}
          className="md:hidden bg-red-500/10 text-red-300 border border-red-500/20 px-3 py-2 rounded-xl text-sm"
        >
          Salir
        </button>
      </div>
    </header>
  );
}
