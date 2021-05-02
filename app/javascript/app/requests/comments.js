import headers from "app/requests/headers";

export const create = (params) => (
  fetch("/api/comments", {
    body: JSON.stringify(params),
    headers: headers(),
    method: "POST"
  }).then((response) => response.json())
);

export const destroy = (id) => (
  fetch(`/api/comments/${id}`, {
    headers: headers(),
    method: "DELETE"
  }).then((response) => response.json())
);
