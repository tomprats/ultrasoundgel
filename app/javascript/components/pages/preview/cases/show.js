import {get} from "app/requests/preview/cases";
import * as Pages from "components/pages";

export default function PreviewCasesShow() {
  return <Pages.Cases.Show getCase={get} prefix="/preview" />;
}
