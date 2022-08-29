import {getAll} from "app/requests/preview/episodes";
import * as Pages from "components/pages";

export default function PreviewEpisodesList() {
  return <Pages.Episodes.List getEpisodes={getAll} prefix="/preview" />;
}
