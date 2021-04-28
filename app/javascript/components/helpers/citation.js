import PropTypes from "prop-types";
import {useContext} from "react";
import {Context} from "app";
import {displayDate} from "lib/string";

function Citation({post}) {
  const [{channel}] = useContext(Context);
  const number = (post.episode && post.episode.number) || channel.episodeNumber + 1;
  const start = [
    post.episode && `${post.episode.author}.`,
    `${post.title}.`
  ].filter(Boolean).join(" ");
  const end = [
    post.published_at && `Published on ${displayDate(post.published_at)}.`,
    `Accessed on ${displayDate(Date.now())}.`,
    `Available at ${window.location.origin}/${number}.`
  ].filter(Boolean).join(" ");

  return <>{start} <i>Ultrasound G.E.L. Podcast Blog.</i> {end}</>;
}

Citation.propTypes = {
  post: PropTypes.shape({
    episode: PropTypes.shape({
      author: PropTypes.string.isRequired,
      number: PropTypes.number
    }),
    published_at: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
  }).isRequired
};

export default Citation;
