import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../../services/api.js';

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { data } = await api.post('/auth/login', form);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="gradient-bg min-h-screen flex items-center justify-center p-4">
      <div className="glass rounded-[2rem] shadow-2xl w-full max-w-md p-8">
        <div className="text-center mb-8">
          <div className="mx-auto w-20 h-20 rounded-3xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-4xl">🚲</div>
          <h2 className="text-3xl font-black text-white mt-5">BiciControl</h2>
          <p className="text-slate-400 text-sm mt-1">Sistema moderno de gestión de flota</p>
        </div>

        {error && <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 text-red-300 text-sm rounded-2xl">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input label="Correo electrónico" type="email" name="email" value={form.email} onChange={handleChange} placeholder="admin@bicitaxi.com" />
          <Input label="Contraseña" type="password" name="password" value={form.password} onChange={handleChange} placeholder="••••••••" />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white py-3 rounded-2xl font-bold hover:bg-blue-600 disabled:opacity-50 transition mt-2"
          >
            {loading ? 'Ingresando...' : 'Ingresar'}
          </button>
        </form>

        <p className="text-center text-sm text-slate-400 mt-6">
          ¿No tienes cuenta? <Link to="/register" className="text-blue-300 font-semibold hover:underline">Registrarse</Link>
        </p>
      </div>
    </div>
  );
}

function Input(props) {
  return (
    <div>
      <label className="block text-sm font-semibold text-slate-300 mb-2">{props.label}</label>
      <input
        {...props}
        required
        className="w-full bg-slate-950/60 border border-slate-700 rounded-2xl px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}
