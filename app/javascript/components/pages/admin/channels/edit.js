import moment from "moment";
import {useContext, useEffect, useState} from "react";
import {useHistory, useParams} from "react-router-dom";
import {Context} from "app";
import {createNotification} from "app/actions/notifications";
import {get as getChannel, update as updateChannel} from "app/requests/admin/channels";
import {ActionText, FileInput, FormWithFiles} from "components/helpers";
import {Loading} from "components/pages";

export default function AdminChannelsEdit() {
  const dispatch = useContext(Context)[1];
  const history = useHistory();
  const {id} = useParams();
  const [changes, setChanges] = useState({});
  const [channel, setChannel] = useState(null);
  const [descriptionText, setDescriptionText] = useState("");
  const [editDescription, setEditDescription] = useState(false);
  const [googleCategoriesText, setGoogleCategoriesText] = useState("");
  const [itunesCategoriesText, setItunesCategoriesText] = useState("");
  const onCategoriesChange = ({target: {name, value}}) => {
    const categories = value.split(",").map((category) => category.trim()).filter((category) => category);
    const setText = name === "google_categories" ? setGoogleCategoriesText : setItunesCategoriesText;

    setText(value);
    setChanges({...changes, [name]: categories});
  };
  const onChange = ({target: {checked, name, type, value}}) => (
    setChanges({...changes, [name]: type === "checkbox" ? checked : value})
  );
  const onDateChange = ({target: {name, value}}) => (
    setChanges({...changes, [name]: value ? moment(value).format() : ""})
  );
  const onImageChange = (e) => {
    const file = e.target.files[0];

    setChanges({...changes, image: file && file.name});
  };
  const onSubmit = (files) => {
    const updates = {...changes, ...files};

    if(Object.keys(updates).length === 0) {
      return dispatch(createNotification({
        content: "Please make changes before submitting",
        type: "danger"
      }));
    }

    updateChannel(channel.id, {channel: updates}).then((data) => {
      if(data.success) {
        history.push("/admin/channels", {message: data.message, type: "success"});
      } else {
        dispatch(createNotification({content: data.message, type: "danger"}));
      }
    });
  };
  const value = (name) => (
    changes[name] === undefined ? channel[name] : changes[name]
  );

  useEffect(() => {
    getChannel(id).then((data) => {
      setChannel(data.channel);
      setGoogleCategoriesText(data.channel.google_categories.join(", "));
      setItunesCategoriesText(data.channel.itunes_categories.join(", "));
    });
  }, []);

  if(!channel) { return <Loading />; }

  let publishedAt = value("published_at");
  if(publishedAt) {
    publishedAt = moment(publishedAt).format(moment.HTML5_FMT.DATETIME_LOCAL);
  }

  return (
    <div className="container-fluid">
      <FormWithFiles onSubmit={onSubmit}>
        <div className="row">
          <div className="col-md-4 offset-md-4">
            <h1 className="text-center">Edit Channel</h1>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <label className="input-group-text" htmlFor="channel-author">Author</label>
              </div>
              <input
                className="form-control"
                id="channel-author"
                name="author"
                onChange={onChange}
                placeholder="Resa E Lewiss"
                required={true}
                type="text"
                value={value("author") || ""}
              />
            </div>
            <div className="input-group">
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
                value={descriptionText}
              />
              <div className="input-group-append">
                <button className="btn btn-secondary" onClick={() => setEditDescription(!editDescription)} type="button">{editDescription ? "Hide" : "Edit"}</button>
              </div>
            </div>
            <small className="form-text text-muted mb-3">
              The plain text version of the description (displayed above)
              will be used in places podcast apps and websites don't support html
            </small>
          </div>
        </div>
        <div className={editDescription ? "row" : "d-none"}>
          <div className="col-md-10 offset-md-1">
            <ActionText.Editor
              className="mb-3 w-100"
              id="channel-description"
              name="description"
              onChange={onChange}
              onTextChange={setDescriptionText}
              placeholder="This description can include formatting and links that will be stripped out for lesser podcast apps"
              value={value("description") || ""}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-4 offset-md-4">
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <label className="input-group-text" htmlFor="channel-google-categories">Google Categories</label>
              </div>
              <input
                className="form-control"
                id="channel-google-categories"
                name="google_categories"
                onChange={onCategoriesChange}
                placeholder="Education, Health, Science & Medicine, Society & Culture"
                required={true}
                type="text"
                value={googleCategoriesText}
              />
            </div>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <label className="input-group-text" htmlFor="channel-google-link">Google Link</label>
              </div>
              <input
                className="form-control"
                id="channel-google-link"
                name="google_link"
                onChange={onChange}
                placeholder="Link to Channel in Google"
                type="url"
                value={value("google_link") || ""}
              />
            </div>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <label className="input-group-text" htmlFor="channel-itunes-categories">iTunes Categories</label>
              </div>
              <input
                className="form-control"
                id="channel-itunes-categories"
                name="itunes_categories"
                onChange={onCategoriesChange}
                placeholder="Health & Fitness: Medicine"
                required={true}
                type="text"
                value={itunesCategoriesText}
              />
            </div>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <label className="input-group-text" htmlFor="channel-itunes-link">iTunes Link</label>
              </div>
              <input
                className="form-control"
                id="channel-itunes-link"
                name="itunes_link"
                onChange={onChange}
                placeholder="Link to Channel in iTunes"
                type="url"
                value={value("itunes_link") || ""}
              />
            </div>
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
                value={value("link") || ""}
              />
            </div>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <label className="input-group-text" htmlFor="channel-owner-email">Owner Email</label>
              </div>
              <input
                className="form-control"
                id="channel-owner-email"
                name="owner_email"
                onChange={onChange}
                placeholder="resa@thevisiblevoicespodcast.com"
                required={true}
                type="email"
                value={value("owner_email") || ""}
              />
            </div>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <label className="input-group-text" htmlFor="channel-owner-name">Owner Name</label>
              </div>
              <input
                className="form-control"
                id="channel-owner-name"
                name="owner_name"
                onChange={onChange}
                placeholder="Resa E Lewiss"
                required={true}
                type="text"
                value={value("owner_name") || ""}
              />
            </div>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <label className="input-group-text" htmlFor="channel-published-at">Publish Date</label>
              </div>
              <input
                className="form-control"
                id="channel-published-at"
                name="published_at"
                onChange={onDateChange}
                type="datetime-local"
                value={publishedAt || ""}
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
                placeholder="Witty and Insightful"
                required={true}
                type="text"
                value={value("subtitle") || ""}
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
                placeholder="The Visible Voices"
                required={true}
                type="text"
                value={value("title") || ""}
              />
            </div>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <label className="input-group-text" htmlFor="channel-image">Image</label>
              </div>
              <FileInput id="channel-image" name="image" onChange={onImageChange} />
            </div>
            {!changes.image && channel.image && (
              <img alt="Channel" className="img-fluid mb-3" src={channel.image} />
            )}
            <div className="custom-control custom-switch text-center mb-3">
              <input
                checked={value("explicit") || false}
                className="custom-control-input"
                id="channel-explicit"
                name="explicit"
                onChange={onChange}
                type="checkbox"
              />
              <label className="custom-control-label" htmlFor="channel-explicit">Explicit</label>
            </div>
            <div className="form-group text-center">
              <button type="submit" className="btn btn-primary">Submit</button>
            </div>
          </div>
        </div>
      </FormWithFiles>
    </div>
  );
}
