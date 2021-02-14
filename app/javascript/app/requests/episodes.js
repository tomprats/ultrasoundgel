import headers from "app/requests/headers";
import {queryString} from "lib/object";

export const get = (uid) => (
  fetch(`/api/episodes/${uid}`, {
    headers: headers(),
    method: "GET"
  }).then((response) => response.json())
);

export const getAll = (params) => (
  fetch(`/api/episodes?${queryString(params || {})}`, {
    headers: headers(),
    method: "GET"
  }).then((response) => response.json())
);
