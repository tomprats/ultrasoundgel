import {useEffect, useState} from "react";
import {getAll as getRecords} from "app/requests/admin/cases";
import {Loading} from "components/helpers";
import Row from "./row";

export default function AdminCasesList() {
  const [records, setRecords] = useState(null);
  const onDestroy = (uid) => {
    setRecords(records.filter((record) => record.uid !== uid));
  };

  useEffect(() => {
    getRecords().then((data) => setRecords(data.cases));
  }, []);

  if(!records) { return <Loading />; }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-10 offset-md-1">
          <h1 className="text-center">Cases</h1>
          <div className="row">
            <div className="col-6 text-left mb-1">
              <a className="btn btn-outline-secondary btn-sm" href="/preview/cases">Preview</a>
            </div>
            <div className="col-6 text-right mb-1">
              <a className="btn btn-outline-secondary btn-sm" href="/admin/cases/new">New Case</a>
            </div>
          </div>
          <div className="table-responsive rounded">
            <table className="table table-hover text-center">
              <thead className="thead-dark">
                <tr>
                  <th>Published</th>
                  <th>Public Tags</th>
                  <th>Title</th>
                  <th>Created At</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {records.map((record) => (
                  <Row key={record.uid} onDestroy={onDestroy} record={record} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
