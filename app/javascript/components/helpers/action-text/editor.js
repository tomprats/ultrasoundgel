import PropTypes from "prop-types";
import {useEffect, useRef, useState} from "react";
import {getBlobUrlTemplate, getDirectUploadUrl} from "lib/active-storage";

function ActionTextEditor({
  className,
  id,
  name,
  onChange,
  onPreviewChange,
  onTextChange,
  placeholder,
  value
}) {
  const editor = useRef(null);
  const [blobUrlTemplate, setBlobUrlTemplate] = useState(null);
  const [directUploadUrl, setDirectUploadUrl] = useState(null);
  const setNewValue = (newValue) => {
    if(newValue !== null) { onChange({target: {name, value: newValue}}); }
  };
  const setPreview = (preview) => onPreviewChange && onPreviewChange(preview);
  const setText = (text) => onTextChange && onTextChange(text);

  useEffect(() => {
    setBlobUrlTemplate(getBlobUrlTemplate());
    setDirectUploadUrl(getDirectUploadUrl());
  }, []);

  useEffect(() => {
    const updateContent = ({target}) => { setNewValue(target.value); };

    editor.current.addEventListener("trix-change", updateContent);
  }, []);

  useEffect(() => {
    const updateContent = ({target}) => { setPreview(target.value); };

    editor.current.addEventListener("trix-change", updateContent);
  }, []);

  useEffect(() => {
    const updateContent = () => { setText(editor.current.editor.getDocument().toString().trim()); };

    editor.current.addEventListener("trix-change", updateContent);
  }, []);

  useEffect(() => {
    setPreview(editor.current.editor.element.value);
  }, []);

  useEffect(() => {
    setText(editor.current.editor.getDocument().toString().trim());
  }, []);

  return (
    <div className={className}>
      <input id={id} name={name} type="hidden" value={value} />
      <trix-editor
        class="trix-content"
        data-direct-upload-url={directUploadUrl}
        data-blob-url-template={blobUrlTemplate}
        input={id}
        placeholder={placeholder}
        ref={editor}
      />
    </div>
  );
}

ActionTextEditor.defaultProps = {
  className: null,
  onPreviewChange: null,
  onTextChange: null,
  placeholder: null
};
ActionTextEditor.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onPreviewChange: PropTypes.func,
  onTextChange: PropTypes.func,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired
};

export default ActionTextEditor;
