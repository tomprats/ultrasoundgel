import moment from "moment";
import {useContext, useEffect, useState} from "react";
import {useHistory, useParams} from "react-router-dom";
import {Context} from "app";
import {createNotification} from "app/actions/notifications";
import {get as getEpisode, update as updateEpisode} from "app/requests/admin/episodes";
import {ActionText, FileInput, FormWithFiles} from "components/helpers";
import {Loading} from "components/pages";

export default function AdminEpisodesEdit() {
  const dispatch = useContext(Context)[1];
  const history = useHistory();
  const {id} = useParams();
  const [changes, setChanges] = useState({});
  const [episode, setEpisode] = useState(null);
  const [descriptionText, setDescriptionText] = useState("");
  const [editDescription, setEditDescription] = useState(false);
  const onChange = ({target: {checked, name, type, value}}) => (
    setChanges({...changes, [name]: type === "checkbox" ? checked : value})
  );
  const onDateChange = ({target: {name, value}}) => (
    setChanges({...changes, [name]: value ? moment(value).format() : ""})
  );
  const onFileChange = (e) => {
    const file = e.target.files[0];

    setChanges({...changes, [e.target.name]: file && file.name});
  };
  const onSubmit = (files) => {
    const updates = {...changes, ...files};

    if(Object.keys(updates).length === 0) {
      return dispatch(createNotification({
        content: "Please make changes before submitting",
        type: "danger"
      }));
    }

    updateEpisode(episode.id, {episode: updates}).then((data) => {
      if(data.success) {
        history.push("/admin/episodes", {message: data.message, type: "success"});
      } else {
        dispatch(createNotification({content: data.message, type: "danger"}));
      }
    });
  };
  const value = (name) => (
    changes[name] === undefined ? episode[name] : changes[name]
  );

  useEffect(() => {
    getEpisode(id).then((data) => setEpisode(data.episode));
  }, []);

  if(!episode) { return <Loading />; }

  let publishedAt = value("published_at");
  if(publishedAt) {
    publishedAt = moment(publishedAt).format(moment.HTML5_FMT.DATETIME_LOCAL);
  }

  return (
    <div className="container-fluid">
      <FormWithFiles onSubmit={onSubmit}>
        <div className="row">
          <div className="col-md-4 offset-md-4">
            <h1 className="text-center">Edit Episode</h1>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <label className="input-group-text" htmlFor="episode-audio">Audio</label>
              </div>
              <FileInput id="episode-audio" name="audio" onChange={onFileChange} />
            </div>
            {!changes.audio && episode.audio && (
              <div className="input-group mb-3">
                <audio className="mx-auto" controls={true} src={episode.audio} type={episode.audio_type} />
              </div>
            )}
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
                value={value("author") || ""}
              />
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
              value={value("description") || ""}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-4 offset-md-4">
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <label className="input-group-text" htmlFor="episode-google-link">Google Link</label>
              </div>
              <input
                className="form-control"
                id="episode-google-link"
                name="google_link"
                onChange={onChange}
                placeholder="Link to Episode in Google"
                type="url"
                value={value("google_link") || ""}
              />
            </div>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <label className="input-group-text" htmlFor="episode-itunes-link">iTunes Link</label>
              </div>
              <input
                className="form-control"
                id="episode-itunes-link"
                name="itunes_link"
                onChange={onChange}
                placeholder="Link to Episode in iTunes"
                type="url"
                value={value("itunes_link") || ""}
              />
            </div>
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
                value={publishedAt || ""}
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
                value={value("subtitle") || ""}
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
                value={value("title") || ""}
              />
            </div>
            <div className="custom-control custom-switch text-center mb-3">
              <input
                checked={"tweet" in changes ? changes.tweet : episode.tweet}
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
                value={value("tweet_text") || ""}
              />
            </div>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <label className="input-group-text" htmlFor="episode-image">Image</label>
              </div>
              <FileInput id="episode-image" name="image" onChange={onFileChange} />
            </div>
            {!changes.image && episode.image && (
              <img alt="Episode" className="img-fluid mb-3" src={episode.image} />
            )}
            <div className="custom-control custom-switch text-center mb-3">
              <input
                checked={"explicit" in changes ? changes.explicit : episode.explicit}
                className="custom-control-input"
                id="episode-explicit"
                name="explicit"
                onChange={onChange}
                type="checkbox"
              />
              <label className="custom-control-label" htmlFor="episode-explicit">Explicit</label>
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
