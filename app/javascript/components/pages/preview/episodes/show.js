import {get} from "app/requests/preview/episodes";
import * as Pages from "components/pages";

export default function PreviewEpisodesShow() {
  return <Pages.Episodes.Show getEpisode={get} prefix="/preview" />;
}
