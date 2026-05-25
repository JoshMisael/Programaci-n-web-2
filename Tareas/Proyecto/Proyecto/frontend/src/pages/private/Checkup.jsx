import { useEffect, useState } from 'react';
import api from '../../services/api.js';
import CheckupForm from '../../components/CheckupForm.jsx';

export default function Checkup() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    api.get('/vehicles').then(({ data }) => setVehicles(data)).finally(() => setLoading(false));
  }, []);

  const handleSuccess = () => {
    setSuccessMsg('Revisión registrada correctamente');
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  if (loading) return <div className="glass rounded-3xl p-8 text-slate-300">Cargando...</div>;

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h2 className="text-4xl font-black">Nueva Revisión</h2>
        <p className="text-slate-400 mt-2">Registra la inspección técnica de un bicitaxi.</p>
      </div>

      {successMsg && (
        <div className="p-4 bg-green-500/10 border border-green-500/20 text-green-300 text-sm rounded-2xl">
          ✅ {successMsg}
        </div>
      )}

      <CheckupForm vehicles={vehicles} onSuccess={handleSuccess} />
    </div>
  );
}
