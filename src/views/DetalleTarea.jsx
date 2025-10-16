import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { showTarea } from "../services/tarea_service";

function DetalleTarea() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tarea, setTarea] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const cargarTarea = async () => {
      try {
        setCargando(true);
        const tareaData = await showTarea(id);
        console.log("Datos de la tarea:", tareaData);
        const etiquetas = (tareaData.data.etiquetas || []).map(tag => ({
          ...tag,
          id: Number(tag.id)
        }));

        setTarea({
          ...tareaData.data,
          etiquetas
        });
      } catch (error) {
        console.error("Error al cargar tarea:", error);
      } finally {
        setCargando(false);
      }
    };

    cargarTarea();
  }, [id]);

  if (cargando) {
    return (
      <div className="container mt-3">
        <div className="alert alert-info">Cargando datos...</div>
      </div>
    );
  }

  if (!tarea) {
    return (
      <div className="container mt-3">
        <div className="alert alert-danger">No se pudo cargar la tarea</div>
        <button className="btn btn-secondary" onClick={() => navigate("/tareas")}>Volver a la lista</button>
      </div>
    );
  }

  return (
    <div className="container mt-3">
      <h2>Detalle de la Tarea</h2>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{tarea.titulo || "Sin título"}</h5>

          <div className="mb-3">
            <strong>Descripción:</strong>
            <p className="mt-1">{tarea.descripcion || "No disponible"}</p>
          </div>

          <div className="mb-3">
            <strong>Estado:</strong>
            <span className={`ms-2 badge ${tarea.estado === "realizada" ? "bg-success" : "bg-warning text-dark"}`}>
              {tarea.estado === "realizada" ? "Realizada" : "Pendiente"}
            </span>
          </div>

          <div className="mb-3">
            <strong>Categoría:</strong>
            {tarea.categoria ? (
              <span className="ms-2 badge bg-primary">{tarea.categoria.nombre}</span>
            ) : (
              <span className="ms-2 text-muted">Sin categoría</span>
            )}
          </div>

          <div className="mb-3">
            <strong>Etiquetas:</strong>
            <div className="mt-2">
              {tarea.etiquetas && tarea.etiquetas.length > 0 ? (
                tarea.etiquetas.map((etiqueta) => (
                  <span key={etiqueta.id} className="badge bg-secondary me-2 mb-1">
                    {etiqueta.nombre}
                  </span>
                ))
              ) : (
                <span className="text-muted">Sin etiquetas</span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-3">
        <button className="btn btn-secondary" onClick={() => navigate("/tareas")}>Volver a la lista de tareas</button>
        <button className="btn btn-warning ms-2" onClick={() => navigate(`/tarea/editar/${tarea.id}`)}>Editar Tarea</button>
      </div>
    </div>
  );
}

export default DetalleTarea;