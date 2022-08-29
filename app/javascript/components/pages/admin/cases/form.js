import PropTypes from "prop-types";
import ContentEditor from "components/helpers/form/content-editor";
import {useContent} from "lib/hooks";

function AdminCasesForm({onChange, onSubmit, value}) {
  const allPublicTags = useContent("General", "Public Tags").split(", ");
  const publicTags = value("public_tags") || [];
  const onTagChange = (tag, {target: {checked, name}}) => {
    const tags = checked ? [...publicTags, tag] : publicTags.filter((t) => t !== tag);

    onChange({target: {name, value: tags}});
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="row">
        <div className="col-md-4 offset-md-4">
          <div className="mb-3">
            <small className="form-text text-muted mb-3">
              The plain text version of the content (displayed above)
              will be used in places podcast apps and websites don't support html
            </small>
            <ContentEditor
              id="record-content"
              label="Content"
              name="content"
              onChange={onChange}
              value={value("content")}
            />
          </div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <label className="input-group-text" htmlFor="record-public-tags">Public Tags</label>
            </div>
            <div className="form-control h-auto">
              {allPublicTags.map((tag, index) => (
                <div key={tag} className="custom-control custom-switch">
                  <input
                    checked={publicTags.includes(tag)}
                    className="custom-control-input"
                    id={`record-public-tags-${index}`}
                    name="public_tags"
                    onChange={onTagChange.bind(null, tag)}
                    type="checkbox"
                  />
                  <label className="custom-control-label" htmlFor={`record-public-tags-${index}`}>{tag}</label>
                </div>
              ))}
            </div>
          </div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <label className="input-group-text" htmlFor="record-tags">Tags</label>
            </div>
            <input
              className="form-control"
              id="record-tags"
              name="tags"
              onChange={onChange}
              placeholder="Tomify, Best Developer, Tired"
              type="text"
              value={value("tags")}
            />
          </div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <label className="input-group-text" htmlFor="record-title">Title</label>
            </div>
            <input
              className="form-control"
              id="record-title"
              name="title"
              onChange={onChange}
              placeholder="Ultra Sound of Music"
              required={true}
              type="text"
              value={value("title")}
            />
          </div>
          <small className="form-text text-muted mb-3">This will not yet publish your case</small>
          <div className="form-group text-center">
            <button type="submit" className="btn btn-primary">Submit</button>
          </div>
        </div>
      </div>
    </form>
  );
}

AdminCasesForm.propTypes = {
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  value: PropTypes.func.isRequired
};

export default AdminCasesForm;
