import { useState } from 'react';
import api from '../services/api.js';

const options = ['good', 'regular', 'bad'];
const optionLabels = { good: 'Bueno', regular: 'Regular', bad: 'Malo' };
const fields = [
  { name: 'brakes', label: 'Frenos' },
  { name: 'lights', label: 'Luces' },
  { name: 'tires', label: 'Llantas' },
  { name: 'frame', label: 'Estructura' },
];

export default function CheckupForm({ vehicles, onSuccess }) {
  const [form, setForm] = useState({
    vehicle_id: '',
    brakes: 'good',
    lights: 'good',
    tires: 'good',
    frame: 'good',
    overall_status: 'approved',
    notes: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const inputClass = 'w-full bg-slate-950/60 border border-slate-700 rounded-2xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500';

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!form.vehicle_id) return setError('Selecciona un vehículo');
    setLoading(true);
    try {
      await api.post('/checkups', form);
      onSuccess?.();
      setForm({ vehicle_id: '', brakes: 'good', lights: 'good', tires: 'good', frame: 'good', overall_status: 'approved', notes: '' });
    } catch (err) {
      setError(err.response?.data?.message || 'Error al guardar revisión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="glass rounded-3xl p-6 space-y-5">
      {error && <p className="text-sm text-red-300 bg-red-500/10 border border-red-500/20 p-3 rounded-2xl">{error}</p>}

      <div>
        <label className="block text-sm font-semibold text-slate-300 mb-2">Vehículo *</label>
        <select name="vehicle_id" value={form.vehicle_id} onChange={handleChange} className={inputClass}>
          <option value="">Seleccionar vehículo...</option>
          {vehicles.map((v) => (
            <option key={v.id} value={v.id}>{v.plate} — {v.brand} {v.model}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {fields.map(({ name, label }) => (
          <div key={name}>
            <label className="block text-sm font-semibold text-slate-300 mb-2">{label}</label>
            <select name={name} value={form[name]} onChange={handleChange} className={inputClass}>
              {options.map((o) => <option key={o} value={o}>{optionLabels[o]}</option>)}
            </select>
          </div>
        ))}
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-300 mb-2">Estado General</label>
        <select name="overall_status" value={form.overall_status} onChange={handleChange} className={inputClass}>
          <option value="approved">Aprobado</option>
          <option value="conditional">Condicional</option>
          <option value="rejected">Rechazado</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-300 mb-2">Notas</label>
        <textarea name="notes" value={form.notes} onChange={handleChange} rows={3} placeholder="Observaciones adicionales..." className={inputClass} />
      </div>

      <button type="submit" disabled={loading} className="w-full bg-blue-500 text-white py-3 rounded-2xl font-bold hover:bg-blue-600 disabled:opacity-50 transition">
        {loading ? 'Guardando...' : 'Registrar Revisión'}
      </button>
    </form>
  );
}
