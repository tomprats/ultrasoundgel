/* eslint-disable import/prefer-default-export */
import headers from "app/requests/headers";

export const getAll = () => (
  fetch("/api/store/countries", {
    headers: headers(),
    method: "GET"
  }).then((response) => response.json())
);
