import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api.js';

const statusText = {
  active: 'Activos',
  maintenance: 'Mantenimiento',
  inactive: 'Inactivos',
};

export default function Dashboard() {
  const navigate = useNavigate();
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/vehicles')
      .then(({ data }) => setVehicles(data))
      .finally(() => setLoading(false));
  }, []);

  const stats = useMemo(() => {
    const total = vehicles.length;
    const active = vehicles.filter(v => v.status === 'active').length;
    const maintenance = vehicles.filter(v => v.status === 'maintenance').length;
    const inactive = vehicles.filter(v => v.status === 'inactive').length;

    return [
      { title: 'Bicitaxis Totales', value: total, color: 'from-blue-500 to-cyan-400' },
      { title: 'Activos', value: active, color: 'from-green-500 to-emerald-400' },
      { title: 'En Reparación', value: maintenance, color: 'from-yellow-500 to-orange-400' },
      { title: 'Inactivos', value: inactive, color: 'from-red-500 to-pink-400' },
    ];
  }, [vehicles]);

  const percent = (count) => vehicles.length ? Math.round((count / vehicles.length) * 100) : 0;
  const active = vehicles.filter(v => v.status === 'active').length;
  const maintenance = vehicles.filter(v => v.status === 'maintenance').length;
  const inactive = vehicles.filter(v => v.status === 'inactive').length;

  if (loading) {
    return <div className="glass rounded-3xl p-8 text-slate-300">Cargando información...</div>;
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col lg:flex-row justify-between gap-4 lg:items-center">
        <div>
          <h2 className="text-4xl font-black tracking-tight">Dashboard Principal</h2>
          <p className="text-slate-400 mt-2">Plataforma de administración de bicitaxis</p>
        </div>

        <button
          onClick={() => navigate('/vehicles')}
          className="bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-2xl font-semibold transition"
        >
          Administrar Bicitaxis
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <button
            key={stat.title}
            onClick={() => navigate('/vehicles')}
            className="glass rounded-3xl p-6 card-hover text-left"
          >
            <div className={`h-2 w-full rounded-full bg-gradient-to-r ${stat.color} mb-5`} />
            <h3 className="text-slate-400 text-sm">{stat.title}</h3>
            <p className="text-5xl font-black mt-4">{stat.value}</p>
            <p className="text-blue-300 mt-4 text-sm">Clic para ver registros</p>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 glass rounded-3xl p-6">
          <h3 className="text-2xl font-bold mb-6">Últimos bicitaxis registrados</h3>

          <div className="space-y-4">
            {vehicles.slice(0, 5).map((v) => (
              <button
                key={v.id}
                onClick={() => navigate(`/vehicles/${v.id}`)}
                className="w-full bg-slate-900/80 border border-slate-800 p-4 rounded-2xl text-left hover:bg-slate-800 transition flex justify-between gap-4"
              >
                <div>
                  <p className="font-bold">{v.plate}</p>
                  <p className="text-sm text-slate-400">{v.brand} {v.model} · {v.owner_name}</p>
                </div>
                <span className="text-sm text-blue-300">{statusText[v.status] || v.status}</span>
              </button>
            ))}

            {vehicles.length === 0 && (
              <p className="text-slate-400 bg-slate-900/70 border border-slate-800 p-4 rounded-2xl">
                Todavía no hay bicitaxis registrados.
              </p>
            )}
          </div>
        </div>

        <div className="glass rounded-3xl p-6">
          <h3 className="text-2xl font-bold mb-6">Estado General</h3>

          <Progress label="Activos" value={percent(active)} color="bg-green-500" />
          <Progress label="Mantenimiento" value={percent(maintenance)} color="bg-yellow-500" />
          <Progress label="Inactivos" value={percent(inactive)} color="bg-red-500" />
        </div>
      </div>
    </div>
  );
}

function Progress({ label, value, color }) {
  return (
    <div className="mb-6">
      <div className="flex justify-between mb-2">
        <span>{label}</span>
        <span>{value}%</span>
      </div>
      <div className="bg-slate-800 rounded-full h-4 overflow-hidden">
        <div className={`${color} h-4 rounded-full`} style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}
