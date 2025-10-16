import { useEffect, useState } from "react";
import { 
  getAllCategorias, 
  createCategoria, 
  showCategoria, 
  updateCategoria, 
  destroyCategoria 
} from "../services/categoria_service.jsx";
import { getAllCategorias, createCategoria, showCategoria,updateCategoria } from "../services/categoria_service.jsx";
import { getAllCategorias, createCategoria, showCategoria } from "../services/categoria_service.jsx";
import { getAllCategorias, createCategoria } from "../services/categoria_service.jsx";

function Categorias() {
  const [categorias, setCategorias] = useState([]);
  const [nombre, setNombre] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [detalle, setDetalle] = useState(null);

  const cargarCategorias = async () => {
    const data = await getAllCategorias();
    setCategorias(data);
  };

  useEffect(() => {
    cargarCategorias();
  }, []);

  const guardarCategoria = async () => {
    if (!nombre.trim()) {
      alert("Por favor, ingresa un nombre para la categoría");
      return;
    }

    if (editingId) {
      await updateCategoria(editingId, nombre);
      setEditingId(null);
    } else {
      await createCategoria(nombre);
    }

    setNombre("");
    cargarCategorias();
  };


const verDetalle = async (id) => {
  const data = await showCategoria(id);
  console.log("Detalle recibido:", data);
  setDetalle(data);
};

    if (nombre.trim() === "") {
      alert("Por favor ingresa un nombre de categoría.");
      return;
    }

    try {
      await createCategoria(nombre);
      setNombre("");
      cargarCategorias();
    } catch (error) {
      console.error("Error al crear categoría:", error);
    }
  };

  const verDetalle = async (id) => {
    try {
      const data = await showCategoria(id);
      console.log("Detalle recibido:", data);
      setDetalle(data);
    } catch (error) {
      console.error("Error al obtener detalle:", error);
    }
  };
  const editarCategoria = (cat) => {
    setEditingId(cat.id);
    setNombre(cat.nombre);
    setDetalle(null);
  };

  const eliminarCategoria = async (id) => {
    if (window.confirm("¿Estás seguro de eliminar esta categoría?")) {
      await destroyCategoria(id);
      cargarCategorias();
      if (detalle?.id === id) setDetalle(null);
    }
  };

  return (
    <div className="container mt-3">
      <h2>Gestión de Categorías</h2>

      {}
      <div className="mb-3">
        <input 
          type="text" 
          className="form-control mb-2" 
          placeholder="Nombre de la categoría" 
          value={nombre} 
          onChange={(e) => setNombre(e.target.value)} 
        />
        <button className="btn btn-primary" onClick={guardarCategoria}>
          {editingId ? "Actualizar" : "Crear"}
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Nombre de la categoría"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <button className="btn btn-primary" onClick={guardarCategoria}>
          Crear
        </button>
      </div>

      {}
      {categorias.length === 0 ? (
        <p>No hay categorías registradas.</p>
      ) : (
        <ul className="list-group">
          {categorias.map((cat) => (
            <li key={cat.id} className="list-group-item d-flex justify-content-between align-items-center">
              <span>{cat.nombre}</span>
              <div>
                <button className="btn btn-info btn-sm me-2" onClick={() => verDetalle(cat.id)}>Ver</button>
                <button className="btn btn-warning btn-sm me-2" onClick={() => editarCategoria(cat)}>Editar</button>
                <button className="btn btn-danger btn-sm" onClick={() => eliminarCategoria(cat.id)}>Eliminar</button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {}
      {detalle && (
        <div className="mt-3 p-3 border">
          <h5>Detalle de la categoría:</h5>
          <p><strong>ID:</strong> {detalle.id}</p>
          <p><strong>Nombre:</strong> {detalle.nombre}</p>
          <p><strong>Creada:</strong> {detalle.created_at}</p>
          <p><strong>Actualizada:</strong> {detalle.updated_at}</p>
        </div>
      )}
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Creación</th>
              <th>Actualización</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {categorias.map((cat) => (
              <tr key={cat.id}>
                <td>{cat.id}</td>
                <td>{cat.nombre}</td>
                <td>{new Date(cat.created_at).toLocaleString()}</td>
                <td>{new Date(cat.updated_at).toLocaleString()}</td>
                <td>
                  <button
                    className="btn btn-info btn-sm"
                    onClick={() => verDetalle(cat.id)}
                  >
                    Ver
                  </button>
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() => editarCategoria(cat)}
                  >
                    Editar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {}
      {detalle && (
        <div className="mt-3 p-3 border">
          <h5>Detalle de la categoría:</h5>
          <p><strong>ID:</strong> {detalle.id}</p>
          <p><strong>Nombre:</strong> {detalle.nombre}</p>
          <p><strong>Creada:</strong> {detalle.created_at}</p>
          <p><strong>Actualizada:</strong> {detalle.updated_at}</p>
        </div>
      )}

    </div>
  );
}

export default Categorias;