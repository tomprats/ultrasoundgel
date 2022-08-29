import {useEffect, useState} from "react";
import {useHistory, useParams} from "react-router-dom";
import {createNotification} from "app/actions/notifications";
import {get as getRecord, update as updateRecord} from "app/requests/admin/cases";
import {Loading} from "components/pages";
import {valueFrom, valueFromTarget} from "lib/form";
import useAppContext from "lib/hooks/use-app-context";
import usePrompt from "lib/hooks/use-prompt";
import Form from "./form";

export default function AdminCasesEdit() {
  const dispatch = useAppContext()[1];
  const history = useHistory();
  const {uid} = useParams();
  const [block, setBlock] = useState(false);
  const [changes, setChanges] = useState({});
  const [record, setRecord] = useState(null);
  const onChange = ({target}) => {
    setBlock(true);
    setChanges({...changes, [target.name]: valueFromTarget(target)});
  };
  const onSubmit = (e) => {
    e.preventDefault();

    if(Object.keys(changes).length === 0) {
      return dispatch(createNotification({
        content: "Please make changes before submitting",
        type: "danger"
      }));
    }

    setBlock(false);
    updateRecord(record.uid, {case: changes}).then(({message, success}) => {
      dispatch(createNotification({content: message, type: success ? "success" : "danger"}));

      if(success) { history.push("/admin/cases"); }
    });
  };
  const value = (name, defaultValue) => valueFrom({
    defaultValue,
    name,
    objects: [changes, record]
  });

  usePrompt({when: block});
  useEffect(() => {
    getRecord(uid).then((data) => setRecord(data.case));
  }, []);

  if(!record) { return <Loading />; }

  return (
    <div className="container-fluid">
      <h1 className="text-center">Edit Case</h1>
      <Form {...{onChange, onSubmit, value}} />
    </div>
  );
}
