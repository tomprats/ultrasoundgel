import PropTypes from "prop-types";
import {ActionText} from "components/helpers";

function Default({page}) {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <div className="custom-html text-center">
            <ActionText.Content html={page.content} />
          </div>
        </div>
      </div>
    </div>
  );
}

Default.propTypes = {
  page: PropTypes.shape({
    content: PropTypes.string.isRequired
  }).isRequired
};

export default Default;
