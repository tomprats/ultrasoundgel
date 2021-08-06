import {useEffect, useState} from "react";
import {getAll as getStats} from "app/requests/admin/stats";
import {Loading} from "components/pages";
import {displayDate} from "lib/string";

export default function AdminStatsList() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    getStats().then((data) => setStats(data));
  }, []);

  if(!stats) { return <Loading />; }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-12">
          <h1 className="text-center">Stats</h1>
        </div>
      </div>
      <div className="row">
        <div className="col-md-8 offset-md-1">
          <div className="table-responsive rounded">
            <table className="table table-hover text-center">
              <thead className="thead-dark">
                <tr>
                  <th>Time</th>
                  <th>Average Downloads</th>
                  <th>Total Downloads</th>
                  <th>Average Unique Downloads</th>
                  <th>Unique Downloads</th>
                </tr>
              </thead>
              <tbody>
                {stats.channel.downloads.map((downloads) => (
                  <tr>
                    <td>{downloads.name}</td>
                    <td>{downloads.average_downloads} per month</td>
                    <td>{downloads.average_unique_downloads} per month</td>
                    <td>{downloads.total_downloads}</td>
                    <td>{downloads.unique_downloads}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="table-responsive rounded">
            <table className="table table-hover text-center">
              <thead className="thead-dark">
                <tr>
                  <th>Published At</th>
                  <th>Episode</th>
                  <th>Total Downloads</th>
                  <th>Recent Downloads</th>
                  <th>Unique Downloads</th>
                  <th>Recent Unique Downloads</th>
                </tr>
              </thead>
              <tbody>
                {stats.episodes.map((episode) => (
                  <tr key={episode.uid}>
                    <td>{episode.published_at ? displayDate(episode.published_at) : "None"}</td>
                    <td>{episode.title}</td>
                    <td>{episode.downloads}</td>
                    <td>{episode.recent_downloads}</td>
                    <td>{episode.unique_downloads}</td>
                    <td>{episode.recent_unique_downloads}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="col-md-2">
          <div className="table-responsive rounded">
            <table className="table table-hover text-center">
              <thead className="thead-dark">
                <tr>
                  <th>Month</th>
                  <th>Downloads</th>
                </tr>
              </thead>
              <tbody>
                {stats.channel.monthly_downloads.map(({date, total}) => (
                  <tr key={date}>
                    <td>{date}</td>
                    <td>{total}</td>
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
