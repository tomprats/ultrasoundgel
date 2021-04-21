import PropTypes from "prop-types";
import {useContext} from "react";
import {Context} from "app";

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
            <a className="itunes" href={itunesLink} rel="noreferrer" target="_blank">
              <img alt="Listen on Apple Podcasts" src="https://linkmaker.itunes.apple.com/assets/shared/badges/en-us/podcast-lrg.svg" />
            </a>
          )}
          {googleLink && (
            <a className="google" href={googleLink} rel="noreferrer" target="_blank">
              <img alt="Get it on Google Play" src="https://play.google.com/intl/en_us/badges/images/generic/en_badge_web_generic.png" />
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
