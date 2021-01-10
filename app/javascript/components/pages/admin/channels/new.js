import moment from "moment";
import {useContext, useState} from "react";
import {useHistory} from "react-router-dom";
import {Context} from "app";
import {createNotification} from "app/actions/notifications";
import {create as createChannel} from "app/requests/admin/channels";
import {ActionText, FileInput, FormWithFiles} from "components/helpers";
import {withoutBlankValues} from "lib/object";

export default function AdminChannelsNew() {
  const dispatch = useContext(Context)[1];
  const history = useHistory();
  const [channel, setChannel] = useState({
    author: "",
    description: "",
    explicit: false,
    google_categories: [],
    itunes_categories: [],
    link: "",
    owner_email: "",
    owner_name: "",
    subtitle: "",
    title: ""
  });
  const [descriptionText, setDescriptionText] = useState("");
  const [editDescription, setEditDescription] = useState(false);
  const [googleCategoriesText, setGoogleCategoriesText] = useState("");
  const [itunesCategoriesText, setItunesCategoriesText] = useState("");
  const onCategoriesChange = ({target: {name, value}}) => {
    const categories = value.split(",").map((category) => category.trim()).filter((category) => category);
    const setText = name === "google_categories" ? setGoogleCategoriesText : setItunesCategoriesText;

    setText(value);
    setChannel({...channel, [name]: categories});
  };
  const onChange = ({target: {checked, name, type, value}}) => (
    setChannel({...channel, [name]: type === "checkbox" ? checked : value})
  );
  const onDateChange = ({target: {name, value}}) => (
    setChannel({...channel, [name]: value ? moment(value).format() : value})
  );
  const onImageChange = (e) => {
    const file = e.target.files[0];

    setChannel({...channel, image: file && file.name});
  };
  const onSubmit = (files) => {
    createChannel({channel: withoutBlankValues({...channel, ...files})}).then((data) => {
      if(data.success) {
        history.push("/admin/channels", {message: data.message, type: "success"});
      } else {
        dispatch(createNotification({content: data.message, type: "danger"}));
      }
    });
  };

  let publishedAt = channel.published_at || "";
  if(publishedAt) {
    publishedAt = moment(channel.published_at).format(moment.HTML5_FMT.DATETIME_LOCAL);
  }

  return (
    <div className="container-fluid">
      <h1 className="text-center">New Channel</h1>
      <FormWithFiles onSubmit={onSubmit}>
        <div className="row">
          <div className="col-md-4 offset-md-4">
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
                value={channel.author}
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
              value={channel.description}
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
                value={channel.link}
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
                value={channel.owner_email}
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
                value={channel.owner_name}
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
                value={publishedAt}
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
                value={channel.subtitle}
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
                value={channel.title}
              />
            </div>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <label className="input-group-text" htmlFor="channel-image">Image</label>
              </div>
              <FileInput
                id="channel-image"
                name="image"
                onChange={onImageChange}
              />
            </div>
            <div className="custom-control custom-switch text-center mb-3">
              <input
                checked={channel.explicit}
                className="custom-control-input"
                id="channel-explicit"
                name="explicit"
                onChange={onChange}
                type="checkbox"
              />
              <label className="custom-control-label" htmlFor="channel-explicit">Explicit</label>
            </div>
          </div>
        </div>
        <div className="form-group text-center">
          <button type="submit" className="btn btn-primary">Submit</button>
        </div>
      </FormWithFiles>
    </div>
  );
}
