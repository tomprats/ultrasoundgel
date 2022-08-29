import PropTypes from "prop-types";
import {useState} from "react";
import {createNotification} from "app/actions/notifications";
import {destroy as destroyRecord, publish, unpublish} from "app/requests/admin/cases";
import {Publish as PublishModal} from "components/helpers/modal";
import useAppContext from "lib/hooks/use-app-context";
import {displayDate} from "lib/string";

function AdminCasesListRow({record: originalRecord, onDestroy}) {
  const dispatch = useAppContext()[1];
  const [record, setRecord] = useState(originalRecord);
  const [showPublish, setShowPublish] = useState(false);
  const onDelete = () => {
    if(!window.confirm("Are you sure you want to delete this case?")) { return; }

    destroyRecord(record.uid).then(({message, success}) => {
      dispatch(createNotification({content: message, type: success ? "success" : "danger"}));

      if(success) { onDestroy(record.uid); }
    });
  };
  const onPublish = (date) => {
    setShowPublish(false);

    publish(record.uid, {published_at: date}).then(({case: _record, message, success}) => {
      dispatch(createNotification({content: message, type: success ? "success" : "danger"}));

      if(success) { setRecord(_record); }
    });
  };
  const onUnpublish = () => {
    setShowPublish(false);

    unpublish(record.uid).then(({case: _record, message, success}) => {
      dispatch(createNotification({content: message, type: success ? "success" : "danger"}));

      if(success) { setRecord(_record); }
    });
  };
  const published = record.published_at && (new Date(record.published_at) < new Date());

  return (
    <tr>
      <td>{record.published_at ? displayDate(record.published_at) : "None"}</td>
      <td>{record.public_tags.join(", ")}</td>
      <td>{record.title}</td>
      <td>{displayDate(record.created_at)}</td>
      <td>
        <div className="btn-group" role="group" aria-label="Actions">
          {published ? (
            <>
              <button className="btn btn-sm btn-warning" onClick={() => setShowPublish(true)} type="button">Unpublish</button>
              <a className="btn btn-sm btn-primary" data-confirm={`${record.title} is already published. Still want to edit?`} href={`/admin/cases/${record.uid}`}>Edit</a>
            </>
          ) : (
            <>
              <button className="btn btn-sm btn-success" onClick={() => setShowPublish(true)} type="button">Publish</button>
              <a className="btn btn-sm btn-primary" href={`/admin/cases/${record.uid}`}>Edit</a>
            </>
          )}
          <button className="btn btn-sm btn-danger" onClick={onDelete} type="button">Destroy</button>
        </div>
        <PublishModal
          onClose={() => setShowPublish(false)}
          onPublish={onPublish}
          onUnpublish={onUnpublish}
          show={showPublish}
        />
      </td>
    </tr>
  );
}

AdminCasesListRow.propTypes = {
  onDestroy: PropTypes.func.isRequired,
  record: PropTypes.shape({
    created_at: PropTypes.string.isRequired,
    public_tags: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    published_at: PropTypes.string,
    title: PropTypes.string.isRequired,
    uid: PropTypes.string.isRequired
  }).isRequired
};

export default AdminCasesListRow;
