/* eslint-disable import/prefer-default-export */
import headers from "app/requests/headers";

export const get = () => (
  fetch("/api/app", {
    headers: headers(),
    method: "GET"
  }).then((response) => response.json())
);
