import headers from "app/requests/headers";

export const create = (params) => (
  fetch("/api/admin/users", {
    body: JSON.stringify(params),
    headers: headers(),
    method: "POST"
  }).then((response) => response.json())
);

export const destroy = (id) => (
  fetch(`/api/admin/users/${id}`, {
    headers: headers(),
    method: "DELETE"
  }).then((response) => response.json())
);

export const get = (id) => (
  fetch(`/api/admin/users/${id}`, {
    headers: headers(),
    method: "GET"
  }).then((response) => response.json())
);

export const getAll = () => (
  fetch("/api/admin/users", {
    headers: headers(),
    method: "GET"
  }).then((response) => response.json())
);

export const update = (id, params) => (
  fetch(`/api/admin/users/${id}`, {
    body: JSON.stringify(params),
    headers: headers(),
    method: "PUT"
  }).then((response) => response.json())
);
