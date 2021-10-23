import PropTypes from "prop-types";
import ContentEditor from "components/helpers/form/content-editor";
import File from "components/helpers/form/file";
import {valueFromTarget} from "lib/form";

// TODO: Submitting date
// TODO: Showing non-image files
function AdminSectionsContent({content, onChange: setChanges}) {
  const id = `content-value-${content.id}`;
  const onChange = ({target}) => (
    setChanges({...content, value: valueFromTarget(target)})
  );
  const onDateChange = () => {};

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
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <label className="input-group-text" htmlFor={id}>{content.name}</label>
          </div>
          <File id={id} name={content.id} onChange={onChange} />
          {content.value && <img alt="Preview" className="img-fluid" src={content.value} />}
        </div>
      );
    case "HTML":
      return (
        <div className="mb-3">
          <label htmlFor={`${id}-disabled`}>{content.name}</label>
          <ContentEditor
            id={id}
            label="Value"
            name="value"
            onChange={onChange}
            value={content.value}
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
