import { NavLink, useNavigate } from 'react-router-dom';

const links = [
  { to: '/dashboard', label: 'Dashboard', icon: '📊' },
  { to: '/vehicles', label: 'Bicitaxis', icon: '🚲' },
  { to: '/checkup', label: 'Revisiones', icon: '🔧' },
];

export default function Sidebar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <aside className="hidden md:flex w-72 bg-slate-950/95 border-r border-slate-800 p-6 flex-col">
      <div className="mb-10">
        <h1 className="text-3xl font-black tracking-tight text-blue-400">BiciControl</h1>
        <p className="text-xs text-slate-500 mt-1">Fleet Management System</p>
      </div>

      <nav className="space-y-4">
        {links.map(({ to, label, icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 p-4 rounded-2xl border transition ${
                isActive
                  ? 'bg-blue-500/20 border-blue-400/40 text-white shadow-lg shadow-blue-500/10'
                  : 'bg-white/[0.03] border-white/10 text-slate-300 hover:bg-slate-800 hover:text-white'
              }`
            }
          >
            <span className="text-xl">{icon}</span>
            <span className="font-semibold">{label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto space-y-3">
        <div className="glass p-4 rounded-2xl">
          <p className="text-sm text-slate-300">Sistema empresarial</p>
          <p className="font-semibold mt-2">Monitoreo en tiempo real</p>
        </div>

        <button
          onClick={logout}
          className="w-full p-3 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-300 hover:bg-red-500/20 transition font-semibold"
        >
          Cerrar sesión
        </button>
      </div>
    </aside>
  );
}
