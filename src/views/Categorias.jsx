import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { 
  getAllCategorias, 
  createCategoria, 
  showCategoria, 
  updateCategoria, 
  destroyCategoria 
} from "../services/categoria_service.jsx";

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
        </button>
      </div>

      {categorias.length === 0 ? (
        <p>No hay categorías registradas.</p>
      ) : (
        <ul className="list-group">
          {categorias.map((cat) => (
            <li key={cat.id} className="list-group-item d-flex justify-content-between align-items-center">
              <span>{cat.nombre}</span>
              <div>
                <Link to={`/categoria/${cat.id}`} className="btn btn-info btn-sm me-2">Ver</Link>
                <button className="btn btn-warning btn-sm me-2" onClick={() => editarCategoria(cat)}>Editar</button>
                <button className="btn btn-danger btn-sm" onClick={() => eliminarCategoria(cat.id)}>Eliminar</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Categorias;
