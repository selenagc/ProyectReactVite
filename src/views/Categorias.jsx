import { useEffect, useState } from "react";
import { getAllCategorias, createCategoria, showCategoria,updateCategoria } from "../services/categoria_service.jsx";
import { getAllCategorias, createCategoria, showCategoria } from "../services/categoria_service.jsx";
import { getAllCategorias, createCategoria } from "../services/categoria_service.jsx";

function Categorias() {
  const [categorias, setCategorias] = useState([]);
  const [nombre, setNombre] = useState("");
  const [detalle, setDetalle] = useState(null);
  const [editingId, setEditingId] = useState(null);

  const cargarCategorias = async () => {
    try {
      const data = await getAllCategorias();
      setCategorias(data);
    } catch (error) {
      console.error("Error al cargar categorías:", error);
    }
  };

  useEffect(() => {
    cargarCategorias();
  }, []);

  const guardarCategoria = async () => {
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
  return (
    <div className="container mt-3">
      <h2>Listado de Categorías</h2>

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
          Crear
        </button>
      </div>

      {}
      {categorias.length === 0 ? (
        <p>No hay categorías registradas.</p>
      ) : (
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
