import { useEffect, useState } from "react";
import { getAllCategorias } from "../services/categoria_service.jsx";

function Categorias() {
  const [categorias, setCategorias] = useState([]);

  const cargarCategorias = async () => {
    try {
      const data = await getAllCategorias();
      console.log("Categorías obtenidas desde la API:", data); 
      setCategorias(data);
    } catch (error) {
      console.error("Error al cargar categorías:", error);
    }
  };

  useEffect(() => {
    cargarCategorias();
  }, []);

  return (
    <div className="container mt-3">
      <h2>Listado de Categorías</h2>

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
