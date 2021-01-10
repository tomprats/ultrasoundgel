import headers from "app/requests/headers";

export const create = (params) => (
  fetch("/api/user", {
    body: JSON.stringify(params),
    headers: headers(),
    method: "POST"
  }).then((response) => response.json())
);

export const update = (params) => (
  fetch("/api/user", {
    body: JSON.stringify(params),
    headers: headers(),
    method: "PUT"
  }).then((response) => response.json())
);

export const destroy = () => (
  fetch("/api/user", {
    headers: headers(),
    method: "DELETE"
  }).then((response) => response.json())
);
