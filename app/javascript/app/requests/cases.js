import headers from "app/requests/headers";

export const get = (uid) => (
  fetch(`/api/cases/${uid}`, {
    headers: headers(),
    method: "GET"
  }).then((response) => response.json())
);

export const getAll = () => (
  fetch("/api/cases", {
    headers: headers(),
    method: "GET"
  }).then((response) => response.json())
);

export const subscribe = (uid) => (
  fetch(`/api/cases/${uid}/subscribe`, {
    headers: headers(),
    method: "POST"
  }).then((response) => response.json())
);

export const unsubscribe = (uid) => (
  fetch(`/api/cases/${uid}/unsubscribe`, {
    headers: headers(),
    method: "POST"
  }).then((response) => response.json())
);
