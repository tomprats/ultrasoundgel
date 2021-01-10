import PropTypes from "prop-types";

function Check({checked}) {
  const icon = checked ? "check-square" : "square";

  return <i className={`fa fa-${icon}`} />;
}

Check.propTypes = {
  checked: PropTypes.bool.isRequired
};

export default Check;
