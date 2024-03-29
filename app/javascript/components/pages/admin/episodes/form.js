import PropTypes from "prop-types";
import ContentEditor from "components/helpers/form/content-editor";
import File from "components/helpers/form/file";
import FormWithFiles from "components/helpers/form/with-files";

const guidelines = [
  "For where these fields are displayed and",
  "what they represent, view the guidelines"
].join(" ");

function AdminEpisodesForm({channels, onChange, onSubmit, value}) {
  return (
    <FormWithFiles onSubmit={onSubmit}>
      <div className="row">
        <div className="col-md-4 offset-md-4">
          <small className="form-text text-muted mb-3">
            <span>{guidelines} </span>
            <a href="https://help.apple.com/itc/podcasts_connect/#/itcb54353390" rel="noreferrer" target="_blank">here</a>
          </small>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <label className="input-group-text" htmlFor="episode-audio">Audio</label>
            </div>
            <File accept=".m4a,.mp3,.mpeg" id="episode-audio" name="audio" onChange={onChange} />
            {value("audio") && (
              <div className="input-group-append">
                <a className="btn btn-secondary" href={value("audio")} rel="noreferrer" target="_blank">Play</a>
              </div>
            )}
          </div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <label className="input-group-text" htmlFor="episode-author">Author</label>
            </div>
            <input
              className="form-control"
              id="episode-author"
              name="author"
              onChange={onChange}
              placeholder="Kevin Bacon"
              required={true}
              type="text"
              value={value("author")}
            />
          </div>
          {!value("uid") && (
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <label className="input-group-text" htmlFor="episode-channel-id">Channel</label>
              </div>
              <select
                className="form-control"
                id="episode-channel-id"
                name="channel_id"
                onChange={onChange}
                required={true}
                value={value("channel_id")}
              >
                <option value="">Select Channel</option>
                {channels.map(({id, title}) => (
                  <option key={id} value={id}>{title}</option>
                ))}
              </select>
            </div>
          )}
          <div className="mb-3">
            <small className="form-text text-muted mb-3">
              The plain text version of the description (displayed above)
              will be used in places podcast apps and websites don't support html
            </small>
            <ContentEditor
              id="episode-description"
              label="Description"
              name="description"
              onChange={onChange}
              value={value("description")}
            />
          </div>
          <div className="custom-control custom-switch text-center mb-3">
            <input
              checked={value("explicit", false)}
              className="custom-control-input"
              id="episode-explicit"
              name="explicit"
              onChange={onChange}
              type="checkbox"
            />
            <label className="custom-control-label" htmlFor="episode-explicit">Explicit</label>
          </div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <label className="input-group-text" htmlFor="episode-image">Image</label>
            </div>
            <File accept=".jpg,.jpeg,.png" id="episode-image" name="image" onChange={onChange} />
            {value("image") && <img alt="Episode" className="img-fluid" src={value("image")} />}
          </div>
          {value("published_at") && (
            <>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <label className="input-group-text" htmlFor="episode-itunes-link">iTunes Link</label>
                </div>
                <input
                  className="form-control"
                  id="episode-itunes-link"
                  name="itunes_link"
                  onChange={onChange}
                  placeholder="https://podcasts.apple.com/ultrasoundgel"
                  required={true}
                  type="url"
                  value={value("itunes_link")}
                />
              </div>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <label className="input-group-text" htmlFor="episode-google-link">Google Link</label>
                </div>
                <input
                  className="form-control"
                  id="episode-google-link"
                  name="goole_link"
                  onChange={onChange}
                  placeholder="https://podcasts.google.com/ultrasoundgel"
                  required={true}
                  type="url"
                  value={value("google_link")}
                />
              </div>
            </>
          )}
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <label className="input-group-text" htmlFor="episode-kind">Kind</label>
            </div>
            <select
              className="form-control"
              id="episode-kind"
              name="kind"
              onChange={onChange}
              required={true}
              value={value("kind")}
            >
              <option value="Full">Full</option>
              <option value="Trailer">Trailer</option>
              <option value="Bonus">None</option>
            </select>
          </div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <label className="input-group-text" htmlFor="episode-subtitle">Subtitle</label>
            </div>
            <input
              className="form-control"
              id="episode-subtitle"
              name="subtitle"
              onChange={onChange}
              placeholder="Visualize more than muscles"
              required={true}
              type="text"
              value={value("subtitle")}
            />
          </div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <label className="input-group-text" htmlFor="episode-title">Title</label>
            </div>
            <input
              className="form-control"
              id="episode-title"
              name="title"
              onChange={onChange}
              placeholder="Ultra Sound of Music"
              required={true}
              type="text"
              value={value("title")}
            />
          </div>
          <small className="form-text text-muted mb-3">This will not yet publish your episode</small>
          <div className="form-group text-center">
            <button type="submit" className="btn btn-primary">Submit</button>
          </div>
        </div>
      </div>
    </FormWithFiles>
  );
}

AdminEpisodesForm.defaultProps = {channels: null};
AdminEpisodesForm.propTypes = {
  channels: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired
    }).isRequired
  ),
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  value: PropTypes.func.isRequired
};

export default AdminEpisodesForm;
