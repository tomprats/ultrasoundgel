import PropTypes from "prop-types";
import {useState} from "react";
import {ActionText, FileInput, FormWithFiles} from "components/helpers";

const guidelines = [
  "For where these fields are displayed and",
  "what they represent, view the guidelines"
].join(" ");

function AdminEpisodesForm({channels, onChange, onSubmit, value}) {
  const [audio, setAudio] = useState(value("audio"));
  const [description, setDescription] = useState(value("description"));
  const [editDescription, setEditDescription] = useState(false);
  const [image, setImage] = useState(value("image"));
  const onFileChange = (e) => {
    const file = e.target.files[0];

    onChange({target: {name: e.target.name, value: file && file.name}});
    e.target.name === "audio" ? setAudio(false) : setImage(false);
  };

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
            <FileInput accept=".mp3,.mpeg" id="episode-audio" name="audio" onChange={onFileChange} />
          </div>
          {audio && <audio className="mb-3 text-center" controls={true} src={audio} />}
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
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <label className="input-group-text" htmlFor="episode-description-disabled">Description</label>
            </div>
            <textarea
              className="form-control"
              disabled={true}
              id="episode-description-disabled"
              name="description-disabled"
              placeholder="This description can include formatting and links"
              rows={4}
              value={description}
            />
            <div className="input-group-append">
              <button className="btn btn-secondary" onClick={() => setEditDescription(!editDescription)} type="button">{editDescription ? "Hide" : "Edit"}</button>
            </div>
            <small className="form-text text-muted mb-3">
              The plain text version of the description (displayed above)
              will be used in places podcast apps and websites don't support html
            </small>
            <ActionText.Editor
              className={`mt-3 w-100 ${editDescription ? "" : "d-none"}`}
              id="episode-description"
              name="description"
              onChange={onChange}
              onTextChange={setDescription}
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
            <FileInput accept=".jpg,.jpeg,.png" id="episode-image" name="image" onChange={onFileChange} />
          </div>
          {image && <img alt="Episode" className="img-fluid mb-3" src={image} />}
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
