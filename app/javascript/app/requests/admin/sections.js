import headers from "app/requests/headers";

export const get = (id) => (
  fetch(`/api/admin/sections/${id}`, {
    headers: headers(),
    method: "GET"
  }).then((response) => response.json())
);

export const getAll = () => (
  fetch("/api/admin/sections", {
    headers: headers(),
    method: "GET"
  }).then((response) => response.json())
);

export const update = (id, params) => (
  fetch(`/api/admin/sections/${id}`, {
    body: JSON.stringify(params),
    headers: headers(),
    method: "PUT"
  }).then((response) => response.json())
);
