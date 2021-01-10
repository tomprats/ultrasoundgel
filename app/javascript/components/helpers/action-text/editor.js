import PropTypes from "prop-types";
import {useEffect, useRef, useState} from "react";
import {getBlobUrlTemplate, getDirectUploadUrl} from "lib/active-storage";

function ActionTextEditor({
  className,
  id,
  name,
  onChange,
  onTextChange,
  placeholder,
  value
}) {
  const editor = useRef(null);
  const [blobUrlTemplate, setBlobUrlTemplate] = useState(null);
  const [directUploadUrl, setDirectUploadUrl] = useState(null);
  const [newValue, setNewValue] = useState(null);
  const [text, setText] = useState(null);

  useEffect(() => {
    setBlobUrlTemplate(getBlobUrlTemplate());
    setDirectUploadUrl(getDirectUploadUrl());
  }, []);

  useEffect(() => {
    const updateValue = ({target}) => { setNewValue(target.value); };

    editor.current.addEventListener("trix-change", updateValue);

    return () => editor.current.removeEventListener("trix-change", updateValue);
  }, []);

  useEffect(() => {
    const updateText = () => setText(
      editor.current.editor.getDocument().toString().trim()
    );

    editor.current.addEventListener("trix-change", updateText);
    updateText();

    return () => editor.current.removeEventListener("trix-change", updateText);
  }, []);

  useEffect(() => {
    if(text !== null) { onTextChange && onTextChange(text || ""); }
  }, [text]);
  useEffect(() => {
    if(newValue !== null) { onChange({target: {name, value: newValue}}); }
  }, [newValue]);

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

ActionTextEditor.defaultProps = {className: null, onTextChange: null, placeholder: null};
ActionTextEditor.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onTextChange: PropTypes.func,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired
};

export default ActionTextEditor;
