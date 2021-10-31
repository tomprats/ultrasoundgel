import PropTypes from "prop-types";
import {useState} from "react";
import {createNotification} from "app/actions/notifications";
import {destroy as destroyChannel, publish, unpublish} from "app/requests/admin/channels";
import {Publish as PublishModal} from "components/helpers/modal";
import useAppContext from "lib/hooks/use-app-context";
import {displayDate} from "lib/string";

function AdminChannelsListRow({channel: originalChannel, onDestroy}) {
  const dispatch = useAppContext()[1];
  const [channel, setChannel] = useState(originalChannel);
  const [showPublish, setShowPublish] = useState(false);
  const onDelete = () => {
    if(!window.confirm("Are you sure you want to delete this channel?")) { return; }

    destroyChannel(channel.uid).then(({message, success}) => {
      dispatch(createNotification({content: message, type: success ? "success" : "danger"}));

      if(success) { onDestroy(channel.uid); }
    });
  };
  const onPublish = (date) => {
    setShowPublish(false);

    publish(channel.uid, {published_at: date}).then(({channel: _channel, message, success}) => {
      dispatch(createNotification({content: message, type: success ? "success" : "danger"}));

      if(success) { setChannel(_channel); }
    });
  };
  const onUnpublish = () => {
    setShowPublish(false);

    unpublish(channel.uid).then(({channel: _channel, message, success}) => {
      dispatch(createNotification({content: message, type: success ? "success" : "danger"}));

      if(success) { setChannel(_channel); }
    });
  };
  const published = channel.published_at && (new Date(channel.published_at) < new Date());

  return (
    <tr>
      <td>{channel.redirect ? "Yes" : "None"}</td>
      <td>{channel.published_at ? displayDate(channel.published_at) : "None"}</td>
      <td>{channel.author}</td>
      <td>{channel.image ? <a href={channel.image} rel="noopener noreferrer" target="_blank">View</a> : "None"}</td>
      <td>{channel.owner_name} ({channel.owner_email})</td>
      <td>{channel.title}</td>
      <td>{displayDate(channel.created_at)}</td>
      <td>
        <div className="btn-group" role="group" aria-label="Actions">
          {published ? (
            <a className="btn btn-sm btn-primary" data-confirm={`${channel.title} is already published. Still want to edit?`} href={`/admin/channels/${channel.uid}`}>Edit</a>
          ) : (
            <>
              <button className="btn btn-sm btn-success" onClick={() => setShowPublish(true)} type="button">Publish</button>
              <a className="btn btn-sm btn-primary" href={`/admin/channels/${channel.uid}`}>Edit</a>
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

AdminChannelsListRow.propTypes = {
  channel: PropTypes.shape({
    author: PropTypes.string,
    created_at: PropTypes.string.isRequired,
    image: PropTypes.string,
    owner_email: PropTypes.string,
    owner_name: PropTypes.string,
    published_at: PropTypes.string,
    redirect: PropTypes.string,
    title: PropTypes.string.isRequired,
    uid: PropTypes.string.isRequired
  }).isRequired,
  onDestroy: PropTypes.func.isRequired
};

export default AdminChannelsListRow;
