/* eslint-disable import/prefer-default-export */
import headers from "app/requests/headers";
import {queryString} from "lib/object";

export const getAll = (params) => (
  fetch(`/api/store/products?${queryString(params || {})}`, {
    headers: headers(),
    method: "GET"
  }).then((response) => response.json())
);
