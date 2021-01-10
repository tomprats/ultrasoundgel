import PropTypes from "prop-types";
import {useState} from "react";

function Alert({content, onClose, type, ...props}) {
  const [show, setShow] = useState(true);

  if(!show) { return null; }

  const onClick = (e) => {
    e.preventDefault();

    onClose ? onClose() : setShow(false);
  };

  return (
    <div className="toast show mx-auto" role="alert" aria-live="assertive" aria-atomic="true" {...props}>
      <div className="toast-header">
        <strong className={`mr-auto text-${type}`}>Notification</strong>
        <button aria-label="Close" className="close ml-2" onClick={onClick} type="button">
          <i className="far fa-times" />
        </button>
      </div>
      <div className="toast-body">{content}</div>
    </div>
  );
}

Alert.defaultProps = {
  onClose: null,
  type: "primary"
};

Alert.propTypes = {
  content: PropTypes.string.isRequired,
  onClose: PropTypes.func,
  type: PropTypes.string
};

export default Alert;
