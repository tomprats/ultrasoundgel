import {useEffect, useState} from "react";
import {getAll as getEpisodes} from "app/requests/episodes";
import {Citation} from "components/helpers";
import {Loading} from "components/pages";

export default function Citations() {
  const [episodes, setEpisodes] = useState(null);

  useEffect(() => {
    getEpisodes({limit: "none"}).then((data) => setEpisodes(data.episodes));
  }, []);

  if(!episodes) { return <Loading />; }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <h3 className="text-center">Citations</h3>
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Episode</th>
                  <th>Title</th>
                  <th>Link</th>
                  <th>Citation</th>
                </tr>
              </thead>
              <tbody>
                {episodes.map((episode) => (
                  <tr key={episode.uid}>
                    <td className="text-center">{episode.number}</td>
                    <td>{episode.post.title}</td>
                    <td>{`${window.location.origin}/${episode.number}`}</td>
                    <td><Citation post={{...episode.post, episode}} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
