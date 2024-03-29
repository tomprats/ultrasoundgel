import PropTypes from "prop-types";
import ContentEditor from "components/helpers/form/content-editor";

const templates = ["articles", "contact", "default", "home", "store"];

function AdminPagesForm({onChange, onSubmit, value}) {
  return (
    <form onSubmit={onSubmit}>
      <div className="row">
        <div className="col-md-4 offset-md-4">
          <div className="custom-control custom-switch text-center mb-3">
            <input
              checked={value("active", false)}
              className="custom-control-input"
              id="page-active"
              name="active"
              onChange={onChange}
              type="checkbox"
            />
            <label className="custom-control-label" htmlFor="page-active">Active</label>
          </div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <label className="input-group-text" htmlFor="page-rank">Rank</label>
            </div>
            <input
              className="form-control"
              id="page-rank"
              name="rank"
              onChange={onChange}
              placeholder="100"
              required={true}
              type="text"
              value={value("rank")}
            />
          </div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <label className="input-group-text" htmlFor="page-template">Template</label>
            </div>
            <select
              className="form-control"
              id="page-template"
              name="template"
              onChange={onChange}
              required={true}
              value={value("template")}
            >
              {templates.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <label className="input-group-text" htmlFor="page-name">Name</label>
            </div>
            <input
              className="form-control"
              id="page-name"
              name="name"
              onChange={onChange}
              placeholder="Contact"
              required={true}
              type="text"
              value={value("name")}
            />
          </div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <label className="input-group-text" htmlFor="page-path">Path</label>
            </div>
            <input
              className="form-control"
              id="page-path"
              name="path"
              onChange={onChange}
              placeholder="contact"
              required={true}
              type="text"
              value={value("path")}
            />
          </div>
          <div className="mb-3">
            <ContentEditor
              id="page-content"
              label="Content"
              name="content"
              onChange={onChange}
              value={value("content")}
            />
          </div>
          <div className="form-group text-center">
            <button type="submit" className="btn btn-primary">Submit</button>
          </div>
        </div>
      </div>
    </form>
  );
}

AdminPagesForm.propTypes = {
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  value: PropTypes.func.isRequired
};

export default AdminPagesForm;
