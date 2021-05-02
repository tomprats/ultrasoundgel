import PropTypes from "prop-types";
import {useRef, useState} from "react";
import {Alert} from "components/helpers";

function ShareModal({onClose: _onClose, show}) {
  const link = useRef(null);
  const [message, setMessage] = useState(null);
  const onClose = () => {
    setMessage(null);
    _onClose();
  };
  const onCopy = () => {
    link.current.select();

    let error;
    try {
      error = !document.execCommand("copy");
    } catch(e) {
      error = true;
    }

    setMessage(error ? {
      content: "There was a problem copying the link. Try copying it manually",
      type: "danger"
    } : {
      content: "Link Copied",
      type: "success"
    });
  };

  return (
    <div className={`modal fade ${show ? "d-block show" : ""}`} role="dialog">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title">Share</h4>
            <button className="close" onClick={onClose} type="button">
              <i className="fas fa-times" />
            </button>
          </div>
          <div className="modal-body">
            {message && <Alert {...message} />}
            <div className="form-group">
              <input className="form-control" disabled={true} name="share" ref={link} type="url" value={window.location.href} />
            </div>
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose} type="button">Cancel</button>
            <button className="btn btn-primary" onClick={onCopy} type="button">Copy</button>
          </div>
        </div>
      </div>
    </div>
  );
}

ShareModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired
};

export default ShareModal;
