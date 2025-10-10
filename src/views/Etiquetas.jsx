import { useEffect, useState } from "react";
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


  const verDetalle = async (id) => {
    const data = await showEtiqueta(id);
    console.log("Detalle recibido:", data);
    setDetalle(data.data ? data.data : data);
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
                <button className="btn btn-info btn-sm me-2" onClick={() => verDetalle(et.id)}>Ver</button>
                <button className="btn btn-warning btn-sm me-2" onClick={() => editarEtiqueta(et)}>Editar</button>
                <button className="btn btn-danger btn-sm" onClick={() => eliminarEtiqueta(et.id)}>Eliminar</button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {}
      {detalle && (
        <div className="mt-3 p-3 border">
          <h5>Detalle de la etiqueta:</h5>
          <p><strong>ID:</strong> {detalle.id}</p>
          <p><strong>Nombre:</strong> {detalle.nombre}</p>
          {detalle.created_at && <p><strong>Creada:</strong> {detalle.created_at}</p>}
          {detalle.updated_at && <p><strong>Actualizada:</strong> {detalle.updated_at}</p>}
        </div>
      )}
    </div>
  );
}

export default Etiquetas;
