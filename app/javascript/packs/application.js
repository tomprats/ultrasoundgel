import * as ActiveStorage from "@rails/activestorage";
import "@rails/actiontext";
import Rails from "@rails/ujs";
import {render} from "react-dom";
import "whatwg-fetch";
import App from "components/app";
import "lib/trix";
import "assets/images/logo.jpg";
import "assets/stylesheets/application.scss";

ActiveStorage.start();
Rails.start();

document.addEventListener("DOMContentLoaded", () => {
  render(
    <App />,
    document.getElementById("app")
  );
});
