import { useState } from "react";
import { destroyTarea } from "../services/tarea_service";

function EliminarTarea({ id }) {
  const [confirmado, setConfirmado] = useState(false);

  const handleEliminar = async () => {
    if (window.confirm("¿Seguro que deseas eliminar esta tarea?")) {
      await destroyTarea(id);
    }
  };

  return (
    <button onClick={handleEliminar} className="btn btn-danger btn-sm">Eliminar</button>
  );
}