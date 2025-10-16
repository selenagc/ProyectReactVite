const API_URL = "http://127.0.0.1:8000/api";
const TOKEN = "3|IkiRqBtwlDQdE2KK3lHcO4w4EPP4bmFe404fYviK7b4a3fcc";

const headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
  Authorization: `Bearer ${TOKEN}`
};

export const getAllEtiquetas = async () => {
    const response = await fetch(`${API_URL}/etiquetas`, { method: "GET", headers });
    return await response.json();
};
export const createEtiqueta = async (nombre) => {
    const response = await fetch(`${API_URL}/etiquetas`, {
      method: "POST",
      headers,
      body: JSON.stringify({ nombre }),
    });
    return await response.json();
};
export const showEtiqueta = async (id) => {
    const response = await fetch(`${API_URL}/etiquetas/${id}`, { headers });
    return await response.json();
};

export const updateEtiqueta = async (id, nombre) => {
    const response = await fetch(`${API_URL}/etiquetas/${id}`, {
      method: "PUT",
      headers,
      body: JSON.stringify({ nombre }),
    });
    return await response.json();
};

export const destroyEtiqueta = async (id) => {
    const response = await fetch(`${API_URL}/etiquetas/${id}`, {
      method: "DELETE",
      headers,
    });
    return await response.json();
};