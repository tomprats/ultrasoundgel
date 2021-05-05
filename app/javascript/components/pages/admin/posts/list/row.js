import PropTypes from "prop-types";
import {useContext, useState} from "react";
import {Context} from "app";
import {createNotification} from "app/actions/notifications";
import {destroy as destroyPost, publish, unpublish} from "app/requests/admin/posts";
import {Publish as PublishModal} from "components/helpers/modal";
import {displayDate} from "lib/string";

function AdminPostsListRow({post: originalPost, onDestroy}) {
  const dispatch = useContext(Context)[1];
  const [post, setPost] = useState(originalPost);
  const [showPublish, setShowPublish] = useState(false);
  const onDelete = () => {
    if(!window.confirm("Are you sure you want to delete this post?")) { return; }

    destroyPost(post.uid).then(({message, success}) => {
      dispatch(createNotification({content: message, type: success ? "success" : "danger"}));

      if(success) { onDestroy(post.uid); }
    });
  };
  const onPublish = (date) => {
    setShowPublish(false);

    publish(post.uid, {published_at: date}).then(({post: _post, message, success}) => {
      dispatch(createNotification({content: message, type: success ? "success" : "danger"}));

      if(success) { setPost(_post); }
    });
  };
  const onUnpublish = () => {
    setShowPublish(false);

    unpublish(post.uid).then(({post: _post, message, success}) => {
      dispatch(createNotification({content: message, type: success ? "success" : "danger"}));

      if(success) { setPost(_post); }
    });
  };
  const published = post.published_at && (new Date(post.published_at) < new Date());

  return (
    <tr>
      <td>{post.published_at ? displayDate(post.published_at) : "None"}</td>
      <td><a href={`/admin/episodes/${post.episode.uid}`} rel="noopener noreferrer" target="_blank">{post.episode.title}</a></td>
      <td>{post.public_tags.join(", ")}</td>
      <td>{post.title}</td>
      <td>{displayDate(post.created_at)}</td>
      <td>
        <div className="btn-group" role="group" aria-label="Actions">
          {published ? (
            <a className="btn btn-sm btn-primary" data-confirm={`${post.title} is already published. Still want to edit?`} href={`/admin/posts/${post.uid}`}>Edit</a>
          ) : (
            <>
              <button className="btn btn-sm btn-success" onClick={() => setShowPublish(true)} type="button">Publish</button>
              <a className="btn btn-sm btn-primary" href={`/admin/posts/${post.uid}`}>Edit</a>
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

AdminPostsListRow.propTypes = {
  onDestroy: PropTypes.func.isRequired,
  post: PropTypes.shape({
    created_at: PropTypes.string.isRequired,
    episode: PropTypes.shape({
      title: PropTypes.string.isRequired,
      uid: PropTypes.string.isRequired
    }).isRequired,
    public_tags: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    published_at: PropTypes.string,
    title: PropTypes.string.isRequired,
    uid: PropTypes.string.isRequired
  }).isRequired
};

export default AdminPostsListRow;
