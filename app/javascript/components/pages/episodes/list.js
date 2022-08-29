import PropTypes from "prop-types";
import {useEffect, useState} from "react";
import {getAll} from "app/requests/episodes";
import Episode from "components/helpers/episode";
import {Loading} from "components/pages";

function EpisodesList({getEpisodes, prefix}) {
  const [records, setRecords] = useState(null);

  useEffect(() => {
    getEpisodes().then((data) => setRecords(data.episodes));
  }, []);

  if(!records) { return <Loading />; }

  return (
    <div className="container-fluid">
      <div className="row">
        {records.map((record) => (
          <div key={record.uid} className="col-md-6 offset-3">
            <Episode episode={record} prefix={prefix} />
          </div>
        ))}
      </div>
    </div>
  );
}

EpisodesList.defaultProps = {getEpisodes: getAll, prefix: ""};
EpisodesList.propTypes = {
  getEpisodes: PropTypes.func,
  prefix: PropTypes.string
};

export default EpisodesList;
