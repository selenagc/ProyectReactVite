const API_URL = "http://127.0.0.1:8000/api";
const TOKEN = "3|IkiRqBtwlDQdE2KK3lHcO4w4EPP4bmFe404fYviK7b4a3fcc";

const headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
  Authorization: `Bearer ${TOKEN}`
};


export const getAllEtiquetas = async () => {
  try {
    const response = await fetch(`${API_URL}/etiquetas`, { method: "GET", headers });
    const data = await response.json();
    console.log("Lista de etiquetas:", data);
    return data;
  } catch (error) {
    console.error("Error en getAllEtiquetas():", error);
  }
};


export const createEtiqueta = async (nombre) => {
  try {
    const response = await fetch(`${API_URL}/etiquetas`, {
      method: "POST",
      headers,
      body: JSON.stringify({ nombre }),
    });
    const data = await response.json();
    console.log("Etiqueta creada:", data);
    return data;
  } catch (error) {
    console.error("Error en createEtiqueta():", error);
  }
};


export const showEtiqueta = async (id) => {
  try {
    const response = await fetch(`${API_URL}/etiquetas/${id}`, { headers });
    const data = await response.json();
    console.log("Detalle de la etiqueta:", data);
    return data;
  } catch (error) {
    console.error("Error en showEtiqueta():", error);
  }
};


export const updateEtiqueta = async (id, nombre) => {
  try {
    const response = await fetch(`${API_URL}/etiquetas/${id}`, {
      method: "PUT",
      headers,
      body: JSON.stringify({ nombre }),
    });
    const data = await response.json();
    console.log("Etiqueta actualizada:", data);
    return data;
  } catch (error) {
    console.error("Error en updateEtiqueta():", error);
  }
};


export const destroyEtiqueta = async (id) => {
  try {
    const response = await fetch(`${API_URL}/etiquetas/${id}`, {
      method: "DELETE",
      headers,
    });
    const data = await response.json();
    console.log("Etiqueta eliminada:", data);
    return data;
  } catch (error) {
    console.error("Error en destroyEtiqueta():", error);
  }
};
