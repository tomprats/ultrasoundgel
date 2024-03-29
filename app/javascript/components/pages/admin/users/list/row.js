import PropTypes from "prop-types";
import {createNotification} from "app/actions/notifications";
import {Check} from "components/helpers";
import {destroy as destroyUser} from "app/requests/admin/users";
import useAppContext from "lib/hooks/use-app-context";
import {displayDate} from "lib/string";

function AdminUsersListRow({onDestroy, user}) {
  const dispatch = useAppContext()[1];
  const onDelete = () => {
    if(!window.confirm("Are you sure you want to delete this user?")) { return; }

    destroyUser(user.id).then(({message, success}) => {
      dispatch(createNotification({content: message, type: success ? "success" : "danger"}));

      if(success) { onDestroy(user.id); }
    });
  };

  return (
    <tr>
      <td><Check checked={user.admin} /></td>
      <td>{user.email}</td>
      <td>{user.first_name} {user.last_name}</td>
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
    last_name: PropTypes.string.isRequired
  }).isRequired
};

export default AdminUsersListRow;
