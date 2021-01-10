import PropTypes from "prop-types";
import {useEffect, useState} from "react";
import {getDirectUploadUrl} from "lib/active-storage";

function FileInput({onChange, ...props}) {
  const [directUploadUrl, setDirectUploadUrl] = useState(null);
  const [fileName, setFileName] = useState(null);
  const onFileChange = (e) => {
    const file = e.target.files[0];

    setFileName(file && file.name);
    onChange && onChange(e);
  };

  useEffect(() => setDirectUploadUrl(getDirectUploadUrl()), []);

  return (
    <div className="custom-file">
      <input
        className="custom-file-input"
        data-direct-upload-url={directUploadUrl}
        type="file"
        {...props}
        onChange={onFileChange}
      />
      <label className="custom-file-label" htmlFor="file">{fileName || "Choose file"}</label>
    </div>
  );
}

FileInput.defaultProps = {onChange: null};
FileInput.propTypes = {onChange: PropTypes.func};

export default FileInput;
