import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api.js';

const STATUS_OPTIONS = ['active', 'inactive', 'maintenance'];
const STATUS_LABELS = { active: 'Activo', inactive: 'Inactivo', maintenance: 'Mantenimiento' };
const STATUS_COLORS = {
  active: 'bg-green-500/15 text-green-300 border-green-500/30',
  inactive: 'bg-red-500/15 text-red-300 border-red-500/30',
  maintenance: 'bg-yellow-500/15 text-yellow-300 border-yellow-500/30',
};

const EMPTY = { plate: '', model: '', brand: '', year: '', color: '', status: 'active', owner_name: '', owner_phone: '' };

export default function Vehicles() {
  const navigate = useNavigate();
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(EMPTY);
  const [editId, setEditId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const load = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/vehicles');
      setVehicles(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const openCreate = () => { setEditId(null); setForm(EMPTY); setError(''); setShowModal(true); };
  const openEdit = (v) => { setEditId(v.id); setForm({ ...v, year: v.year || '' }); setError(''); setShowModal(true); };
  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSaving(true);
    try {
      if (editId) await api.put(`/vehicles/${editId}`, form);
      else await api.post('/vehicles', form);
      setShowModal(false);
      load();
    } catch (err) {
      setError(err.response?.data?.message || 'Error al guardar');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Eliminar este bicitaxi?')) return;
    try {
      await api.delete(`/vehicles/${id}`);
      load();
    } catch {
      alert('Error al eliminar');
    }
  };

  if (loading) return <div className="glass rounded-3xl p-8 text-slate-300">Cargando bicitaxis...</div>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h2 className="text-4xl font-black">Bicitaxis</h2>
          <p className="text-slate-400 mt-2">Altas, cambios, consultas y bajas de unidades</p>
        </div>
        <button onClick={openCreate} className="bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-2xl font-bold transition">
          + Agregar Bicitaxi
        </button>
      </div>

      <div className="glass rounded-3xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-950/70 text-slate-400 text-left">
              <tr>
                {['Placa', 'Marca/Modelo', 'Año', 'Color', 'Estado', 'Propietario', 'Teléfono', 'Acciones'].map((h) => (
                  <th key={h} className="px-5 py-4 font-semibold">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {vehicles.length === 0 && (
                <tr><td colSpan={8} className="px-5 py-10 text-center text-slate-400">No hay bicitaxis registrados</td></tr>
              )}
              {vehicles.map((v) => (
                <tr key={v.id} className="border-t border-slate-800 hover:bg-slate-800/40 transition">
                  <td className="px-5 py-4 font-black text-blue-300">{v.plate}</td>
                  <td className="px-5 py-4 text-slate-200">{v.brand} {v.model}</td>
                  <td className="px-5 py-4 text-slate-400">{v.year}</td>
                  <td className="px-5 py-4 text-slate-400">{v.color}</td>
                  <td className="px-5 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${STATUS_COLORS[v.status] || 'bg-slate-700 text-slate-300 border-slate-600'}`}>
                      {STATUS_LABELS[v.status] || v.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-slate-300">{v.owner_name}</td>
                  <td className="px-5 py-4 text-slate-400">{v.owner_phone}</td>
                  <td className="px-5 py-4">
                    <div className="flex gap-2">
                      <button onClick={() => navigate(`/vehicles/${v.id}`)} className="px-3 py-1.5 rounded-xl bg-blue-500/10 text-blue-300 hover:bg-blue-500/20">Ver</button>
                      <button onClick={() => openEdit(v)} className="px-3 py-1.5 rounded-xl bg-yellow-500/10 text-yellow-300 hover:bg-yellow-500/20">Editar</button>
                      <button onClick={() => handleDelete(v.id)} className="px-3 py-1.5 rounded-xl bg-red-500/10 text-red-300 hover:bg-red-500/20">Eliminar</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="glass rounded-3xl shadow-2xl w-full max-w-2xl p-6 space-y-4">
            <h3 className="text-2xl font-black">{editId ? 'Editar Bicitaxi' : 'Nuevo Bicitaxi'}</h3>
            {error && <p className="text-sm text-red-300 bg-red-500/10 border border-red-500/20 p-3 rounded-2xl">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  { name: 'plate', label: 'Placa *', required: true },
                  { name: 'brand', label: 'Marca' },
                  { name: 'model', label: 'Modelo' },
                  { name: 'year', label: 'Año', type: 'number' },
                  { name: 'color', label: 'Color' },
                  { name: 'owner_name', label: 'Propietario' },
                  { name: 'owner_phone', label: 'Teléfono' },
                ].map(({ name, label, required, type }) => (
                  <div key={name}>
                    <label className="block text-xs font-semibold text-slate-300 mb-2">{label}</label>
                    <input
                      type={type || 'text'}
                      name={name}
                      value={form[name]}
                      onChange={handleChange}
                      required={required}
                      className="w-full bg-slate-950/60 border border-slate-700 rounded-2xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                ))}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-2">Estado</label>
                  <select name="status" value={form.status} onChange={handleChange} className="w-full bg-slate-950/60 border border-slate-700 rounded-2xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                    {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{STATUS_LABELS[s]}</option>)}
                  </select>
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 border border-slate-700 text-slate-300 py-3 rounded-2xl font-bold hover:bg-slate-800">Cancelar</button>
                <button type="submit" disabled={saving} className="flex-1 bg-blue-500 text-white py-3 rounded-2xl font-bold hover:bg-blue-600 disabled:opacity-50">
                  {saving ? 'Guardando...' : (editId ? 'Actualizar' : 'Crear')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
