import PropTypes from "prop-types";
import {useEffect, useState} from "react";
import {getDirectUploadUrl} from "lib/active-storage";

function File({id, onChange, ...props}) {
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
        id={id}
        type="file"
        {...props}
        onChange={onFileChange}
      />
      <label className="custom-file-label" htmlFor={id}>{fileName || "Choose file"}</label>
    </div>
  );
}

File.defaultProps = {onChange: null};
File.propTypes = {id: PropTypes.string.isRequired, onChange: PropTypes.func};

export default File;
