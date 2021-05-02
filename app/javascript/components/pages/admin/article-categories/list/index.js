import {useEffect, useState} from "react";
import {getAll as getCategories} from "app/requests/admin/article-categories";
import {Loading} from "components/pages";
import Row from "./row";

export default function AdminArticleCategoriesList() {
  const [categories, setCategories] = useState(null);
  const onDestroy = (id) => {
    setCategories(categories.filter((category) => category.id !== id));
  };

  useEffect(() => {
    getCategories().then((data) => setCategories(data.categories));
  }, []);

  if(!categories) { return <Loading />; }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-10 offset-md-1">
          <h1 className="text-center">Categories</h1>
          <div className="text-right mb-1">
            <a className="btn btn-outline-secondary btn-sm" href="/admin/article-categories/new">New Category</a>
          </div>
          <div className="table-responsive rounded">
            <table className="table table-hover text-center">
              <thead className="thead-dark">
                <tr>
                  <th>Rank</th>
                  <th>Name</th>
                  <th>Created At</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category) => (
                  <Row key={category.id} category={category} onDestroy={onDestroy} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
