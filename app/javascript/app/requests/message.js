/* eslint-disable import/prefer-default-export */
import headers from "app/requests/headers";

export const create = (params) => (
  fetch("/api/messages", {
    body: JSON.stringify(params),
    headers: headers(),
    method: "POST"
  }).then((response) => response.json())
);
