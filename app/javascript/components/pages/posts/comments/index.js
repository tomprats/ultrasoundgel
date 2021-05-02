import PropTypes from "prop-types";
import {useContext, useEffect, useState} from "react";
import {Context} from "app";
import {createNotification} from "app/actions/notifications";
import {destroy as destroyComment} from "app/requests/comments";
import {displayDateTime} from "lib/string";
import New from "./new";

function Comments({post}) {
  const [{user}, dispatch] = useContext(Context);
  const [comments, setComments] = useState(post.comments);
  const onDelete = (id) => {
    if(!window.confirm("Are you sure you want to hide this comment?")) { return; }

    destroyComment(id).then(({comments: newComments, message, success}) => {
      dispatch(createNotification({content: message, type: success ? "success" : "danger"}));

      if(success) { setComments(newComments); }
    });
  };

  useEffect(() => { setComments(post.comments); }, [post]);

  return (
    <div>
      <New post={post} setComments={setComments} />
      {comments.map((comment) => (
        <div key={comment.id} className="media mt-3">
          <div className="media-left pr-2">
            <img alt="Commenter" className="media-object" src={comment.image} width="60" />
          </div>
          <div className="media-body">
            <div className="small">
              By {comment.name} on {displayDateTime(comment.created_at)}
              {user && (user.id === comment.user_id || user.admin) && (
                <button className="float-right" onClick={() => onDelete(comment.id)} type="button">x</button>
              )}
            </div>
            <div className="preserve-whitespace">{comment.text}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

Comments.propTypes = {
  post: PropTypes.shape({
    comments: PropTypes.arrayOf(
      PropTypes.shape({
        created_at: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        user_id: PropTypes.number
      }).isRequired
    ).isRequired,
    id: PropTypes.number.isRequired
  }).isRequired
};

export default Comments;
