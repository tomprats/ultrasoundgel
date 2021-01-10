export default function queryString(params) {
  return new URLSearchParams(Object.entries(params)).toString();
}
