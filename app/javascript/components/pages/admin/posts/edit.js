import moment from "moment";
import {useContext, useEffect, useState} from "react";
import {useHistory, useParams} from "react-router-dom";
import {Context} from "app";
import {createNotification} from "app/actions/notifications";
import {getAll as getEpisodes} from "app/requests/admin/episodes";
import {get as getPost, update as updatePost} from "app/requests/admin/posts";
import {ActionText} from "components/helpers";
import {Loading} from "components/pages";

export default function AdminPostsEdit() {
  const dispatch = useContext(Context)[1];
  const history = useHistory();
  const {id} = useParams();
  const [episodes, setEpisodes] = useState([]);
  const [changes, setChanges] = useState({});
  const [post, setPost] = useState(null);
  const [contentText, setContentText] = useState("");
  const [editContent, setEditContent] = useState(false);
  const [tagsText, setTagsText] = useState("");
  const onChange = ({target: {checked, name, type, value}}) => (
    setChanges({...changes, [name]: type === "checkbox" ? checked : value})
  );
  const onDateChange = ({target: {name, value}}) => (
    setChanges({...changes, [name]: value ? moment(value).format() : ""})
  );
  const onTagsChange = ({target: {value}}) => {
    const tags = value.split(",").map((tag) => tag.trim()).filter((tag) => tag);

    setTagsText(value);
    setChanges({...changes, tags});
  };
  const onSubmit = (e) => {
    e.preventDefault();

    if(Object.keys(changes).length === 0) {
      return dispatch(createNotification({
        content: "Please make changes before submitting",
        type: "danger"
      }));
    }

    updatePost(post.id, {post: changes}).then((data) => {
      if(data.success) {
        history.push("/admin/posts", {message: data.message, type: "success"});
      } else {
        dispatch(createNotification({content: data.message, type: "danger"}));
      }
    });
  };
  const value = (name) => (
    changes[name] === undefined ? post[name] : changes[name]
  );

  useEffect(() => {
    getPost(id).then((data) => {
      setPost(data.post);
      setTagsText(data.post.tags.join(", "));
    });
  }, []);

  useEffect(() => {
    getEpisodes().then((data) => setEpisodes(data.episodes));
  }, []);

  if(!post) { return <Loading />; }

  let publishedAt = changes.published_at === undefined ? post.published_at : changes.published_at;
  if(publishedAt) {
    publishedAt = moment(publishedAt).format(moment.HTML5_FMT.DATETIME_LOCAL);
  }

  return (
    <div className="container-fluid">
      <form onSubmit={onSubmit}>
        <div className="row">
          <div className="col-md-4 offset-md-4">
            <h1 className="text-center">Edit Post</h1>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <label className="input-group-text" htmlFor="post-author">Author</label>
              </div>
              <input
                className="form-control"
                id="post-author"
                name="author"
                onChange={onChange}
                placeholder="Resa E Lewiss"
                required={true}
                type="text"
                value={value("author") || ""}
              />
            </div>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <label className="input-group-text" htmlFor="post-content-disabled">Content</label>
              </div>
              <textarea
                className="form-control"
                disabled={true}
                id="post-content-disabled"
                name="content-disabled"
                placeholder="This content can include formatting and links"
                rows={4}
                value={contentText}
              />
              <div className="input-group-append">
                <button className="btn btn-secondary" onClick={() => setEditContent(!editContent)} type="button">{editContent ? "Hide" : "Edit"}</button>
              </div>
            </div>
          </div>
        </div>
        <div className={editContent ? "row" : "d-none"}>
          <div className="col-md-10 offset-md-1">
            <ActionText.Editor
              className="mb-3 w-100"
              id="post-content"
              name="content"
              onChange={onChange}
              onTextChange={setContentText}
              placeholder="This content can include formatting and links"
              value={value("content") || ""}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-4 offset-md-4">
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <label className="input-group-text" htmlFor="post-episode-id">Episode</label>
              </div>
              <select
                className="form-control"
                id="post-episode-id"
                name="episode_id"
                onChange={onChange}
                value={value("episode_id") || ""}
              >
                <option key="none" value="">None</option>
                {episodes.map((episode) => (
                  <option key={episode.id} value={episode.id}>{episode.title}</option>
                ))}
              </select>
            </div>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <label className="input-group-text" htmlFor="post-published-at">Publish Date</label>
              </div>
              <input
                className="form-control"
                id="post-published-at"
                name="published_at"
                onChange={onDateChange}
                type="datetime-local"
                value={publishedAt || ""}
              />
            </div>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <label className="input-group-text" htmlFor="post-tags">Tags</label>
              </div>
              <input
                className="form-control"
                id="post-tags"
                name="tags"
                onChange={onTagsChange}
                placeholder="covid-19, puns, star wars"
                type="text"
                value={tagsText}
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
                placeholder="The Visible Voices"
                required={true}
                type="text"
                value={value("title") || ""}
              />
            </div>
            <div className="form-group text-center">
              <button type="submit" className="btn btn-primary">Submit</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
