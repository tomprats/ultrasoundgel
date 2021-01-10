import PropTypes from "prop-types";
import {useContext} from "react";
import {Context} from "app";
import {createNotification} from "app/actions/notifications";
import {Check} from "components/helpers";
import {destroy as destroyUser} from "app/requests/admin/users";
import {displayDate} from "lib/string";

function AdminUsersListRow({onDestroy, user}) {
  const dispatch = useContext(Context)[1];
  const onDelete = () => {
    if(window.confirm("Are you sure you want to delete this user?")) {
      destroyUser(user.id).then((data) => {
        dispatch(createNotification({
          content: data.message,
          type: data.success ? "success" : "danger"
        }));

        if(data.success) { onDestroy(user.id); }
      });
    }
  };

  return (
    <tr>
      <td><Check checked={user.admin} /></td>
      <td><Check checked={user.post_notifications} /></td>
      <td>{user.first_name} {user.last_name}</td>
      <td>{user.email}</td>
      <td>{displayDate(user.created_at)}</td>
      <td>
        <div className="btn-group" role="group" aria-label="Actions">
          <a className="btn btn-sm btn-primary" href={`/admin/users/${user.id}`}>Edit</a>
          <button type="button" className="btn btn-sm btn-danger" onClick={onDelete}>Destroy</button>
        </div>
      </td>
    </tr>
  );
}

AdminUsersListRow.propTypes = {
  onDestroy: PropTypes.func.isRequired,
  user: PropTypes.shape({
    admin: PropTypes.bool.isRequired,
    created_at: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    first_name: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    last_name: PropTypes.string.isRequired,
    post_notifications: PropTypes.bool.isRequired
  }).isRequired
};

export default AdminUsersListRow;
