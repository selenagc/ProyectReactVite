const API_URL = "http://127.0.0.1:8000/api";
const TOKEN = "3|IkiRqBtwlDQdE2KK3lHcO4w4EPP4bmFe404fYviK7b4a3fcc";

export const getAll = async () => {
  try {
    const response = await fetch(`${API_URL}/tareas`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${TOKEN}`
      },
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en getAll():", error);
  }
};
