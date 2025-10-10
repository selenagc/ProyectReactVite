import { useEffect, useState } from "react";
import { getAllCategorias, createCategoria } from "../services/categoria_service.jsx";

function Categorias() {
  const [categorias, setCategorias] = useState([]);
  const [nombre, setNombre] = useState("");

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

  return (
    <div className="container mt-3">
      <h2>Listado de Categorías</h2>

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


      {categorias.length === 0 ? (
        <p>No hay categorías registradas.</p>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Fecha de creación</th>
              <th>Última actualización</th>
            </tr>
          </thead>
          <tbody>
            {categorias.map((cat) => (
              <tr key={cat.id}>
                <td>{cat.id}</td>
                <td>{cat.nombre}</td>
                <td>{new Date(cat.created_at).toLocaleString()}</td>
                <td>{new Date(cat.updated_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Categorias;
