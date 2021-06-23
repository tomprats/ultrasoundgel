import * as ActiveStorage from "@rails/activestorage";
import "@rails/actiontext";
import Rails from "@rails/ujs";
import {render} from "react-dom";
import * as Trix from "trix";
import "whatwg-fetch";
import App from "components/app";
import "assets/images/logo.jpg";
import "assets/stylesheets/application.scss";

ActiveStorage.start();
Rails.start();
Trix.config.attachments.preview.caption.name = false;
Trix.config.attachments.preview.caption.size = false;

document.addEventListener("DOMContentLoaded", () => {
  render(
    <App />,
    document.getElementById("app")
  );
});
