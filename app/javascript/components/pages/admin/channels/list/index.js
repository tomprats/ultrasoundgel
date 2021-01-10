import {useEffect, useState} from "react";
import {getAll as getChannels} from "app/requests/admin/channels";
import Row from "./row";

export default function AdminChannelsList() {
  const [channels, setChannels] = useState([]);
  const onDestroy = (id) => {
    setChannels(channels.filter((channel) => channel.id !== id));
  };

  useEffect(() => {
    getChannels().then((data) => setChannels(data.channels));
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <h1 className="text-center">Channels</h1>
          <div className="text-right mb-1">
            <a className="btn btn-outline-secondary btn-sm" href="/admin/channels/new">New Channel</a>
          </div>
          <div className="table-responsive rounded">
            <table className="table table-hover text-center">
              <thead className="thead-dark">
                <tr>
                  <th>Published</th>
                  <th>Author</th>
                  <th>Image</th>
                  <th>Owner</th>
                  <th>Title</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {channels.map((channel) => (
                  <Row key={channel.id} onDestroy={onDestroy} channel={channel} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
