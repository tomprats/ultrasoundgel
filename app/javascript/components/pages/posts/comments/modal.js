import PropTypes from "prop-types";
import {useContext, useState} from "react";
import {Context} from "app";
import {Loading} from "components/helpers";
import {useScript} from "lib/hooks";

function CommentModal({onClose, onSubmit, show}) {
  const [{app: {recaptcha}}] = useContext(Context);
  const [loading, setLoading] = useState(true);
  const onComment = () => onSubmit({recaptcha: window.grecaptcha.getResponse()});

  useScript({onLoad: () => setLoading(false), url: "https://www.google.com/recaptcha/api.js"});

  return (
    <div className={`modal fade ${show ? "d-block show" : ""}`} role="dialog">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title">Comment</h4>
            <button className="close" onClick={onClose} type="button">
              <i className="fas fa-times" />
            </button>
          </div>
          <div className="modal-body text-center">
            <div>
              <h5>Verify Yourself</h5>
              {loading ? <Loading /> : (
                <div className="g-recaptcha d-inline-block" data-sitekey={recaptcha} />
              )}
            </div>
            <div className="mt-2">
              <h5>or <a href="/session/new" target="_blank">Sign In or Up</a> to</h5>
              <ul className="text-left">
                <li>Comment Publicly</li>
                <li>Manage Comments</li>
                <li>Recieve Notifications</li>
              </ul>
            </div>
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose} type="button">Cancel</button>
            <button className="btn btn-primary" onClick={onComment} type="button">Comment</button>
          </div>
        </div>
      </div>
    </div>
  );
}

CommentModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired
};

export default CommentModal;
