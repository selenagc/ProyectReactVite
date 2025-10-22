import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { showTarea, updateTarea } from "../services/tarea_service";
import { getAllCategorias } from "../services/categoria_service";
import { getAllEtiquetas } from "../services/etiqueta_service";

function EditarTarea() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tarea, setTarea] = useState({
    titulo: "",
    descripcion: "",
    estado: "pendiente",
    categoria_id: "",
    etiquetas: []
  });

  const [categorias, setCategorias] = useState([]);
  const [tags, setTags] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [mensajeError, setMensajeError] = useState("");
  const [mensajeExito, setMensajeExito] = useState("");

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const tareaResp = await showTarea(id);
        const tareaData = tareaResp.data;

        setTarea({
          titulo: tareaData.titulo || "",
          descripcion: tareaData.descripcion || "",
          estado: tareaData.estado || "pendiente",
          categoria_id: String(tareaData.categoria?.id ?? ""),
          etiquetas: (tareaData.etiquetas || []).map((tag) => Number(tag.id))
        });

        const [categoriasData, tagsData] = await Promise.all([
          getAllCategorias(),
          getAllEtiquetas()
        ]);

        setCategorias(categoriasData || []);
        setTags(tagsData || []);
      } catch (error) {
        console.error("Error al cargar datos:", error);
        setMensajeError("Error al cargar los datos de la tarea.");
      } finally {
        setCargando(false);
      }
    };

    cargarDatos();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTarea((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxEstado = (e) => {
    setTarea((prev) => ({
      ...prev,
      estado: e.target.checked ? "realizada" : "pendiente"
    }));
  };

  const handleTagCheckbox = (tagId) => {
    const idNum = Number(tagId);
    setTarea((prev) => ({
      ...prev,
      etiquetas: prev.etiquetas.includes(idNum)
        ? prev.etiquetas.filter((id) => id !== idNum)
        : [...prev.etiquetas, idNum]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!tarea.titulo || !tarea.descripcion || !tarea.categoria_id) {
      setMensajeError("Por favor completa todos los campos obligatorios.");
      setMensajeExito("");
      return;
    }

    const tareaActualizada = {
      ...tarea,
      categoria_id: Number(tarea.categoria_id)
    };

    try {
      await updateTarea(id, tareaActualizada);
      setMensajeExito("Tarea actualizada con éxito.");
      setMensajeError("");

      setTimeout(() => navigate("/tareas"), 1500);
    } catch (error) {
      console.error("Error al actualizar tarea:", error);
      setMensajeError("Ocurrió un error al actualizar la tarea. Intenta nuevamente.");
      setMensajeExito("");
    }
  };

  if (cargando) {
    return (
      <div className="container mt-3">
        <div className="alert alert-info">Cargando datos...</div>
      </div>
    );
  }

  return (
    <div className="container mt-3">
      <h2>Editar Tarea</h2>
      {mensajeError && <div className="alert alert-danger">{mensajeError}</div>}
      {mensajeExito && <div className="alert alert-success">{mensajeExito}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Título *</label>
          <input
            type="text"
            name="titulo"
            className="form-control"
            value={tarea.titulo}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Descripción *</label>
          <textarea
            name="descripcion"
            className="form-control"
            value={tarea.descripcion}
            onChange={handleChange}
            rows="3"
            required
          />
        </div>

        <div className="form-check mb-3">
          <input
            type="checkbox"
            className="form-check-input"
            checked={tarea.estado === "realizada"}
            onChange={handleCheckboxEstado}
          />
          <label className="form-check-label ms-2">
            {tarea.estado === "realizada"
              ? "Tarea Realizada"
              : "Tarea Pendiente"}
          </label>
        </div>

        <div className="mb-3">
          <label className="form-label">Categoría *</label>
          <select  name="categoria_id" className="form-control" value={tarea.categoria_id} onChange={handleChange} required>
            <option value="">Seleccione una categoría</option>
            {categorias.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.nombre}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Etiquetas</label>
          <div
            className="border rounded p-3 bg-light"
            style={{ maxHeight: "250px", overflowY: "auto" }}
          >
            {tags.length === 0 ? (
              <p className="text-muted mb-0">No hay etiquetas disponibles</p>
            ) : (
              tags.map((tag) => (
                <div key={tag.id} className="form-check mb-2">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    checked={tarea.etiquetas.includes(Number(tag.id))}
                    onChange={() => handleTagCheckbox(tag.id)}
                  />
                  <label className="form-check-label">{tag.nombre}</label>
                </div>
              ))
            )}
          </div>
        </div>

        <button type="submit" className="btn btn-primary">Actualizar Tarea</button>
        <button  type="button"  className="btn btn-secondary ms-2"  onClick={() => navigate("/tareas")}>Cancelar</button>
      </form>
    </div>
  );
}

export default EditarTarea;