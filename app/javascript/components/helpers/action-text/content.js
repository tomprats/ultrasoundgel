import PropTypes from "prop-types";
import {useEffect, useRef} from "react";
import truncate from "trunc-html";
import DangerousHTML from "components/helpers/dangerous-html";

function ActionTextContent({html: _html, truncate: truncateOptions, ...props}) {
  const content = useRef(null);
  const html = truncateOptions ? truncate(_html, 120).html : _html;

  useEffect(() => {
    content.current.querySelectorAll("a").forEach((a) => {
      if(a.host !== window.location.host) {
        a.setAttribute("target", "_blank");
      }
    });
  }, [html]);

  return (
    <>
      <DangerousHTML html={html} ref={content} {...props} />
      {truncateOptions && (
        <a className="d-block font-weight-bold mt-3 small text-uppercase" href={truncateOptions.url}>Read More</a>
      )}
    </>
  );
}

ActionTextContent.defaultProps = {truncate: null};
ActionTextContent.propTypes = {
  html: PropTypes.string.isRequired,
  truncate: PropTypes.shape({url: PropTypes.string.isRequired})
};

export default ActionTextContent;
