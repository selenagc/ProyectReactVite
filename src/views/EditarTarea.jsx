import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { showTarea, updateTarea } from "../services/tarea_service";
import { getAllCategorias } from "../services/categoria_service";
import { getAllEtiquetas } from "../services/etiqueta_service";

function EditarTarea() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [estado, setEstado] = useState("pendiente");
  const [categoriaId, setCategoriaId] = useState("");
  const [tagsSeleccionados, setTagsSeleccionados] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [tags, setTags] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const tarea = await showTarea(id);

        setTitulo(tarea.data.titulo || "");
        setDescripcion(tarea.data.descripcion || "");
        setEstado(tarea.data.estado || "pendiente");
        setCategoriaId(String(tarea.data.categoria?.id ?? ""));

        // Marcar etiquetas existentes
        const etiquetasIds = (tarea.data.etiquetas || []).map(tag => Number(tag.id));
        setTagsSeleccionados(etiquetasIds);

        const categoriasData = await getAllCategorias();
        const tagsData = await getAllEtiquetas();

        setCategorias(categoriasData || []);
        setTags(tagsData || []);
      } catch (error) {
        console.error("Error al cargar datos:", error);
      } finally {
        setCargando(false);
      }
    };

    cargarDatos();
  }, [id]);

  const handleCheckboxEstado = (e) => {
    setEstado(e.target.checked ? "realizada" : "pendiente");
  };

  const handleTagCheckbox = (tagId) => {
    const idNum = Number(tagId);
    setTagsSeleccionados((prev) =>
      prev.includes(idNum) ? prev.filter((id) => id !== idNum) : [...prev, idNum]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!titulo || !descripcion || !categoriaId) {
      alert("Por favor completa todos los campos obligatorios.");
      return;
    }

    const tareaActualizada = {
      titulo,
      descripcion,
      estado,
      categoria_id: Number(categoriaId),
      etiquetas: tagsSeleccionados
    };

    await updateTarea(id, tareaActualizada);
    navigate("/tareas");
  };

  if (cargando) {
    return <div className="container mt-3"><div className="alert alert-info">Cargando datos...</div></div>;
  }
  return (
    <div className="container mt-3">
      <h2>Editar Tarea</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Título</label>
          <input type="text" className="form-control" value={titulo} onChange={(e) => setTitulo(e.target.value)} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Descripción</label>
          <textarea className="form-control" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} rows="3" required />
        </div>

        <div className="form-check mb-3">
          <input type="checkbox" className="form-check-input" checked={estado === "realizada"} onChange={handleCheckboxEstado} />
          <label className="form-check-label ms-2">
            {estado === "realizada" ? "Tarea Realizada" : "Tarea Pendiente"}
          </label>
        </div>

        <div className="mb-3">
          <label className="form-label">Categoría *</label>
          <select className="form-control" value={categoriaId} onChange={(e) => setCategoriaId(e.target.value)} required>
            <option value="">Seleccione una categoría</option>
            {categorias.map(cat => (
              <option key={cat.id} value={String(cat.id)}>{cat.nombre}</option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Etiquetas</label>
          <div className="border rounded p-3 bg-light" style={{ maxHeight: "250px", overflowY: "auto" }}>
            {tags.length === 0 ? <p className="text-muted mb-0">No hay etiquetas disponibles</p> :
              tags.map(tag => (
                <div key={tag.id} className="form-check mb-2">
                  <input type="checkbox" className="form-check-input"
                    checked={tagsSeleccionados.includes(Number(tag.id))}
                    onChange={() => handleTagCheckbox(tag.id)}
                  />
                  <label className="form-check-label">{tag.nombre}</label>
                </div>
              ))
            }
          </div>
        </div>

        <button type="submit" className="btn btn-primary">Actualizar Tarea</button>
        <button type="button" className="btn btn-secondary ms-2" onClick={() => navigate("/tareas")}>Cancelar</button>
      </form>
    </div>
  );
}

export default EditarTarea;