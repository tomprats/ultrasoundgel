import headers from "app/requests/headers";

export const create = (params) => (
  fetch("/api/admin/cases", {
    body: JSON.stringify(params),
    headers: headers(),
    method: "POST"
  }).then((response) => response.json())
);

export const destroy = (id) => (
  fetch(`/api/admin/cases/${id}`, {
    headers: headers(),
    method: "DELETE"
  }).then((response) => response.json())
);

export const get = (id) => (
  fetch(`/api/admin/cases/${id}`, {
    headers: headers(),
    method: "GET"
  }).then((response) => response.json())
);

export const getAll = () => (
  fetch("/api/admin/cases", {
    headers: headers(),
    method: "GET"
  }).then((response) => response.json())
);

export const publish = (id, params) => (
  fetch(`/api/admin/cases/${id}/publish`, {
    body: JSON.stringify(params),
    headers: headers(),
    method: "POST"
  }).then((response) => response.json())
);

export const unpublish = (id) => (
  fetch(`/api/admin/cases/${id}/publish`, {
    headers: headers(),
    method: "DELETE"
  }).then((response) => response.json())
);

export const update = (id, params) => (
  fetch(`/api/admin/cases/${id}`, {
    body: JSON.stringify(params),
    headers: headers(),
    method: "PUT"
  }).then((response) => response.json())
);
