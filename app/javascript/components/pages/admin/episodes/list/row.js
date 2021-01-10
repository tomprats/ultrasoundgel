import PropTypes from "prop-types";
import {useContext} from "react";
import {Context} from "app";
import {createNotification} from "app/actions/notifications";
import {destroy as destroyEpisode} from "app/requests/admin/episodes";
import {displayDate} from "lib/string";

function AdminEpisodesListRow({onDestroy, episode}) {
  const dispatch = useContext(Context)[1];
  const onDelete = () => {
    if(window.confirm("Are you sure you want to delete this episode?")) {
      destroyEpisode(episode.id).then((data) => {
        dispatch(createNotification({
          content: data.message,
          type: data.success ? "success" : "danger"
        }));

        if(data.success) { onDestroy(episode.id); }
      });
    }
  };

  return (
    <tr>
      <td>{episode.published_at ? displayDate(episode.published_at) : "None"}</td>
      <td><a href={episode.audio} rel="noopener noreferrer" target="_blank">View</a></td>
      <td>{episode.author}</td>
      <td>{episode.channel.title}</td>
      <td><a href={episode.image} rel="noopener noreferrer" target="_blank">View</a></td>
      <td>{episode.title}</td>
      <td>
        <div className="btn-group" role="group" aria-label="Actions">
          <a className="btn btn-sm btn-primary" href={`/admin/episodes/${episode.id}`}>Edit</a>
          <button type="button" className="btn btn-sm btn-danger" onClick={onDelete}>Destroy</button>
        </div>
      </td>
    </tr>
  );
}

AdminEpisodesListRow.propTypes = {
  onDestroy: PropTypes.func.isRequired,
  episode: PropTypes.shape({
    audio: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    channel: PropTypes.shape({title: PropTypes.string.isRequired}).isRequired,
    id: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    published_at: PropTypes.string,
    title: PropTypes.string.isRequired
  }).isRequired
};

export default AdminEpisodesListRow;
