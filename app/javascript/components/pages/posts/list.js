import PropTypes from "prop-types";
import {useEffect, useState} from "react";
import {getAll} from "app/requests/posts";
import {Loading} from "components/pages";
import {displayDateTime} from "lib/string";

function PostsList({getPosts, prefix}) {
  const [records, setRecords] = useState(null);

  useEffect(() => {
    getPosts().then((data) => setRecords(data.posts));
  }, []);

  if(!records) { return <Loading />; }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-8 offset-lg-2">
          <h3 className="text-center">Posts</h3>
          <div className="row">
            {records.map((record) => (
              <div key={record.uid} className="col-md-4">
                <a href={`${prefix}/posts/${record.uid}`}>
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

PostsList.defaultProps = {getPosts: getAll, prefix: ""};
PostsList.propTypes = {
  getPosts: PropTypes.func,
  prefix: PropTypes.string
};

export default PostsList;
