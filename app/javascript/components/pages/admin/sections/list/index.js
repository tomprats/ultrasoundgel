import {useEffect, useState} from "react";
import {getAll as getSections} from "app/requests/admin/sections";
import {Loading} from "components/pages";
import Row from "./row";

export default function AdminSectionsList() {
  const [sections, setSections] = useState(null);

  useEffect(() => {
    getSections().then((data) => setSections(data.sections));
  }, []);

  if(!sections) { return <Loading />; }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-10 offset-md-1">
          <h1 className="text-center">Sections</h1>
          <div className="table-responsive rounded">
            <table className="table table-hover text-center">
              <thead className="thead-dark">
                <tr>
                  <th>Section</th>
                  <th>Content</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {sections.map((section) => (
                  <Row key={section.id} section={section} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
