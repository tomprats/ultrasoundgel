import PropTypes from "prop-types";
import {useEffect, useRef} from "react";

function SearchModal({onClose, show}) {
  const input = useRef(null);

  useEffect(() => {
    if(!show) { return; }

    input.current.focus();
  }, [show]);

  return (
    <div className={`modal fade ${show ? "d-block show" : ""}`} role="dialog">
      <div className="modal-dialog">
        <div className="modal-content">
          <form action="/">
            <div className="modal-header">
              <h4 className="modal-title">Search</h4>
              <button className="close" onClick={onClose} type="button">
                <i className="fas fa-times" />
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group row">
                <label className="col-form-label col-sm-3 text-right" htmlFor="search">Text</label>
                <div className="col-sm-9">
                  <input className="form-control" id="search" name="search" ref={input} type="text" />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={onClose} type="button">Cancel</button>
              <input className="btn btn-primary" type="submit" value="Search" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

SearchModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired
};

export default SearchModal;
