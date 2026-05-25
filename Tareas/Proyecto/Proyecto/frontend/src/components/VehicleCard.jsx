import { useNavigate } from 'react-router-dom';

const statusColors = {
  active: 'bg-green-100 text-green-700',
  inactive: 'bg-gray-100 text-gray-600',
  maintenance: 'bg-yellow-100 text-yellow-700',
};

const statusLabels = {
  active: 'Activo',
  inactive: 'Inactivo',
  maintenance: 'Mantenimiento',
};

export default function VehicleCard({ vehicle, onDelete }) {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 flex flex-col gap-2">
      <div className="flex items-start justify-between">
        <div>
          <p className="font-bold text-gray-800 text-lg">{vehicle.plate}</p>
          <p className="text-sm text-gray-500">{vehicle.brand} {vehicle.model} {vehicle.year}</p>
        </div>
        <span className={`text-xs font-semibold px-2 py-1 rounded-full ${statusColors[vehicle.status] || 'bg-gray-100 text-gray-600'}`}>
          {statusLabels[vehicle.status] || vehicle.status}
        </span>
      </div>
      <div className="text-sm text-gray-600 space-y-1">
        <p>🎨 Color: {vehicle.color}</p>
        <p>👤 {vehicle.owner_name}</p>
        <p>📞 {vehicle.owner_phone}</p>
      </div>
      <div className="flex gap-2 mt-2">
        <button
          onClick={() => navigate(`/vehicles/${vehicle.id}`)}
          className="flex-1 text-xs bg-blue-50 text-blue-600 hover:bg-blue-100 rounded px-3 py-1.5 font-medium transition-colors"
        >
          Ver
        </button>
        <button
          onClick={() => navigate(`/vehicles/${vehicle.id}?edit=1`)}
          className="flex-1 text-xs bg-yellow-50 text-yellow-600 hover:bg-yellow-100 rounded px-3 py-1.5 font-medium transition-colors"
        >
          Editar
        </button>
        <button
          onClick={() => onDelete(vehicle.id)}
          className="flex-1 text-xs bg-red-50 text-red-600 hover:bg-red-100 rounded px-3 py-1.5 font-medium transition-colors"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
}
