import PropTypes from "prop-types";
import {displayDateTime} from "lib/string";
import Content from "./action-text/content";
import AudioLinks from "./audio-links";

function Episode({episode}) {
  return (
    <div className="row">
      <div className="col-sm-6">
        {(episode.post && episode.post.published_at) ? (
          <a href={`/posts/${episode.post.uid}`}>
            <img alt="Episode cover art" className="img-fluid" src={`/episodes/${episode.uid}/image.${episode.image_extension}`} />
          </a>
        ) : (
          <img alt="Episode cover art" className="img-fluid" src={`/episodes/${episode.uid}/image.${episode.image_extension}`} />
        )}
        <div className="d-sm-none">
          <hr className="my-3" />
        </div>
      </div>
      <div className="col-sm-6">
        <h3 className="m-0 p-0">{episode.title}</h3>
        {episode.post && episode.post.published_at && (
          <div>
            <a href={`/posts/${episode.post.uid}`}>
              <i className="fas fa-pen-square" /> Post
            </a>
          </div>
        )}
        <AudioLinks episode={episode} />
        <h4 className="mt-2">{episode.subtitle}</h4>
        <p>By {episode.author} on {episode.published_at ? displayDateTime(episode.published_at) : "Unpublished"}</p>
        <Content html={episode.description} />
      </div>
    </div>
  );
}

Episode.propTypes = {
  episode: PropTypes.shape({
    author: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image_extension: PropTypes.string.isRequired,
    post: PropTypes.shape({
      published_at: PropTypes.string,
      uid: PropTypes.string.isRequired
    }),
    published_at: PropTypes.string,
    subtitle: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    uid: PropTypes.string.isRequired
  }).isRequired
};

export default Episode;
