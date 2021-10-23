import PropTypes from "prop-types";
import ContentEditor from "components/helpers/form/content-editor";
import {useContent} from "lib/hooks";

function AdminPostsForm({episodes, onChange, onSubmit, value}) {
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
          {!value("uid") && (
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <label className="input-group-text" htmlFor="post-episode-id">Episode</label>
              </div>
              <select
                className="form-control"
                id="post-episode-id"
                name="episode_id"
                onChange={onChange}
                required={true}
                value={value("episode_id")}
              >
                <option value="">Select Episode</option>
                {episodes.map(({id, title}) => (
                  <option key={id} value={id}>{title}</option>
                ))}
              </select>
            </div>
          )}
          <div className="mb-3">
            <small className="form-text text-muted mb-3">
              The plain text version of the content (displayed above)
              will be used in places podcast apps and websites don't support html
            </small>
            <ContentEditor
              id="post-content"
              label="Content"
              name="content"
              onChange={onChange}
              value={value("content")}
            />
          </div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <label className="input-group-text" htmlFor="post-public-tags">Public Tags</label>
            </div>
            <div className="form-control h-auto">
              {allPublicTags.map((tag, index) => (
                <div key={tag} className="custom-control custom-switch">
                  <input
                    checked={publicTags.includes(tag)}
                    className="custom-control-input"
                    id={`post-public-tags-${index}`}
                    name="public_tags"
                    onChange={onTagChange.bind(null, tag)}
                    type="checkbox"
                  />
                  <label className="custom-control-label" htmlFor={`post-public-tags-${index}`}>{tag}</label>
                </div>
              ))}
            </div>
          </div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <label className="input-group-text" htmlFor="post-tags">Tags</label>
            </div>
            <input
              className="form-control"
              id="post-tags"
              name="tags"
              onChange={onChange}
              placeholder="Tomify, Best Developer, Tired"
              type="text"
              value={value("tags")}
            />
          </div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <label className="input-group-text" htmlFor="post-title">Title</label>
            </div>
            <input
              className="form-control"
              id="post-title"
              name="title"
              onChange={onChange}
              placeholder="Ultra Sound of Music"
              required={true}
              type="text"
              value={value("title")}
            />
          </div>
          <small className="form-text text-muted mb-3">This will not yet publish your post</small>
          <div className="form-group text-center">
            <button type="submit" className="btn btn-primary">Submit</button>
          </div>
        </div>
      </div>
    </form>
  );
}

AdminPostsForm.defaultProps = {episodes: null};
AdminPostsForm.propTypes = {
  episodes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired
    }).isRequired
  ),
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  value: PropTypes.func.isRequired
};

export default AdminPostsForm;
