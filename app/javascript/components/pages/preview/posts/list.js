import {getAll} from "app/requests/preview/posts";
import * as Pages from "components/pages";

export default function PreviewPostsList() {
  return <Pages.Posts.List getPosts={getAll} prefix="/preview" />;
}
