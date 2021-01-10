import headers from "app/requests/headers";
import queryString from "app/requests/query-string";

export const get = (uid) => (
  fetch(`/api/posts/${uid}`, {
    headers: headers(),
    method: "GET"
  }).then((response) => response.json())
);

export const getAll = (params) => (
  fetch(`/api/posts?${queryString(params || {})}`, {
    headers: headers(),
    method: "GET"
  }).then((response) => response.json())
);
