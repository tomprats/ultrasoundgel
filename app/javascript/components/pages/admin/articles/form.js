import PropTypes from "prop-types";
import {useEffect, useState} from "react";
import {getAll as getCategories} from "app/requests/admin/article-categories";
import {Loading} from "components/pages";

const monthNames = [null, "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function AdminArticlesForm({onChange, onSubmit, value}) {
  const [categories, setCategories] = useState(null);
  const months = Array(12).fill(1).map((x, i) => x + i);
  const now = new Date();
  const year = now.getFullYear();
  const years = Array(year - 1999).fill(2000).map((x, i) => x + i).reverse();

  useEffect(() => {
    getCategories().then((data) => setCategories(data.categories));
  }, []);

  if(!categories) { return <Loading />; }

  return (
    <form onSubmit={onSubmit}>
      <div className="row">
        <div className="col-md-4 offset-md-4">
          {categories.length === 0 ? (
            <p className="form-col-form-static">
              There are no categories available. You must <a href="/admin/article-categories">create one</a> before creating an article.
            </p>
          ) : (
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <label className="input-group-text" htmlFor="article-category-id">Category</label>
              </div>
              <select
                className="form-control"
                id="article-category-id"
                name="category_id"
                onChange={onChange}
                required={true}
                value={value("category_id")}
              >
                {!value("id") && <option value="">Select Category</option>}
                {categories.map(({id, name}) => (
                  <option key={id} value={id}>{name}</option>
                ))}
              </select>
            </div>
          )}
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <label className="input-group-text" htmlFor="article-link">Link</label>
            </div>
            <input
              className="form-control"
              id="article-link"
              name="link"
              onChange={onChange}
              placeholder={window.location.origin}
              required={true}
              type="url"
              value={value("link")}
            />
          </div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <label className="input-group-text" htmlFor="article-title">Title</label>
            </div>
            <input
              className="form-control"
              id="article-title"
              name="title"
              onChange={onChange}
              placeholder="How does Tom Prats live with POTS every day?"
              required={true}
              type="text"
              value={value("title")}
            />
          </div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <label className="input-group-text" htmlFor="article-journal">Journal</label>
            </div>
            <input
              className="form-control"
              id="article-journal"
              name="journal"
              onChange={onChange}
              placeholder="Ultra Journal"
              required={true}
              type="text"
              value={value("journal")}
            />
          </div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <label className="input-group-text" htmlFor="article-year">Year</label>
            </div>
            <select
              className="form-control"
              id="article-year"
              name="year"
              onChange={onChange}
              required={true}
              value={value("year")}
            >
              {years.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <label className="input-group-text" htmlFor="article-month">Month</label>
            </div>
            <select
              className="form-control"
              id="article-month"
              name="month"
              onChange={onChange}
              required={true}
              value={value("month")}
            >
              {months.map((option) => (
                <option key={option} value={option}>{monthNames[option]}</option>
              ))}
            </select>
          </div>
          <div className="form-group text-center">
            <button type="submit" className="btn btn-primary">Submit</button>
          </div>
        </div>
      </div>
    </form>
  );
}

AdminArticlesForm.propTypes = {
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  value: PropTypes.func.isRequired
};

export default AdminArticlesForm;
