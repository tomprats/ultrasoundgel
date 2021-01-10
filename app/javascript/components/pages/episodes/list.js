import PropTypes from "prop-types";
import {useEffect, useState} from "react";
import {getAll} from "app/requests/episodes";
import {ActionText} from "components/helpers";
import {Loading} from "components/pages";
import {usePage} from "lib/hooks";
import {displayDate} from "lib/string";

function EpisodesList({getEpisodes, prefix}) {
  const [episodes, setEpisodes] = useState(null);

  usePage({heading: "Podcast"});
  useEffect(() => {
    getEpisodes().then((data) => setEpisodes(data.episodes));
  }, []);

  if(!episodes) { return <Loading />; }

  return (
    <div className="container-fluid">
      <div className="row">
        {episodes.map((episode) => (
          <div key={episode.uid} className="col-md-3 mb-4 mt-1">
            <a className="d-block mb-4" href={`${prefix}/episodes/${episode.uid}`}>
              <img alt="Episode" className="img-fluid" src={episode.image} />
            </a>
            <ActionText.Content html={episode.description} truncate={{url: `${prefix}/episodes/${episode.uid}`}} />
            <p className="font-weight-bold mt-1 extra-small text-muted text-uppercase">Published on {displayDate(episode.published_at)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

EpisodesList.defaultProps = {getEpisodes: getAll, prefix: ""};
EpisodesList.propTypes = {
  getEpisodes: PropTypes.func,
  prefix: PropTypes.string
};

export default EpisodesList;
