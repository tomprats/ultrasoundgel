import headers from "app/requests/headers";

export const get = (uid) => (
  fetch(`/api/preview/posts/${uid}`, {
    headers: headers(),
    method: "GET"
  }).then((response) => response.json())
);

export const getAll = () => (
  fetch("/api/preview/posts", {
    headers: headers(),
    method: "GET"
  }).then((response) => response.json())
);
