import PropTypes from "prop-types";
import {useContext} from "react";
import {Context} from "app";
import appleImage from "assets/images/apple.svg";
import googleImage from "assets/images/google.svg";

function AudioLinks({episode}) {
  const [{channel}] = useContext(Context);
  const audioLink = `/episodes/${episode.uid}/audio.${episode.audio_extension}`;
  const googleLink = episode.google_link || channel.google_link;
  const itunesLink = episode.itunes_link || channel.itunes_link;

  return (
    <>
      {(itunesLink || googleLink) && (
        <div className="store-links">
          {itunesLink && (
            <a className="apple" href={itunesLink} rel="noreferrer" target="_blank">
              <img alt="Listen on Apple Podcasts" width="200" src={appleImage} />
            </a>
          )}
          {googleLink && (
            <a className="google" href={googleLink} rel="noreferrer" target="_blank">
              <img alt="Listen on Google Podcasts" width="200" src={googleImage} />
            </a>
          )}
        </div>
      )}
      <audio controls={true} src={audioLink} type={episode.audio_type}>
        <a href={audioLink}>
          <i className="fas fa-headphones" /> Listen
        </a>
      </audio>
    </>
  );
}

AudioLinks.propTypes = {
  episode: PropTypes.shape({
    audio_extension: PropTypes.string.isRequired,
    audio_type: PropTypes.string.isRequired,
    google_link: PropTypes.string,
    itunes_link: PropTypes.string,
    uid: PropTypes.string.isRequired
  }).isRequired
};

export default AudioLinks;
