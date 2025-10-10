import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAll, destroyTarea, updateTarea } from "../services/tarea_service";

function Tareas() {
  const [tareas, setTareas] = useState([]);

  const cargarTareas = async () => {
    const data = await getAll();
    setTareas(data);
  };

  useEffect(() => {
    cargarTareas();
  }, []);

  const handleEliminar = async (id) => {
    if (window.confirm("¿Seguro que deseas eliminar esta tarea?")) {
      await destroyTarea(id);
      cargarTareas();
    }
  };

  const handleCambiarEstado = async (tarea) => {
    const nuevoEstado = tarea.estado === "pendiente" ? "realizada" : "pendiente";
    
    const tareaActualizada = {
      titulo: tarea.titulo,
      descripcion: tarea.descripcion,
      estado: nuevoEstado,
      categoria_id: tarea.categoria?.id || null,
      tags: (tarea.etiquetas || []).map(tag => Number(tag.id))
    };
      await updateTarea(tarea.id, tareaActualizada);
      setTareas(prevTareas => 
        prevTareas.map(t => 
          t.id === tarea.id 
            ? { ...t, estado: nuevoEstado }
            : t
        )
      );
  };

  return (
    <div className="container mt-3">
      <h2 className="mb-3">Lista de Tareas</h2>
      <Link to="/tarea/crear" className="btn btn-success mb-3">Crear Nueva Tarea</Link>

      {tareas.length === 0 ? (
        <p>No hay tareas registradas.</p>
      ) : (
        <table className="table table-bordered table-striped">
          <thead className="table-dark">
            <tr>
              <th>Estado</th>
              <th>ID</th>
              <th>Título</th>
              <th>Descripción</th>
              <th>Categoría</th>
              <th>Etiquetas</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {tareas.map((tarea) => (
              <tr key={tarea.id}>
                <td className="text-center">
                  <input
                    type="checkbox"
                    checked={tarea.estado === "realizada"}
                    onChange={() => handleCambiarEstado(tarea)}
                    style={{ cursor: "pointer", width: "20px", height: "20px" }}
                    title={tarea.estado === "realizada" ? "Marcar como pendiente" : "Marcar como realizada"}
                  />
                </td>
                <td>{tarea.id}</td>
                <td>{tarea.titulo}</td>
                <td>{tarea.descripcion}</td>
                <td>
                  {tarea.categoria ? (
                    <span className="badge bg-primary">{tarea.categoria.nombre}</span>
                  ) : (
                    <span className="text-muted">Sin categoría</span>
                  )}
                </td>
                <td>
                  {tarea.etiquetas && tarea.etiquetas.length > 0 ? (
                    tarea.etiquetas.map((etiqueta) => (
                      <span key={etiqueta.id} className="badge bg-secondary me-1">
                        {etiqueta.nombre}
                      </span>
                    ))
                  ) : (
                    <span className="text-muted">Sin etiquetas</span>
                  )}
                </td>
                <td>
                  <Link to={`/tarea/${tarea.id}`} className="btn btn-info btn-sm me-2">Ver</Link>
                  <Link to={`/tarea/editar/${tarea.id}`} className="btn btn-warning btn-sm me-2">Editar</Link>
                  <button className="btn btn-danger btn-sm" onClick={() => handleEliminar(tarea.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Tareas;