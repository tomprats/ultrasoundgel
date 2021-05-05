import {useEffect, useState} from "react";
import {getAll as getPosts} from "app/requests/admin/posts";
import {Loading} from "components/helpers";
import Row from "./row";

export default function AdminPostsList() {
  const [posts, setPosts] = useState(null);
  const onDestroy = (uid) => {
    setPosts(posts.filter((post) => post.uid !== uid));
  };

  useEffect(() => {
    getPosts().then((data) => setPosts(data.posts));
  }, []);

  if(!posts) { return <Loading />; }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-10 offset-md-1">
          <h1 className="text-center">Posts</h1>
          <div className="text-right mb-1">
            <a className="btn btn-outline-secondary btn-sm" href="/admin/posts/new">New Post</a>
          </div>
          <div className="table-responsive rounded">
            <table className="table table-hover text-center">
              <thead className="thead-dark">
                <tr>
                  <th>Published</th>
                  <th>Episode</th>
                  <th>Public Tags</th>
                  <th>Title</th>
                  <th>Created At</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post) => (
                  <Row key={post.uid} onDestroy={onDestroy} post={post} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
