import {useEffect, useState} from "react";
import {getAll as getPosts} from "app/requests/admin/posts";
import Row from "./row";

export default function AdminPostsList() {
  const [posts, setPosts] = useState([]);
  const onDestroy = (id) => {
    setPosts(posts.filter((post) => post.id !== id));
  };

  useEffect(() => {
    getPosts().then((data) => setPosts(data.posts));
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <h1 className="text-center">Posts</h1>
          <div className="row">
            <div className="col-6 text-left mb-1">
              <a className="btn btn-outline-secondary btn-sm" href="/preview/blog/posts">Preview</a>
            </div>
            <div className="col-6 text-right mb-1">
              <a className="btn btn-outline-secondary btn-sm" href="/admin/posts/new">New Post</a>
            </div>
          </div>
          <div className="table-responsive rounded">
            <table className="table table-hover text-center">
              <thead className="thead-dark">
                <tr>
                  <th>Published</th>
                  <th>Author</th>
                  <th>Episode</th>
                  <th>Tags</th>
                  <th>Title</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post) => (
                  <Row key={post.id} onDestroy={onDestroy} post={post} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
