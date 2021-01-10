import moment from "moment";
import {useContext, useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import {Context} from "app";
import {createNotification} from "app/actions/notifications";
import {getAll as getChannels} from "app/requests/admin/channels";
import {create as createEpisode} from "app/requests/admin/episodes";
import {ActionText, FileInput, FormWithFiles} from "components/helpers";
import {withoutBlankValues} from "lib/object";

export default function AdminEpisodesNew() {
  const dispatch = useContext(Context)[1];
  const history = useHistory();
  const [channels, setChannels] = useState([]);
  const [episode, setEpisode] = useState({
    author: "",
    description: "",
    explicit: false,
    subtitle: "",
    title: "",
    tweet: false,
    tweet_text: ""
  });
  const [descriptionText, setDescriptionText] = useState("");
  const [editDescription, setEditDescription] = useState(false);
  const onChange = ({target: {checked, name, type, value}}) => (
    setEpisode({...episode, [name]: type === "checkbox" ? checked : value})
  );
  const onDateChange = ({target: {name, value}}) => (
    setEpisode({...episode, [name]: value ? moment(value).format() : value})
  );
  const onFileChange = (e) => {
    const file = e.target.files[0];

    setEpisode({...episode, [e.target.name]: file && file.name});
  };
  const onSubmit = (files) => {
    createEpisode({episode: withoutBlankValues({...episode, ...files})}).then((data) => {
      if(data.success) {
        history.push("/admin/episodes", {message: data.message, type: "success"});
      } else {
        dispatch(createNotification({content: data.message, type: "danger"}));
      }
    });
  };

  useEffect(() => {
    getChannels().then((data) => setChannels(data.channels));
  }, []);

  useEffect(() => {
    if(channels.length > 0) { setEpisode({...episode, channel_id: channels[0].id}); }
  }, [channels]);

  let publishedAt = episode.published_at || "";
  if(publishedAt) {
    publishedAt = moment(episode.published_at).format(moment.HTML5_FMT.DATETIME_LOCAL);
  }

  return (
    <div className="container-fluid">
      <h1 className="text-center">New Episode</h1>
      <FormWithFiles onSubmit={onSubmit}>
        <div className="row">
          <div className="col-md-4 offset-md-4">
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <label className="input-group-text" htmlFor="episode-audio">Audio</label>
              </div>
              <FileInput
                id="episode-audio"
                name="audio"
                onChange={onFileChange}
              />
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
                placeholder="Resa E Lewiss"
                required={true}
                type="text"
                value={episode.author}
              />
            </div>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <label className="input-group-text" htmlFor="episode-channel-id">Channel</label>
              </div>
              <select
                className="custom-select"
                id="episode-channel-id"
                name="channel_id"
                onChange={onChange}
                required={true}
                value={episode.channel_id}
              >
                {channels.map((channel) => (
                  <option key={channel.id} value={channel.id}>{channel.title}</option>
                ))}
              </select>
            </div>
            <div className="input-group">
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
              id="episode-description"
              name="description"
              onChange={onChange}
              onTextChange={setDescriptionText}
              placeholder="This description can include formatting and links that will be stripped out for lesser podcast apps"
              value={episode.description}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-4 offset-md-4">
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <label className="input-group-text" htmlFor="episode-published-at">Publish Date</label>
              </div>
              <input
                className="form-control"
                id="episode-published-at"
                name="published_at"
                onChange={onDateChange}
                type="datetime-local"
                value={publishedAt}
              />
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
                placeholder="Witty and Insightful"
                required={true}
                type="text"
                value={episode.subtitle}
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
                placeholder="The Visible Voices"
                required={true}
                type="text"
                value={episode.title}
              />
            </div>
            <div className="custom-control custom-switch text-center mb-3">
              <input
                checked={episode.tweet}
                className="custom-control-input"
                id="episode-tweet"
                name="tweet"
                onChange={onChange}
                type="checkbox"
              />
              <label className="custom-control-label" htmlFor="episode-tweet">Tweet?</label>
            </div>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <label className="input-group-text" htmlFor="episode-tweet-text">Tweet Text</label>
              </div>
              <textarea
                className="form-control"
                id="episode-tweet-text"
                maxLength="250"
                name="tweet_text"
                onChange={onChange}
                placeholder="Tweet Tweet"
                rows={4}
                value={episode.tweet_text}
              />
            </div>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <label className="input-group-text" htmlFor="episode-image">Image</label>
              </div>
              <FileInput
                id="episode-image"
                name="image"
                onChange={onFileChange}
              />
            </div>
            <div className="custom-control custom-switch text-center mb-3">
              <input
                checked={episode.explicit}
                className="custom-control-input"
                id="episode-explicit"
                name="explicit"
                onChange={onChange}
                type="checkbox"
              />
              <label className="custom-control-label" htmlFor="episode-explicit">Explicit</label>
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
