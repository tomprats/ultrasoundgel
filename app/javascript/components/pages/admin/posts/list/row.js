import PropTypes from "prop-types";
import {useContext} from "react";
import {Context} from "app";
import {createNotification} from "app/actions/notifications";
import {destroy as destroyPost} from "app/requests/admin/posts";
import {displayDate} from "lib/string";

function AdminPostsListRow({onDestroy, post}) {
  const dispatch = useContext(Context)[1];
  const onDelete = () => {
    if(window.confirm("Are you sure you want to delete this post?")) {
      destroyPost(post.id).then((data) => {
        dispatch(createNotification({
          content: data.message,
          type: data.success ? "success" : "danger"
        }));

        if(data.success) { onDestroy(post.id); }
      });
    }
  };

  return (
    <tr>
      <td>{post.published_at ? displayDate(post.published_at) : "None"}</td>
      <td>{post.author}</td>
      <td>
        {post.episode && <a href={`/admin/episodes/${post.episode.id}`}>{post.episode.title}</a>}
      </td>
      <td>
        {post.tags.map((tag) => (
          <span key={tag} className="badge badge-success mx-1">{tag}</span>
        ))}
      </td>
      <td>{post.title}</td>
      <td>
        <div className="btn-group" role="group" aria-label="Actions">
          <a className="btn btn-sm btn-primary" href={`/admin/posts/${post.id}`}>Edit</a>
          <button type="button" className="btn btn-sm btn-danger" onClick={onDelete}>Destroy</button>
        </div>
      </td>
    </tr>
  );
}

AdminPostsListRow.propTypes = {
  onDestroy: PropTypes.func.isRequired,
  post: PropTypes.shape({
    author: PropTypes.string.isRequired,
    episode: PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired
    }),
    id: PropTypes.number.isRequired,
    published_at: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    title: PropTypes.string.isRequired
  }).isRequired
};

export default AdminPostsListRow;
