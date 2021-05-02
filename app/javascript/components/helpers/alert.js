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
    <div className={`alert alert-${type} alert-dismissible`} role="alert" {...props}>
      {content}
      <button aria-label="Close" className="close" onClick={onClick} type="button">
        <i className="fas fa-times" />
      </button>
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
