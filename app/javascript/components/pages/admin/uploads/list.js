import {useEffect, useState} from "react";
import {getAll as getUploads} from "app/requests/admin/uploads";
import {Loading} from "components/pages";
import {displayDate} from "lib/string";

export default function AdminUploadsList() {
  const [uploads, setUploads] = useState(null);

  useEffect(() => {
    getUploads().then((data) => setUploads(data.uploads));
  }, []);

  if(!uploads) { return <Loading />; }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-10 offset-md-1">
          <h1 className="text-center">Uploads</h1>
          <div className="table-responsive rounded">
            <table className="table table-hover text-center">
              <thead className="thead-dark">
                <tr>
                  <th>Content Type</th>
                  <th>Name</th>
                  <th>Created At</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {uploads.map((upload) => (
                  <tr key={upload.id}>
                    <td>{upload.content_type}</td>
                    <td>{upload.name}</td>
                    <td>{displayDate(upload.created_at)}</td>
                    <td>
                      <div className="btn-group" role="group" aria-label="Actions">
                        <a className="btn btn-sm btn-primary" href={upload.file} target="_blank" rel="noreferrer">View</a>
                      </div>
                    </td>
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
