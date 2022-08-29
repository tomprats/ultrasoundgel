import headers from "app/requests/headers";

export const get = (uid) => (
  fetch(`/api/preview/cases/${uid}`, {
    headers: headers(),
    method: "GET"
  }).then((response) => response.json())
);

export const getAll = () => (
  fetch("/api/preview/cases", {
    headers: headers(),
    method: "GET"
  }).then((response) => response.json())
);
