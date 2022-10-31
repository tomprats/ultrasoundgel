import PropTypes from "prop-types";
import {useState} from "react";
import appleImage from "assets/images/apple.svg";
import googleImage from "assets/images/google.svg";
import useAppContext from "lib/hooks/use-app-context";

// TODO: Get player_url and set number in Podbean
// TODO: Remove this component and put player iframe directly in 2 components
function AudioLinks({episode}) {
  if(!episode.player_url) { return null; }

  return (
    <iframe className="mt-4" src={episode.player_url} title="Episode Audio" />
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
