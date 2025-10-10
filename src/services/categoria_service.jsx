const API_URL = "http://127.0.0.1:8000/api";
const TOKEN = "3|IkiRqBtwlDQdE2KK3lHcO4w4EPP4bmFe404fYviK7b4a3fcc";

const headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
  Authorization: `Bearer ${TOKEN}`
};

export const getAllCategorias = async () => {
    const response = await fetch(`${API_URL}/categorias`, { method: "GET", headers });
    return await response.json();
};
export const createCategoria = async (nombre) => {
    const response = await fetch(`${API_URL}/categorias`, {
      method: "POST",
      headers,
      body: JSON.stringify({ nombre }),
    });
    return await response.json();
};