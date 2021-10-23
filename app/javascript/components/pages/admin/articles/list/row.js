import PropTypes from "prop-types";
import {createNotification} from "app/actions/notifications";
import {destroy as destroyArticle} from "app/requests/admin/articles";
import useAppContext from "lib/hooks/use-app-context";
import {displayDate} from "lib/string";

const monthNames = [null, "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function AdminArticlesListRow({article, onDestroy}) {
  const dispatch = useAppContext()[1];
  const onDelete = () => {
    if(!window.confirm("Are you sure you want to delete this article?")) { return; }

    destroyArticle(article.id).then(({message, success}) => {
      dispatch(createNotification({content: message, type: success ? "success" : "danger"}));

      if(success) { onDestroy(article.id); }
    });
  };

  return (
    <tr>
      <td>{article.category.name}</td>
      <td><a href={article.link} rel="noopener noreferrer" target="_blank">View</a></td>
      <td>{article.title}</td>
      <td>{article.journal}</td>
      <td>{article.year}</td>
      <td>{monthNames[article.month]}</td>
      <td>{displayDate(article.created_at)}</td>
      <td>
        <div className="btn-group" role="group" aria-label="Actions">
          <a className="btn btn-sm btn-primary" href={`/admin/articles/${article.id}`}>Edit</a>
          <button type="button" className="btn btn-sm btn-danger" onClick={onDelete}>Destroy</button>
        </div>
      </td>
    </tr>
  );
}

AdminArticlesListRow.propTypes = {
  article: PropTypes.shape({
    category: PropTypes.shape({name: PropTypes.string.isRequired}).isRequired,
    created_at: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    link: PropTypes.string.isRequired,
    journal: PropTypes.string.isRequired,
    month: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired
  }).isRequired,
  onDestroy: PropTypes.func.isRequired
};

export default AdminArticlesListRow;
