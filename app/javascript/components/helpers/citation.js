import PropTypes from "prop-types";
import useAppContext from "lib/hooks/use-app-context";
import {displayDate} from "lib/string";

function Citation({post}) {
  const [{channel}] = useAppContext();
  const number = (post.episode && post.episode.number) || channel.episodeNumber + 1;
  const url = (post.episode && post.episode.kind === "Full")
    ? `${window.location.origin}/${number}`
    : `/posts/${post.uid}`;
  const start = [
    post.episode && `${post.episode.author}.`,
    `${post.title}.`
  ].filter(Boolean).join(" ");
  const end = [
    post.published_at && `Published on ${displayDate(post.published_at)}.`,
    `Accessed on ${displayDate(Date.now())}.`,
    `Available at ${url}.`
  ].filter(Boolean).join(" ");

  return <>{start} <i>Ultrasound G.E.L. Podcast Blog.</i> {end}</>;
}

Citation.propTypes = {
  post: PropTypes.shape({
    episode: PropTypes.shape({
      author: PropTypes.string.isRequired,
      kind: PropTypes.string.isRequired,
      number: PropTypes.number
    }),
    published_at: PropTypes.string,
    title: PropTypes.string.isRequired,
    uid: PropTypes.string.isRequired
  }).isRequired
};

export default Citation;
