import PropTypes from "prop-types";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {get} from "app/requests/episodes";
import {ActionText} from "components/helpers";
import {Loading} from "components/pages";
import {usePage} from "lib/hooks";

function EpisodesShow({getEpisode}) {
  const {uid} = useParams();
  const [episode, setEpisode] = useState(null);

  usePage({heading: "Podcast"});
  useEffect(() => {
    getEpisode(uid).then((data) => setEpisode(data.episode));
  }, [uid]);

  if(!episode) { return <Loading />; }

  return (
    <div className="container-fluid h-100">
      <div className="row h-100">
        <div className="col-lg-9">
          <div className="episode-content">
            <div className="row">
              <div className="col-md-8">
                <div className="hide-scrollbar scrollable">
                  <small className="text-muted text-uppercase">Episode {episode.number}</small>
                  <h1 className="mb-4 text-uppercase">{episode.title}</h1>
                  <ActionText.Content html={episode.description} />
                </div>
              </div>
              <div className="col-md-4">
                <img alt="Episode" className="img-fluid" src={episode.image} />
              </div>
            </div>
            <audio className="episode-audio" controls={true} src={episode.audio} type={episode.audio_type}>
              <a href={episode.audio}>
                <i className="fas fa-headphones" /> Listen
              </a>
            </audio>
          </div>
        </div>
      </div>
    </div>
  );
}

EpisodesShow.defaultProps = {getEpisode: get};
EpisodesShow.propTypes = {getEpisode: PropTypes.func};

export default EpisodesShow;
