import PropTypes from "prop-types";

const monthNames = [null, "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function Section({articles, heading, id}) {
  return (
    <div className="card mt-3" id={id}>
      <div className="card-header">
        <div className="card-title m-0">{heading}</div>
      </div>
      <div className="table-responsive">
        <table className="table table-hover">
          <tbody>
            {articles.map((article) => (
              <tr key={article.id}>
                <td><a href={article.link} rel="noreferrer" target="_blank">{article.title}</a></td>
                <td>{article.journal}</td>
                <td>{monthNames[article.month]} {article.year}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="card-footer">
        <a className="float-right" href="#top">back to top</a>
        <div className="clearfix" />
      </div>
    </div>
  );
}

Section.propTypes = {
  articles: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      journal: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired,
      month: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      year: PropTypes.number.isRequired
    }).isRequired
  ).isRequired,
  heading: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired
};

export default Section;
