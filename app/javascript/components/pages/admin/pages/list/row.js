import PropTypes from "prop-types";
import {useContext} from "react";
import {Context} from "app";
import {createNotification} from "app/actions/notifications";
import {destroy as destroyPage} from "app/requests/admin/pages";
import {displayDate} from "lib/string";

function AdminPagesListRow({onDestroy, page}) {
  const dispatch = useContext(Context)[1];
  const onDelete = () => {
    if(!window.confirm("Are you sure you want to delete this page?")) { return; }

    destroyPage(page.id).then(({message, success}) => {
      dispatch(createNotification({content: message, type: success ? "success" : "danger"}));

      if(success) { onDestroy(page.id); }
    });
  };

  return (
    <tr>
      <td>{page.active ? "Yes" : "No"}</td>
      <td>{page.rank}</td>
      <td>{page.template}</td>
      <td>{page.name}</td>
      <td>{page.path}</td>
      <td>{displayDate(page.created_at)}</td>
      <td>
        <div className="btn-group" role="group" aria-label="Actions">
          <a className="btn btn-sm btn-success" href={`/${page.path}`} rel="noopener noreferrer" target="_blank">View</a>
          <a className="btn btn-sm btn-primary" href={`/admin/pages/${page.id}`}>Edit</a>
          <button type="button" className="btn btn-sm btn-danger" onClick={onDelete}>Destroy</button>
        </div>
      </td>
    </tr>
  );
}

AdminPagesListRow.propTypes = {
  onDestroy: PropTypes.func.isRequired,
  page: PropTypes.shape({
    active: PropTypes.bool.isRequired,
    created_at: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    rank: PropTypes.number.isRequired,
    template: PropTypes.string.isRequired
  }).isRequired
};

export default AdminPagesListRow;
