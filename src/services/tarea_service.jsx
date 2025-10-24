import apiFetch from "./apiFetch";

export const getAll = async () => {
  return await apiFetch("tareas");
};

export const createTarea = async (tarea) => {
  return await apiFetch("tareas", {
    method: "POST",
    body: tarea,
  });
};

export const showTarea = async (id) => {
  return await apiFetch(`tareas/${id}`);
};

export const updateTarea = async (id, tarea) => {
  return await apiFetch(`tareas/${id}`, {
    method: "PUT",
    body: tarea,
  });
};

export const destroyTarea = async (id) => {
  return await apiFetch(`tareas/${id}`, {
    method: "DELETE",
  });
};