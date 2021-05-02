import PropTypes from "prop-types";
import {useState} from "react";
import {ActionText, FileInput} from "components/helpers";

// TODO: Submitting date
// TODO: Showing non-image files
function AdminSectionsContent({content, onChange: setChanges}) {
  const [editText, setEditText] = useState(false);
  const [text, setText] = useState(content.value);
  const id = `content-value-${content.id}`;
  const onChange = ({target: {checked, name, type, value}}) => (
    setChanges({...content, [name]: type === "checkbox" ? checked : value})
  );
  const onDateChange = () => {}; // TODO: Date
  const onFileChange = (e) => {
    const file = e.target.files[0];

    setChanges({...content, value: file && URL.createObjectURL(file)});
  };

  switch(content.kind) {
    case "Boolean":
      return (
        <div className="custom-control custom-switch text-center mb-3">
          <input
            checked={content.value || false}
            className="custom-control-input"
            id={id}
            name="value"
            onChange={onChange}
            type="checkbox"
          />
          <label className="custom-control-label" htmlFor={id}>{content.name}</label>
        </div>
      );
    case "Date":
      return (
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <label className="input-group-text" htmlFor={id}>{content.name}</label>
          </div>
          <input
            className="form-control"
            id={id}
            name="value"
            onChange={onDateChange}
            type="datetime-local"
            value={content.value || ""}
          />
        </div>
      );
    case "File":
      return (
        <>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <label className="input-group-text" htmlFor={id}>{content.name}</label>
            </div>
            <FileInput id={id} name={content.id} onChange={onFileChange} />
          </div>
          {content.value && (
            <div>
              <img alt="Content" className="img-fluid mb-3" src={content.value} />
            </div>
          )}
        </>
      );
    case "HTML":
      return (
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <label className="input-group-text" htmlFor={`${id}-disabled`}>{content.name}</label>
          </div>
          <textarea
            className="form-control"
            disabled={true}
            id={`${id}-disabled`}
            name="value-disabled"
            placeholder="Preview"
            rows={4}
            value={text}
          />
          <div className="input-group-append">
            <button className="btn btn-secondary" onClick={() => setEditText(!editText)} type="button">{editText ? "Hide" : "Edit"}</button>
          </div>
          <ActionText.Editor
            className={`mt-3 w-100 ${editText ? "" : "d-none"}`}
            id={id}
            name="value"
            onChange={onChange}
            onTextChange={setText}
            value={content.value || ""}
          />
        </div>
      );
    default:
      return (
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <label className="input-group-text" htmlFor={id}>{content.name}</label>
          </div>
          <input
            className="form-control"
            id={id}
            name="value"
            onChange={onChange}
            placeholder={content.name}
            required={true}
            type="text"
            value={content.value || ""}
          />
        </div>
      );
  }
}

AdminSectionsContent.propTypes = {
  content: PropTypes.shape({
    kind: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.any // eslint-disable-line react/forbid-prop-types
  }).isRequired,
  onChange: PropTypes.func.isRequired
};

export default AdminSectionsContent;
