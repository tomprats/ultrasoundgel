import PropTypes from "prop-types";
import {useState} from "react";
import {ActionText, FileInput, FormWithFiles} from "components/helpers";

const guidelines = [
  "For where these fields are displayed and",
  "what they represent, view the guidelines"
].join(" ");

function AdminChannelsForm({onChange, onSubmit, value}) {
  const [description, setDescription] = useState(value("description"));
  const [editDescription, setEditDescription] = useState(false);
  const [image, setImage] = useState(value("image"));
  const onImageChange = (e) => {
    const file = e.target.files[0];

    onChange({target: {name: e.target.name, value: file && file.name}});
    setImage(false);
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
              <label className="input-group-text" htmlFor="channel-author">Author</label>
            </div>
            <input
              className="form-control"
              id="channel-author"
              name="author"
              onChange={onChange}
              placeholder="Kevin Bacon"
              required={true}
              type="text"
              value={value("author")}
            />
          </div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <label className="input-group-text" htmlFor="channel-categories">Categories</label>
            </div>
            <input
              className="form-control"
              id="channel-categories"
              name="categories"
              onChange={onChange}
              placeholder="Tomify, Best Developer, Tired"
              required={true}
              type="text"
              value={value("categories")}
            />
          </div>
          <small className="form-text text-muted mb-3">
            <span>For a list of categories, read the examples </span>
            <a href="https://help.apple.com/itc/podcasts_connect/#/itc9267a2f12" rel="noreferrer" target="_blank">here</a>
          </small>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <label className="input-group-text" htmlFor="channel-description-disabled">Description</label>
            </div>
            <textarea
              className="form-control"
              disabled={true}
              id="channel-description-disabled"
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
              id="channel-description"
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
              id="channel-explicit"
              name="explicit"
              onChange={onChange}
              type="checkbox"
            />
            <label className="custom-control-label" htmlFor="channel-explicit">Explicit</label>
          </div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <label className="input-group-text" htmlFor="channel-image">Image</label>
            </div>
            <FileInput accept=".jpg,.jpeg,.png" id="channel-image" name="image" onChange={onImageChange} />
          </div>
          {image && <img alt="Channel" className="img-fluid mb-3" src={image} />}
          {value("published_at") && (
            <>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <label className="input-group-text" htmlFor="channel-itunes-link">iTunes Link</label>
                </div>
                <input
                  className="form-control"
                  id="channel-itunes-link"
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
                  <label className="input-group-text" htmlFor="channel-google-link">Google Link</label>
                </div>
                <input
                  className="form-control"
                  id="channel-google-link"
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
              <label className="input-group-text" htmlFor="channel-link">Link</label>
            </div>
            <input
              className="form-control"
              id="channel-link"
              name="link"
              onChange={onChange}
              placeholder={window.location.origin}
              required={true}
              type="url"
              value={value("link")}
            />
          </div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <label className="input-group-text" htmlFor="channel-owern-email">Owner Email</label>
            </div>
            <input
              className="form-control"
              id="channel-owner-email"
              name="owner_email"
              onChange={onChange}
              placeholder="chris@farley.com"
              required={true}
              type="text"
              value={value("owner_email")}
            />
          </div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <label className="input-group-text" htmlFor="channel-owern-name">Owner Name</label>
            </div>
            <input
              className="form-control"
              id="channel-owner-name"
              name="owner_name"
              onChange={onChange}
              placeholder="Chris Farley"
              required={true}
              type="text"
              value={value("owner_name")}
            />
          </div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <label className="input-group-text" htmlFor="channel-subtitle">Subtitle</label>
            </div>
            <input
              className="form-control"
              id="channel-subtitle"
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
              <label className="input-group-text" htmlFor="channel-title">Title</label>
            </div>
            <input
              className="form-control"
              id="channel-title"
              name="title"
              onChange={onChange}
              placeholder="Ultra Sound of Music"
              required={true}
              type="text"
              value={value("title")}
            />
          </div>
          <small className="form-text text-muted mb-3">This will not yet publish your channel</small>
          <div className="form-group text-center">
            <button type="submit" className="btn btn-primary">Submit</button>
          </div>
        </div>
      </div>
    </FormWithFiles>
  );
}

AdminChannelsForm.propTypes = {
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  value: PropTypes.func.isRequired
};

export default AdminChannelsForm;
