import Rails from "@rails/ujs";

export default () => ({
  "Accept": "application/json",
  "Content-Type": "application/json; charset=utf-8",
  "X-CSRF-Token": Rails.csrfToken()
});
