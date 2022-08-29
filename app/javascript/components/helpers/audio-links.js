import PropTypes from "prop-types";
import appleImage from "assets/images/apple.svg";
import googleImage from "assets/images/google.svg";
import useAppContext from "lib/hooks/use-app-context";

function AudioLinks({episode}) {
  const [{channel}] = useAppContext();
  const googleLink = episode.google_link || channel.google_link;
  const itunesLink = episode.itunes_link || channel.itunes_link;
  const iframeLink = [
    `https://www.podbean.com/player-v2/?i=${episode.podbean_id}-pb`,
    "btn-skin=2baf9e",
    "download=1",
    "font-color=auto",
    "fonts=Arial",
    "rtl=0",
    "skin=1",
    "share=1",
    "logo_link=podcast_page"
  ].join("&");

  return (
    <>
      {(itunesLink || googleLink) && (
        <div className="my-1 store-links">
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
      <iframe
        allowtransparency="true"
        data-name="pb-iframe-player"
        height="150"
        title={episode.title}
        style={{border: "none", minWidth: "min(100%, 430px)"}}
        scrolling="no"
        src={iframeLink}
        width="100%"
      />
    </>
  );
}

AudioLinks.propTypes = {
  episode: PropTypes.shape({
    google_link: PropTypes.string,
    itunes_link: PropTypes.string,
    podbean_id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    uid: PropTypes.string.isRequired
  }).isRequired
};

export default AudioLinks;
