import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { showEtiqueta } from '../services/etiqueta_service.jsx';

function DetalleEtiqueta() {
  const { id } = useParams();
  const [etiqueta, setEtiqueta] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const cargarDetalle = async () => {
      const response = await showEtiqueta(id);
      setEtiqueta(response.data);
    };
    cargarDetalle();
  }, [id]);

  if (!etiqueta) return <p>Cargando...</p>;

  return (
    <div className="container mt-3">
      <h2>Detalle de la Etiqueta</h2>
      <div className="mt-3 p-3 border">
        <p><strong>ID:</strong> {etiqueta.id}</p>
        <p><strong>Nombre:</strong> {etiqueta?.nombre}</p>
      </div>
      <button className="btn btn-secondary" onClick={() => navigate('/Etiquetas')}>Volver a la lista de Etiquetas</button>
    </div>
  );
}

export default DetalleEtiqueta;
