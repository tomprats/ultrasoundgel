import PropTypes from "prop-types";
import {useEffect, useRef, useState} from "react";

const inputSelector = "input[type=file][data-direct-upload-url]";

function FormWithFiles({children, onSubmit: submit}) {
  const form = useRef(null);
  const [files, setFiles] = useState(null);
  const onSubmit = (e) => {
    e.preventDefault();

    const fileCount = files ? Object.keys(files).length : 0;
    const inputs = [...form.current.querySelectorAll(inputSelector)]
      .filter((input) => input.files.length);

    if(fileCount === inputs.length) { submit(files || {}); }
  };

  useEffect(() => { files && submit(files); }, [files]);
  useEffect(() => {
    const uploadEnd = () => {
      const data = {};

      [...form.current.querySelectorAll(inputSelector)]
        .filter((input) => input.files.length)
        .map((input) => input.parentElement.querySelector("[type=hidden]"))
        .forEach((input) => { data[input.name] = input.value; });

      setFiles(data);
    };

    form.current.addEventListener("direct-uploads:end", uploadEnd);

    return () => {
      form.current.removeEventListener("direct-uploads:end", uploadEnd);
    };
  }, []);

  return (
    <form onSubmit={onSubmit} ref={form}>
      {children}
    </form>
  );
}

FormWithFiles.propTypes = {
  children: PropTypes.node.isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default FormWithFiles;
