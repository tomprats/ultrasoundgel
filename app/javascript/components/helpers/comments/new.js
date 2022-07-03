import PropTypes from "prop-types";
import {useState} from "react";
import {createNotification} from "app/actions/notifications";
import {create as createComment} from "app/requests/comments";
import useAppContext from "lib/hooks/use-app-context";
import Modal from "./modal";

function New({record, setComments}) {
  const [{user}, dispatch] = useAppContext();
  const [comment, setComment] = useState({
    commentable_id: record.id,
    commentable_type: record.type
  });
  const [showModal, setShowModal] = useState(false);
  const submit = (params) => {
    createComment({comment: params}).then(({comments, message, success}) => {
      dispatch(createNotification({content: message, type: success ? "success" : "danger"}));
      setShowModal(false);

      if(success) {
        setComment({
          commentable_id: record.id,
          commentable_type: record.type
        });
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
    <div>
      <form onSubmit={onSubmit}>
        <textarea className="form-control mb-1" name="text" onChange={onChange} placeholder="What do you think?" value={comment.text || ""} />
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
      {!user && (
        <Modal onClose={() => setShowModal(false)} onSubmit={onModalSubmit} show={showModal} />
      )}
    </div>
  );
}

New.propTypes = {
  record: PropTypes.shape({
    id: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired
  }).isRequired,
  setComments: PropTypes.func.isRequired
};

export default New;
