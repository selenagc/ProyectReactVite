import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createTarea } from "../services/tarea_service";
import { getAllCategorias } from "../services/categoria_service";
import { getAllEtiquetas } from "../services/etiqueta_service";

function CrearTarea() {
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

  useEffect(() => {
    const cargarDatos = async () => {
      const categoriasData = await getAllCategorias();
      const tagsData = await getAllEtiquetas();
      setCategorias(categoriasData || []);
      setTags(tagsData || []);
    };
    cargarDatos();
  }, []);

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
      alert("Por favor completa todos los campos obligatorios.");
      return;
    }

    await createTarea({
      ...tarea,
      categoria_id: Number(tarea.categoria_id)
    });

    setTarea({
      titulo: "",
      descripcion: "",
      estado: "pendiente",
      categoria_id: "",
      etiquetas: []
    });

    navigate("/tareas");
  };

  return (
    <div className="container mt-3">
      <h2>Crear Nueva Tarea</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Título *</label>
          <input
            type="text"
            name="titulo"
            className="form-control"
            value={tarea.titulo}
            onChange={handleChange}
            placeholder="Ingrese el título de la tarea"
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
            placeholder="Describa la tarea"
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
            {tarea.estado === "realizada" ? "Tarea Realizada" : "Tarea Pendiente"}
          </label>
        </div>

        <div className="mb-3">
          <label className="form-label">Categoría *</label>
          <select
            name="categoria_id"
            className="form-control"
            value={tarea.categoria_id}
            onChange={handleChange}
            required
          >
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
                    id={`tag-${tag.id}`}
                    checked={tarea.etiquetas.includes(Number(tag.id))}
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

        <button type="submit" className="btn btn-primary">
          Crear Tarea
        </button>
        <button
          type="button"
          className="btn btn-secondary ms-2"
          onClick={() => navigate("/tareas")}
        >
          Cancelar
        </button>
      </form>
    </div>
  );
}

export default CrearTarea;