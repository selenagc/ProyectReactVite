const API_URL = "http://127.0.0.1:8000/api"; 
const TOKEN = "3|IkiRqBtwlDQdE2KK3lHcO4w4EPP4bmFe404fYviK7b4a3fcc";

const headers = {
  "Content-Type": "application/json",
  "Accept": "application/json",
  "Authorization": `Bearer ${TOKEN}`,
};

export const getAll = async () => {
    const response = await fetch(`${API_URL}/tareas`, {
      method: "GET",
      headers,
    });
    const data = await response.json();
    return data;
};

export const createTarea = async (tarea) => {
    const response = await fetch(`${API_URL}/tareas`, {
      method: "POST",
      headers,
      body: JSON.stringify(tarea),
    });
    const data = await response.json();
    return data;
};

export const showTarea = async (id) => {
    const response = await fetch(`${API_URL}/tareas/${id}`, {
      method: "GET",
      headers,
    });
    const data = await response.json();
    return data;
};

export const updateTarea = async (id, tarea) => {
    const response = await fetch(`${API_URL}/tareas/${id}`, {
      method: "PUT",
      headers,
      body: JSON.stringify(tarea),
    });
    const data = await response.json();
    return data;
};

export const destroyTarea = async (id) => {
    const response = await fetch(`${API_URL}/tareas/${id}`, {
      method: "DELETE",
      headers,
    });
    const data = await response.json();
    return data;
};
