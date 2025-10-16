import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createTarea } from "../services/tarea_service";
import { getAllCategorias } from "../services/categoria_service";
import { getAllEtiquetas } from "../services/etiqueta_service";

function CrearTarea() {
  const navigate = useNavigate();
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [estado, setEstado] = useState("pendiente");
  const [categoriaId, setCategoriaId] = useState("");
  const [tagsSeleccionados, setTagsSeleccionados] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    const cargarDatos = async () => {
      const categoriasData = await getAllCategorias();
      const tagsData = await getAllEtiquetas();
      setCategorias(categoriasData || []);
      setTags(tagsData || []);
    };
    cargarDatos();
  }, []);

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

    const nuevaTarea = {
      titulo,
      descripcion,
      estado,
      categoria_id: Number(categoriaId),
      etiquetas: tagsSeleccionados
    };

      await createTarea(nuevaTarea);
      setTitulo("");
      setDescripcion("");
      setEstado("pendiente");
      setCategoriaId("");
      setTagsSeleccionados([]);
      navigate("/tareas");
  };

  return (
    <div className="container mt-3">
      <h2>Crear Nueva Tarea</h2>
      <form onSubmit={handleSubmit}>
        {}
        <div className="mb-3">
          <label className="form-label">Título *</label>
          <input
            type="text"
            className="form-control"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            placeholder="Ingrese el título de la tarea"
            required
          />
        </div>

        {}
        <div className="mb-3">
          <label className="form-label">Descripción *</label>
          <textarea
            className="form-control"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            placeholder="Describa la tarea"
            rows="3"
            required
          />
        </div>

        {}
        <div className="form-check mb-3">
          <input
            type="checkbox"
            className="form-check-input"
            checked={estado === "realizada"}
            onChange={handleCheckboxEstado}
          />
          <label className="form-check-label ms-2">
            {estado === "realizada" ? " Tarea Realizada" : "Tarea Pendiente"}
          </label>
        </div>

        {}
        <div className="mb-3">
          <label className="form-label">Categoría</label>
          <select
            className="form-control"
            value={categoriaId}
            onChange={(e) => setCategoriaId(e.target.value)}
            required
          >
            <option value="">Seleccione una categoría</option>
            {categorias.map((cat) => (
              <option key={cat.id} value={String(cat.id)}>
                {cat.nombre}
              </option>
            ))}
          </select>
        </div>

        {}
        <div className="mb-3">
          <label className="form-label">Etiquetas</label>
          <div className="border rounded p-3 bg-light" style={{ maxHeight: "250px", overflowY: "auto" }}>
            {tags.length === 0 ? (
              <p className="text-muted mb-0">No hay etiquetas disponibles</p>
            ) : (
              tags.map((tag) => (
                <div key={tag.id} className="form-check mb-2">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id={`tag-${tag.id}`}
                    checked={tagsSeleccionados.includes(Number(tag.id))}
                    onChange={() => handleTagCheckbox(tag.id)}
                  />
                  <label className="form-check-label" htmlFor={`tag-${tag.id}`}>
                    {tag.nombre}
                  </label>
                </div>
              ))
            )}
          </div>
        </div>

        <button type="submit" className="btn btn-primary">Crear Tarea</button>
        <button type="button" className="btn btn-secondary ms-2" onClick={() => navigate("/tareas")}>Cancelar</button>
      </form>
    </div>
  );
}

export default CrearTarea;
