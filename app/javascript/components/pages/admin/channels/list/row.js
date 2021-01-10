import PropTypes from "prop-types";
import {useContext} from "react";
import {Context} from "app";
import {createNotification} from "app/actions/notifications";
import {destroy as destroyChannel} from "app/requests/admin/channels";
import {displayDate} from "lib/string";

function AdminChannelsListRow({onDestroy, channel}) {
  const dispatch = useContext(Context)[1];
  const onDelete = () => {
    if(window.confirm("Are you sure you want to delete this channel?")) {
      destroyChannel(channel.id).then((data) => {
        dispatch(createNotification({
          content: data.message,
          type: data.success ? "success" : "danger"
        }));

        if(data.success) { onDestroy(channel.id); }
      });
    }
  };

  return (
    <tr>
      <td>{channel.published_at ? displayDate(channel.published_at) : "None"}</td>
      <td>{channel.author}</td>
      <td><a href={channel.image} rel="noopener noreferrer" target="_blank">View</a></td>
      <td>{channel.owner_name} ({channel.owner_email})</td>
      <td>{channel.title}</td>
      <td>
        <div className="btn-group" role="group" aria-label="Actions">
          <a className="btn btn-sm btn-primary" href={`/admin/channels/${channel.id}`}>Edit</a>
          <button type="button" className="btn btn-sm btn-danger" onClick={onDelete}>Destroy</button>
        </div>
      </td>
    </tr>
  );
}

AdminChannelsListRow.propTypes = {
  onDestroy: PropTypes.func.isRequired,
  channel: PropTypes.shape({
    author: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    owner_email: PropTypes.string.isRequired,
    owner_name: PropTypes.string.isRequired,
    published_at: PropTypes.string,
    title: PropTypes.string.isRequired
  }).isRequired
};

export default AdminChannelsListRow;
