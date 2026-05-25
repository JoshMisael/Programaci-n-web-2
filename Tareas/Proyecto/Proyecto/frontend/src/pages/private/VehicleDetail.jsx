import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api.js';

const STATUS_LABELS = { active: 'Activo', inactive: 'Inactivo', maintenance: 'Mantenimiento' };
const STATUS_COLORS = {
  active: 'bg-green-500/15 text-green-300 border-green-500/30',
  inactive: 'bg-red-500/15 text-red-300 border-red-500/30',
  maintenance: 'bg-yellow-500/15 text-yellow-300 border-yellow-500/30',
};
const OVERALL_LABELS = { approved: 'Aprobado', conditional: 'Condicional', rejected: 'Rechazado' };
const OVERALL_COLORS = { approved: 'text-green-300', conditional: 'text-yellow-300', rejected: 'text-red-300' };

export default function VehicleDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [vehicle, setVehicle] = useState(null);
  const [checkups, setCheckups] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [vRes, cRes] = await Promise.all([
          api.get(`/vehicles/${id}`),
          api.get(`/checkups/vehicle/${id}`),
        ]);
        setVehicle(vRes.data);
        setCheckups(cRes.data);
      } catch {
        navigate('/vehicles');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id, navigate]);

  if (loading) return <div className="glass rounded-3xl p-8 text-slate-300">Cargando...</div>;
  if (!vehicle) return null;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <button onClick={() => navigate('/vehicles')} className="text-blue-300 hover:text-blue-200 text-sm font-bold text-left">← Volver</button>
        <h2 className="text-4xl font-black">Detalle: {vehicle.plate}</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="glass rounded-3xl p-6 space-y-3">
          <h3 className="font-bold text-xl mb-2">Información del Bicitaxi</h3>
          <InfoRow label="Placa" value={vehicle.plate} />
          <InfoRow label="Marca" value={vehicle.brand} />
          <InfoRow label="Modelo" value={vehicle.model} />
          <InfoRow label="Año" value={vehicle.year} />
          <InfoRow label="Color" value={vehicle.color} />
          <div className="flex justify-between items-center py-2 border-b border-slate-800">
            <span className="text-sm text-slate-400">Estado</span>
            <span className={`px-3 py-1 rounded-full text-xs font-bold border ${STATUS_COLORS[vehicle.status] || 'bg-slate-700 text-slate-300 border-slate-600'}`}>
              {STATUS_LABELS[vehicle.status] || vehicle.status}
            </span>
          </div>
        </div>

        <div className="glass rounded-3xl p-6 space-y-3">
          <h3 className="font-bold text-xl mb-2">Propietario</h3>
          <InfoRow label="Nombre" value={vehicle.owner_name} />
          <InfoRow label="Teléfono" value={vehicle.owner_phone} />
          <InfoRow label="Registrado" value={vehicle.created_at ? new Date(vehicle.created_at).toLocaleDateString('es-MX') : '—'} />
        </div>
      </div>

      <div className="glass rounded-3xl p-6">
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-bold text-xl">Historial de Revisiones</h3>
          <button onClick={() => navigate('/checkup')} className="bg-blue-500 text-white px-4 py-2 rounded-2xl hover:bg-blue-600 transition font-bold">
            + Nueva Revisión
          </button>
        </div>

        {checkups.length === 0 ? (
          <p className="text-slate-400 text-center py-4">Sin revisiones registradas</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-slate-400 text-left border-b border-slate-800">
                <tr>
                  {['Fecha', 'Frenos', 'Luces', 'Llantas', 'Estructura', 'Estado', 'Inspector', 'Notas'].map((h) => (
                    <th key={h} className="pb-3 font-semibold pr-4">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {checkups.map((c) => (
                  <tr key={c.id} className="border-b border-slate-800 last:border-0">
                    <td className="py-3 pr-4 text-slate-300">{new Date(c.check_date).toLocaleDateString('es-MX')}</td>
                    <td className="py-3 pr-4">{c.brakes}</td>
                    <td className="py-3 pr-4">{c.lights}</td>
                    <td className="py-3 pr-4">{c.tires}</td>
                    <td className="py-3 pr-4">{c.frame}</td>
                    <td className={`py-3 pr-4 font-bold ${OVERALL_COLORS[c.overall_status] || ''}`}>
                      {OVERALL_LABELS[c.overall_status] || c.overall_status}
                    </td>
                    <td className="py-3 pr-4 text-slate-300">{c.inspector_name || '—'}</td>
                    <td className="py-3 text-slate-400 max-w-xs truncate">{c.notes || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

function InfoRow({ label, value }) {
  return (
    <div className="flex justify-between items-center py-2 border-b border-slate-800">
      <span className="text-sm text-slate-400">{label}</span>
      <span className="text-sm font-bold text-white">{value || '—'}</span>
    </div>
  );
}
