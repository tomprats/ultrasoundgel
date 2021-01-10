import headers from "app/requests/headers";

export const get = (uid) => (
  fetch(`/api/episodes/${uid}`, {
    headers: headers(),
    method: "GET"
  }).then((response) => response.json())
);

export const getAll = () => (
  fetch("/api/episodes", {
    headers: headers(),
    method: "GET"
  }).then((response) => response.json())
);
