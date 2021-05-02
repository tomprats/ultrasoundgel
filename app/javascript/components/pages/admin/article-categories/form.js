import PropTypes from "prop-types";

function AdminArticleCategoriesForm({onChange, onSubmit, value}) {
  return (
    <form onSubmit={onSubmit}>
      <div className="row">
        <div className="col-md-4 offset-md-4">
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <label className="input-group-text" htmlFor="category-name">Name</label>
            </div>
            <input
              className="form-control"
              id="category-name"
              name="name"
              onChange={onChange}
              placeholder="Cats and Dogs"
              required={true}
              type="text"
              value={value("name")}
            />
          </div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <label className="input-group-text" htmlFor="category-rank">Rank</label>
            </div>
            <input
              className="form-control"
              id="category-rank"
              name="rank"
              onChange={onChange}
              placeholder="100"
              required={true}
              type="text"
              value={value("rank")}
            />
          </div>
          <div className="form-group text-center">
            <button type="submit" className="btn btn-primary">Submit</button>
          </div>
        </div>
      </div>
    </form>
  );
}

AdminArticleCategoriesForm.propTypes = {
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  value: PropTypes.func.isRequired
};

export default AdminArticleCategoriesForm;
