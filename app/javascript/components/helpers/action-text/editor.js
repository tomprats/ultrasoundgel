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
  const changeHandler = useRef(onChange);
  const editor = useRef(null);
  const previewHandler = useRef(onPreviewChange);
  const textHandler = useRef(onTextChange);
  const [blobUrlTemplate, setBlobUrlTemplate] = useState(null);
  const [directUploadUrl, setDirectUploadUrl] = useState(null);

  useEffect(() => {
    changeHandler.current = onChange;
    previewHandler.current = onPreviewChange;
    textHandler.current = onTextChange;
  });

  const setNewValue = (newValue) => {
    if(newValue !== null) { changeHandler.current({target: {name, value: newValue}}); }
  };
  const setPreview = (preview) => previewHandler.current && previewHandler.current(preview);
  const setText = (text) => textHandler.current && textHandler.current(text);

  useEffect(() => {
    setBlobUrlTemplate(getBlobUrlTemplate());
    setDirectUploadUrl(getDirectUploadUrl());
  }, []);

  useEffect(() => {
    const updateContent = ({target}) => {
      setNewValue(target.value);
      setPreview(target.value);
      setText(editor.current.editor.getDocument().toString().trim());
    };

    editor.current.addEventListener("trix-change", updateContent);
  }, []);

  useEffect(() => {
    setPreview(editor.current.editor.element.value);
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
