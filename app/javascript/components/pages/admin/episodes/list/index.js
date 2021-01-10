import {useEffect, useState} from "react";
import {getAll as getEpisodes} from "app/requests/admin/episodes";
import Row from "./row";

export default function AdminEpisodesList() {
  const [episodes, setEpisodes] = useState([]);
  const onDestroy = (id) => {
    setEpisodes(episodes.filter((episode) => episode.id !== id));
  };

  useEffect(() => {
    getEpisodes().then((data) => setEpisodes(data.episodes));
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <h1 className="text-center">Episodes</h1>
          <div className="row">
            <div className="col-6 text-left mb-1">
              <a className="btn btn-outline-secondary btn-sm" href="/preview/episodes">Preview</a>
            </div>
            <div className="col-6 text-right mb-1">
              <a className="btn btn-outline-secondary btn-sm" href="/admin/episodes/new">New Episode</a>
            </div>
          </div>
          <div className="table-responsive rounded">
            <table className="table table-hover text-center">
              <thead className="thead-dark">
                <tr>
                  <th>Published</th>
                  <th>Audio</th>
                  <th>Author</th>
                  <th>Channel</th>
                  <th>Image</th>
                  <th>Title</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {episodes.map((episode) => (
                  <Row key={episode.id} onDestroy={onDestroy} episode={episode} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
