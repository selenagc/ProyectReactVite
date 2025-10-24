import apiFetch from "./apiFetch";

export const getAllCategorias = async () => {
  return await apiFetch("categorias");
};

export const createCategoria = async (nombre) => {
  return await apiFetch("categorias", {
    method: "POST",
    body: { nombre },
  });
};

export const showCategoria = async (id) => {
  return await apiFetch(`categorias/${id}`);
};

export const updateCategoria = async (id, nombre) => {
  return await apiFetch(`categorias/${id}`, {
    method: "PUT",
    body: { nombre },
  });
};

export const destroyCategoria = async (id) => {
  return await apiFetch(`categorias/${id}`, {
    method: "DELETE",
  });
};