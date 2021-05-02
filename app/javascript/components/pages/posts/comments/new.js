import PropTypes from "prop-types";
import {useContext, useState} from "react";
import {Context} from "app";
import {createNotification} from "app/actions/notifications";
import {create as createComment} from "app/requests/comments";
import Modal from "./modal";

function New({post, setComments}) {
  const [{user}, dispatch] = useContext(Context);
  const [comment, setComment] = useState({post_id: post.id});
  const [showModal, setShowModal] = useState(false);
  const submit = (params) => {
    createComment({comment: params}).then(({comments, message, success}) => {
      dispatch(createNotification({content: message, type: success ? "success" : "danger"}));
      setShowModal(false);

      if(success) {
        setComment({post_id: post.id});
        setComments(comments);
      }
    });
  };
  const onChange = ({target: {checked, name, type, value}}) => (
    setComment({...comment, [name]: type === "checkbox" ? checked : value})
  );
  const onModalSubmit = (params) => { submit({...comment, ...params}); };
  const onSubmit = (e) => {
    e.preventDefault();
    submit(comment);
  };

  return (
    <div className="row">
      <div className="col-12">
        <form onSubmit={onSubmit}>
          <textarea className="form-control" name="text" onChange={onChange} placeholder="What do you think?" value={comment.text || ""} />
          {user ? (
            <div className="row">
              <div className="col-sm-8">
                <div className="form-check">
                  <label className="form-check-label">
                    <input className="form-check-input" name="anonymous" onChange={onChange} type="checkbox" value={comment.anonymous || false} />
                    Post Anonymously?
                  </label>
                </div>
              </div>
              <div className="col-sm-4">
                <button className="btn btn-themed float-right" type="submit">Comment</button>
              </div>
            </div>
          ) : (
            <button className="btn btn-themed float-right" onClick={() => setShowModal(true)} type="button">Comment</button>
          )}
        </form>
      </div>
      {!user && (
        <Modal onClose={() => setShowModal(false)} onSubmit={onModalSubmit} show={showModal} />
      )}
    </div>
  );
}

New.propTypes = {
  post: PropTypes.shape({id: PropTypes.number.isRequired}).isRequired,
  setComments: PropTypes.func.isRequired
};

export default New;
