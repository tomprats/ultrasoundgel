import headers from "app/requests/headers";

export const destroy = (id) => (
  fetch(`/api/admin/messages/${id}`, {
    headers: headers(),
    method: "DELETE"
  }).then((response) => response.json())
);

export const get = (id) => (
  fetch(`/api/admin/messages/${id}`, {
    headers: headers(),
    method: "GET"
  }).then((response) => response.json())
);

export const getAll = () => (
  fetch("/api/admin/messages", {
    headers: headers(),
    method: "GET"
  }).then((response) => response.json())
);
