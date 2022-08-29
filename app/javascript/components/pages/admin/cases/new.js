import {useState} from "react";
import {useHistory} from "react-router-dom";
import {createNotification} from "app/actions/notifications";
import {create as createRecord} from "app/requests/admin/cases";
import {valueFrom, valueFromTarget} from "lib/form";
import useAppContext from "lib/hooks/use-app-context";
import usePrompt from "lib/hooks/use-prompt";
import {withoutBlankValues} from "lib/object";
import Form from "./form";

export default function AdminCasesNew() {
  const dispatch = useAppContext()[1];
  const history = useHistory();
  const [block, setBlock] = useState(false);
  const [record, setRecord] = useState({
    content: "",
    public_tags: [],
    tags: "",
    title: ""
  });

  usePrompt({when: block});

  const onChange = ({target}) => {
    setBlock(true);
    setRecord({...record, [target.name]: valueFromTarget(target)});
  };
  const onSubmit = (e) => {
    e.preventDefault();

    setBlock(false);
    createRecord({case: withoutBlankValues(record)}).then(({message, success}) => {
      dispatch(createNotification({content: message, type: success ? "success" : "danger"}));

      if(success) { history.push("/admin/cases"); }
    });
  };
  const value = (name, defaultValue) => valueFrom({defaultValue, name, objects: [record]});

  return (
    <div className="container-fluid">
      <h1 className="text-center">New Case</h1>
      <Form {...{onChange, onSubmit, value}} />
    </div>
  );
}
