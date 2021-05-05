import PropTypes from "prop-types";
import {useContext, useState} from "react";
import {Context} from "app";
import {createNotification} from "app/actions/notifications";
import {destroy as destroyEpisode, publish, unpublish} from "app/requests/admin/episodes";
import {Publish as PublishModal} from "components/helpers/modal";
import {displayDate} from "lib/string";

function AdminEpisodesListRow({episode: originalEpisode, onDestroy}) {
  const dispatch = useContext(Context)[1];
  const [episode, setEpisode] = useState(originalEpisode);
  const [showPublish, setShowPublish] = useState(false);
  const onDelete = () => {
    if(!window.confirm("Are you sure you want to delete this episode?")) { return; }

    destroyEpisode(episode.uid).then(({message, success}) => {
      dispatch(createNotification({content: message, type: success ? "success" : "danger"}));

      if(success) { onDestroy(episode.uid); }
    });
  };
  const onPublish = (date) => {
    setShowPublish(false);

    publish(episode.uid, {published_at: date}).then(({episode: _episode, message, success}) => {
      dispatch(createNotification({content: message, type: success ? "success" : "danger"}));

      if(success) { setEpisode(_episode); }
    });
  };
  const onUnpublish = () => {
    setShowPublish(false);

    unpublish(episode.uid).then(({episode: _episode, message, success}) => {
      dispatch(createNotification({content: message, type: success ? "success" : "danger"}));

      if(success) { setEpisode(_episode); }
    });
  };
  const published = episode.published_at && (new Date(episode.published_at) < new Date());

  return (
    <tr>
      <td>{episode.published_at ? displayDate(episode.published_at) : "None"}</td>
      <td>{episode.audio ? <a href={episode.audio} rel="noopener noreferrer" target="_blank">View</a> : "None"}</td>
      <td>{episode.author}</td>
      <td><a href={`/admin/channels/${episode.channel.uid}`} rel="noopener noreferrer" target="_blank">{episode.channel.title}</a></td>
      <td>{episode.image ? <a href={episode.image} rel="noopener noreferrer" target="_blank">View</a> : "None"}</td>
      <td>{episode.title}</td>
      <td>{displayDate(episode.created_at)}</td>
      <td>
        <div className="btn-group" role="group" aria-label="Actions">
          {published ? (
            <a className="btn btn-sm btn-primary" data-confirm={`${episode.title} is already published. Still want to edit?`} href={`/admin/episodes/${episode.uid}`}>Edit</a>
          ) : (
            <>
              <button className="btn btn-sm btn-success" onClick={() => setShowPublish(true)} type="button">Publish</button>
              <a className="btn btn-sm btn-primary" href={`/admin/episodes/${episode.uid}`}>Edit</a>
            </>
          )}
          <button className="btn btn-sm btn-danger" onClick={onDelete} type="button">Destroy</button>
        </div>
        <PublishModal
          onClose={() => setShowPublish(false)}
          onPublish={onPublish}
          onUnpublish={onUnpublish}
          show={showPublish}
        />
      </td>
    </tr>
  );
}

AdminEpisodesListRow.propTypes = {
  episode: PropTypes.shape({
    audio: PropTypes.string,
    author: PropTypes.string,
    channel: PropTypes.shape({
      title: PropTypes.string.isRequired,
      uid: PropTypes.string.isRequired
    }).isRequired,
    created_at: PropTypes.string.isRequired,
    image: PropTypes.string,
    published_at: PropTypes.string,
    title: PropTypes.string.isRequired,
    uid: PropTypes.string.isRequired
  }).isRequired,
  onDestroy: PropTypes.func.isRequired
};

export default AdminEpisodesListRow;
