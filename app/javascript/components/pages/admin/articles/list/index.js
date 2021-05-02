import {useEffect, useState} from "react";
import {getAll as getArticles} from "app/requests/admin/articles";
import {Loading} from "components/pages";
import Row from "./row";

export default function AdminArticlesList() {
  const [articles, setArticles] = useState(null);
  const onDestroy = (id) => {
    setArticles(articles.filter((article) => article.id !== id));
  };

  useEffect(() => {
    getArticles().then((data) => setArticles(data.articles));
  }, []);

  if(!articles) { return <Loading />; }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-10 offset-md-1">
          <h1 className="text-center">Articles</h1>
          <div className="text-right mb-1">
            <a className="btn btn-outline-secondary btn-sm" href="/admin/articles/new">New Article</a>
          </div>
          <div className="table-responsive rounded">
            <table className="table table-hover text-center">
              <thead className="thead-dark">
                <tr>
                  <th>Category</th>
                  <th>Link</th>
                  <th>Title</th>
                  <th>Journal</th>
                  <th>Year</th>
                  <th>Month</th>
                  <th>Created At</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {articles.map((article) => (
                  <Row key={article.id} article={article} onDestroy={onDestroy} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
