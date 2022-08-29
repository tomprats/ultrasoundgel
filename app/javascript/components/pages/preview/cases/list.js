import {getAll} from "app/requests/preview/cases";
import * as Pages from "components/pages";

export default function PreviewCasesList() {
  return <Pages.Cases.List getCases={getAll} prefix="/preview" />;
}
