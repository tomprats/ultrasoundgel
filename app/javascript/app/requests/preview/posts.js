import headers from "app/requests/headers";
import {queryString} from "lib/object";

export const get = (uid) => (
  fetch(`/api/preview/posts/${uid}`, {
    headers: headers(),
    method: "GET"
  }).then((response) => response.json())
);

export const getAll = (params) => (
  fetch(`/api/preview/posts?${queryString(params || {})}`, {
    headers: headers(),
    method: "GET"
  }).then((response) => response.json())
);
