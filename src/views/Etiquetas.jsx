import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { 
  getAllEtiquetas, 
  createEtiqueta, 
  showEtiqueta, 
  updateEtiqueta, 
  destroyEtiqueta 
} from "../services/etiqueta_service.jsx";

function Etiquetas() {
  const [etiquetas, setEtiquetas] = useState([]);
  const [nombre, setNombre] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [detalle, setDetalle] = useState(null);


  const cargarEtiquetas = async () => {
    const data = await getAllEtiquetas();
    setEtiquetas(data);
  };

  useEffect(() => {
    cargarEtiquetas();
  }, []);


  const guardarEtiqueta = async () => {
    if (!nombre.trim()) {
      alert("Por favor, ingresa un nombre");
      return;
    }

    if (editingId) {
      await updateEtiqueta(editingId, nombre);
      setEditingId(null);
    } else {
      await createEtiqueta(nombre);
    }

    setNombre("");
    cargarEtiquetas();
  };

  const editarEtiqueta = (et) => {
    setEditingId(et.id);
    setNombre(et.nombre);
    setDetalle(null);
  };

  const eliminarEtiqueta = async (id) => {
    if (window.confirm("¿Seguro de eliminar esta etiqueta?")) {
      await destroyEtiqueta(id);
      cargarEtiquetas();
      if (detalle?.id === id) setDetalle(null);
    }
  };

  return (
    <div className="container mt-3">
      <h2>Gestión de Etiquetas</h2>

      {}
      <div className="mb-3">
        <input 
          type="text" 
          className="form-control mb-2" 
          placeholder="Nombre de la etiqueta" 
          value={nombre} 
          onChange={(e) => setNombre(e.target.value)} 
        />
        <button className="btn btn-primary" onClick={guardarEtiqueta}>
          {editingId ? "Actualizar" : "Crear"}
        </button>
      </div>

      {}
      {etiquetas.length === 0 ? (
        <p>No hay etiquetas.</p>
      ) : (
        <ul className="list-group">
          {etiquetas.map((et) => (
            <li key={et.id} className="list-group-item d-flex justify-content-between align-items-center">
              <span>{et.nombre}</span>
              <div>
                <Link to={`/etiqueta/${et.id}`} className="btn btn-info btn-sm me-2">Ver</Link>
                <button className="btn btn-warning btn-sm me-2" onClick={() => editarEtiqueta(et)}>Editar</button>
                <button className="btn btn-danger btn-sm" onClick={() => eliminarEtiqueta(et.id)}>Eliminar</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Etiquetas;
