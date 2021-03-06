/* eslint-disable import/prefer-default-export */
import headers from "app/requests/headers";

export const getAll = () => (
  fetch("/api/articles", {
    headers: headers(),
    method: "GET"
  }).then((response) => response.json())
);
