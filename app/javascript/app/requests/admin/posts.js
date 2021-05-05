import headers from "app/requests/headers";

export const create = (params) => (
  fetch("/api/admin/posts", {
    body: JSON.stringify(params),
    headers: headers(),
    method: "POST"
  }).then((response) => response.json())
);

export const destroy = (id) => (
  fetch(`/api/admin/posts/${id}`, {
    headers: headers(),
    method: "DELETE"
  }).then((response) => response.json())
);

export const get = (id) => (
  fetch(`/api/admin/posts/${id}`, {
    headers: headers(),
    method: "GET"
  }).then((response) => response.json())
);

export const getAll = () => (
  fetch("/api/admin/posts", {
    headers: headers(),
    method: "GET"
  }).then((response) => response.json())
);

export const publish = (id, params) => (
  fetch(`/api/admin/posts/${id}/publish`, {
    body: JSON.stringify(params),
    headers: headers(),
    method: "POST"
  }).then((response) => response.json())
);

export const unpublish = (id) => (
  fetch(`/api/admin/posts/${id}/publish`, {
    headers: headers(),
    method: "DELETE"
  }).then((response) => response.json())
);

export const update = (id, params) => (
  fetch(`/api/admin/posts/${id}`, {
    body: JSON.stringify(params),
    headers: headers(),
    method: "PUT"
  }).then((response) => response.json())
);
