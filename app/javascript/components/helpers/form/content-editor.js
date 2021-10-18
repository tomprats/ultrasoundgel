import PropTypes from "prop-types";
import {useState} from "react";
import Content from "components/helpers/action-text/content";
import Editor from "components/helpers/action-text/editor";

function ContentEditor({id, label, name, onChange, value}) {
  const [content, setContent] = useState(value);
  const [editContent, setEditContent] = useState(false);
  const [preview, setPreview] = useState(false);

  return (
    <div className="content-editor">
      <div className="input-group">
        <div className="input-group-prepend">
          <label className="input-group-text" htmlFor={`${id}-disabled`}>{label}</label>
        </div>
        <textarea
          className="form-control"
          disabled={true}
          id={`${id}-disabled`}
          name={`${name}-disabled`}
          placeholder="Preview"
          rows={4}
          value={content}
        />
        <div className="input-group-append">
          <button className="btn btn-primary" onClick={() => setPreview(!preview)} type="button">{preview ? "Hide Preview" : "Preview"}</button>
        </div>
        <div className="input-group-append">
          <button className="btn btn-secondary" onClick={() => setEditContent(!editContent)} type="button">{editContent ? "Hide" : "Edit"}</button>
        </div>
      </div>
      {preview && (
        <div className="custom-html mt-3">
          <Content html={value} />
        </div>
      )}
      <Editor
        className={editContent ? "mt-3" : "d-none"}
        id={id}
        name={name}
        onChange={onChange}
        onTextChange={setContent}
        value={value}
      />
    </div>
  );
}

ContentEditor.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired
};

export default ContentEditor;
