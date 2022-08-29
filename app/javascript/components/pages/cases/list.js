import PropTypes from "prop-types";
import {useEffect, useState} from "react";
import {getAll} from "app/requests/cases";
import {Loading} from "components/pages";
import {displayDateTime} from "lib/string";

function CasesList({getCases, prefix}) {
  const [records, setRecords] = useState(null);

  useEffect(() => {
    getCases().then((data) => setRecords(data.cases));
  }, []);

  if(!records) { return <Loading />; }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-8 offset-lg-2">
          <h3 className="text-center">Cases</h3>
          <div className="row">
            {records.map((record) => (
              <div key={record.uid} className="col-md-4">
                <a href={`${prefix}/cases/${record.uid}`}>
                  <h3 className="m-0 p-0">{record.title}</h3>
                </a>
                <p>On {record.published_at ? displayDateTime(record.published_at) : "Unpublished"}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

CasesList.defaultProps = {getCases: getAll, prefix: ""};
CasesList.propTypes = {
  getCases: PropTypes.func,
  prefix: PropTypes.string
};

export default CasesList;
