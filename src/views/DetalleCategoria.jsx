import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { showCategoria } from '../services/categoria_service';

function DetalleCategoria() {
  const { id } = useParams();
  const [detalle, setDetalle] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const cargarDetalle = async () => {
      const data = await showCategoria(id);
      setDetalle(data);
    };
    cargarDetalle();
  }, [id]);

  if (!detalle) return <p>Cargando...</p>;

  return (
    <div className="container mt-3">
      <h2>Detalle de la Categoría</h2>
      <div className="mt-3 p-3 border">
        <p><strong>ID:</strong> {detalle.id}</p>
        <p><strong>Nombre:</strong> {detalle.nombre}</p>
      </div>
      <button className="btn btn-secondary" onClick={() => navigate('/Categorias')}>Volver a la lista de categorías</button>
    </div>
  );
}

export default DetalleCategoria;