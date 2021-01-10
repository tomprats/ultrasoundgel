export function getBlobUrlTemplate() {
  const routes = document.querySelector("#routes");

  return routes.getAttribute("data-blob-url-template");
}

export function getDirectUploadUrl() {
  const routes = document.querySelector("#routes");

  return routes.getAttribute("data-direct-upload-url");
}
