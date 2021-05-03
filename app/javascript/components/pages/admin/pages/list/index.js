import {useEffect, useState} from "react";
import {getAll as getPages} from "app/requests/admin/pages";
import {Loading} from "components/pages";
import Row from "./row";

export default function AdminPagesList() {
  const [pages, setPages] = useState(null);
  const onDestroy = (id) => {
    setPages(pages.filter((page) => page.id !== id));
  };

  useEffect(() => {
    getPages().then((data) => setPages(data.pages));
  }, []);

  if(!pages) { return <Loading />; }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-10 offset-md-1">
          <h1 className="text-center">Pages</h1>
          <div className="text-right mb-1">
            <a className="btn btn-outline-secondary btn-sm" href="/admin/pages/new">New Page</a>
          </div>
          <div className="table-responsive rounded">
            <table className="table table-hover text-center">
              <thead className="thead-dark">
                <tr>
                  <th>Active</th>
                  <th>Rank</th>
                  <th>Template</th>
                  <th>Name</th>
                  <th>Path</th>
                  <th>Created At</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {pages.map((page) => (
                  <Row key={page.id} onDestroy={onDestroy} page={page} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
