import PropTypes from "prop-types";
import {createNotification} from "app/actions/notifications";
import {destroy as destroyCategory} from "app/requests/admin/article-categories";
import useAppContext from "lib/hooks/use-app-context";
import {displayDate} from "lib/string";

function AdminArticleCategoriesListRow({category, onDestroy}) {
  const dispatch = useAppContext()[1];
  const onDelete = () => {
    if(!window.confirm("Are you sure you want to delete this category?")) { return; }

    destroyCategory(category.id).then(({message, success}) => {
      dispatch(createNotification({content: message, type: success ? "success" : "danger"}));

      if(success) { onDestroy(category.id); }
    });
  };

  return (
    <tr>
      <td>{category.rank}</td>
      <td>{category.name}</td>
      <td>{displayDate(category.created_at)}</td>
      <td>
        <div className="btn-group" role="group" aria-label="Actions">
          <a className="btn btn-sm btn-primary" href={`/admin/article-categories/${category.id}`}>Edit</a>
          <button type="button" className="btn btn-sm btn-danger" onClick={onDelete}>Destroy</button>
        </div>
      </td>
    </tr>
  );
}

AdminArticleCategoriesListRow.propTypes = {
  category: PropTypes.shape({
    created_at: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    rank: PropTypes.number.isRequired
  }).isRequired,
  onDestroy: PropTypes.func.isRequired
};

export default AdminArticleCategoriesListRow;
