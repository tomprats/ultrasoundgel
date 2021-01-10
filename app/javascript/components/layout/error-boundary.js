import PropTypes from "prop-types";
import {Component} from "react";

export default class ErrorBoundary extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired
  }
  constructor(props) {
    super(props);
    this.state = {error: null};
  }
  static getDerivedStateFromError(error) {
    return {error: `${error.name}: ${error.message}`};
  }
  componentDidCatch(error, errorInfo) {
    console.log(error, errorInfo); // eslint-disable-line no-console
  }
  render() {
    if(!this.state.error) { return this.props.children; }

    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-4 offset-md-4 text-center">
            <h1>There was a problem</h1>
            <p>Please reload the page and try again. If the problem persists, please email <a href="mailto:tom@tomify.me">tom@tomify.me</a> with the following information.</p>
            <p>Error: {this.state.error}</p>
            <p>Page: {window.location.href}</p>
          </div>
        </div>
      </div>
    );
  }
}
