import headers from "app/requests/headers";

export const create = (params) => (
  fetch("/api/profile", {
    body: JSON.stringify(params),
    headers: headers(),
    method: "POST"
  }).then((response) => response.json())
);

export const update = (params) => (
  fetch("/api/profile", {
    body: JSON.stringify(params),
    headers: headers(),
    method: "PUT"
  }).then((response) => response.json())
);

export const destroy = () => (
  fetch("/api/profile", {
    headers: headers(),
    method: "DELETE"
  }).then((response) => response.json())
);
