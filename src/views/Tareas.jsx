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


}

export default Tareas;
