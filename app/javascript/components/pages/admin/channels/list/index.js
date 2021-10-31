import {useEffect, useState} from "react";
import {getAll as getChannels} from "app/requests/admin/channels";
import {Loading} from "components/helpers";
import Row from "./row";

export default function AdminChannelsList() {
  const [channels, setChannels] = useState(null);
  const onDestroy = (uid) => {
    setChannels(channels.filter((channel) => channel.uid !== uid));
  };

  useEffect(() => {
    getChannels().then((data) => setChannels(data.channels));
  }, []);

  if(!channels) { return <Loading />; }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-10 offset-md-1">
          <h1 className="text-center">Channels</h1>
          <div className="text-right mb-1">
            <a className="btn btn-outline-secondary btn-sm" href="/admin/channels/new">New Channel</a>
          </div>
          <div className="table-responsive rounded">
            <table className="table table-hover text-center">
              <thead className="thead-dark">
                <tr>
                  <th>Redirect</th>
                  <th>Published</th>
                  <th>Author</th>
                  <th>Image</th>
                  <th>Owner</th>
                  <th>Title</th>
                  <th>Created At</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {channels.map((channel) => (
                  <Row key={channel.uid} channel={channel} onDestroy={onDestroy} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
