import PropTypes from "prop-types";

function AdminSectionsListRow({section}) {
  return (
    <tr>
      <td>{section.name}</td>
      <td>{section.contents.map(({name}) => name).join(", ")}</td>
      <td>
        <div className="btn-group" role="group" aria-label="Actions">
          <a className="btn btn-sm btn-primary" href={`/admin/sections/${section.id}/edit`}>Edit</a>
        </div>
      </td>
    </tr>
  );
}

AdminSectionsListRow.propTypes = {
  section: PropTypes.shape({
    contents: PropTypes.arrayOf(
      PropTypes.shape({name: PropTypes.string.isRequired})
    ).isRequired,
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired
  }).isRequired
};

export default AdminSectionsListRow;
