import moment from "moment";
import PropTypes from "prop-types";
import {useState} from "react";

function PublishModal({onClose, onPublish: _onPublish, onUnpublish, show}) {
  const [date, setDate] = useState(null);
  const [placeholder] = useState(moment().format(moment.HTML5_FMT.DATETIME_LOCAL));
  const onDateChange = ({target: {value}}) => setDate(value ? moment(value).format() : value);
  const value = date ? moment(date).format(moment.HTML5_FMT.DATETIME_LOCAL) : "";
  const onPublish = () => {
    const response = date || window.confirm("Are you sure you want to publish immediately");
    if(!response) { return; }

    _onPublish(date);
  };

  return (
    <div className={`modal fade ${show ? "d-block show" : ""}`} role="dialog">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title">Publish</h4>
            <button className="close" onClick={onClose} type="button">
              <i className="fas fa-times" />
            </button>
          </div>
          <div className="modal-body">
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <label className="input-group-text" htmlFor="published-at">Published At</label>
              </div>
              <input
                className="form-control"
                id="published-at"
                name="published_at"
                onChange={onDateChange}
                placeholder={placeholder}
                type="datetime-local"
                value={value}
              />
            </div>
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose} type="button">Cancel</button>
            <button className="btn btn-danger" onClick={onUnpublish} type="button">Unpublish</button>
            <button className="btn btn-primary" onClick={onPublish} type="button">Publish</button>
          </div>
        </div>
      </div>
    </div>
  );
}

PublishModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onPublish: PropTypes.func.isRequired,
  onUnpublish: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired
};

export default PublishModal;
