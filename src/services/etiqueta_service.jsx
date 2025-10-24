import apiFetch from "./apiFetch";

export const getAllEtiquetas = async () => {
  return await apiFetch("etiquetas");
};

export const createEtiqueta = async (nombre) => {
  return await apiFetch("etiquetas", {
    method: "POST",
    body: { nombre },
  });
};

export const showEtiqueta = async (id) => {
  return await apiFetch(`etiquetas/${id}`);
};

export const updateEtiqueta = async (id, nombre) => {
  return await apiFetch(`etiquetas/${id}`, {
    method: "PUT",
    body: { nombre },
  });
};

export const destroyEtiqueta = async (id) => {
  return await apiFetch(`etiquetas/${id}`, {
    method: "DELETE",
  });
};