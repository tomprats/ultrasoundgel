import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {get as getEpisode} from "app/requests/episodes";
import {Episode} from "components/helpers";
import {Loading} from "components/pages";

export default function EpisodesShow() {
  const {uid} = useParams();
  const [episode, setEpisode] = useState(null);

  useEffect(() => {
    getEpisode(uid).then((data) => setEpisode(data.episode));
  }, [uid]);

  if(!episode) { return <Loading />; }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-6 offset-3">
          <Episode episode={episode} />
        </div>
      </div>
    </div>
  );
}
