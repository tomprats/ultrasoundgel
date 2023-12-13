/* eslint-disable import/prefer-default-export */
import headers from "app/requests/headers";

export const getShipping = (params) => (
  fetch("/api/store/cart/shipping", {
    body: JSON.stringify(params),
    headers: headers(),
    method: "POST"
  }).then((response) => response.json())
);
