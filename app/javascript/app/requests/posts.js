import headers from "app/requests/headers";

export const get = (uid) => (
  fetch(`/api/posts/${uid}`, {
    headers: headers(),
    method: "GET"
  }).then((response) => response.json())
);

export const subscribe = (uid) => (
  fetch(`/api/posts/${uid}/subscribe`, {
    headers: headers(),
    method: "POST"
  }).then((response) => response.json())
);

export const unsubscribe = (uid) => (
  fetch(`/api/posts/${uid}/unsubscribe`, {
    headers: headers(),
    method: "POST"
  }).then((response) => response.json())
);
