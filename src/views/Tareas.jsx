import { useEffect, useState } from "react";
import { getAll } from "../services/tarea_service.jsx";

function Tareas() {
  const [tareas, setTareas] = useState([]);

  useEffect(() => {
    const cargarTareas = async () => {
      const data = await getAll();
      console.log("Tareas obtenidas:", data);
      setTareas(data);
    };
    cargarTareas();
  }, []);

  return (
    <div className="container">
      <h2 className="mb-3">Lista de Tareas</h2>

      {tareas.length === 0 ? (
        <p>No hay tareas registradas.</p>
      ) : (
        <table className="table table-bordered table-striped">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Título</th>
              <th>Descripción</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {tareas.map((tarea) => (
              <tr key={tarea.id}>
                <td>{tarea.id}</td>
                <td>{tarea.titulo}</td>
                <td>{tarea.descripcion}</td>
                <td>{tarea.estado}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Tareas;