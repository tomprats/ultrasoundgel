import {get} from "app/requests/preview/posts";
import * as Pages from "components/pages";

export default function PreviewPostsShow() {
  return <Pages.Posts.Show getPost={get} prefix="/preview" />;
}
