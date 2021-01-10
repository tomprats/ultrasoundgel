/* eslint-disable prefer-arrow-callback, react/no-danger, react/prop-types */
import {forwardRef} from "react";

export default forwardRef(
  function DangerousHTML({html, ...props}, ref) {
    return (
      <div dangerouslySetInnerHTML={{__html: html}} ref={ref} {...props} />
    );
  }
);
