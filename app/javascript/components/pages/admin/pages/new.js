import {useContext, useState} from "react";
import {useHistory} from "react-router-dom";
import {Context} from "app";
import {createNotification} from "app/actions/notifications";
import {create as createPage} from "app/requests/admin/pages";
import {usePrompt} from "lib/hooks";
import {valueFrom, withoutBlankValues} from "lib/object";
import Form from "./form";

export default function AdminPagesNew() {
  const dispatch = useContext(Context)[1];
  const history = useHistory();
  const [block, setBlock] = useState(false);
  const [page, setPage] = useState({
    active: true,
    name: "",
    rank: 100,
    template: "default",
    path: ""
  });
  const onChange = ({target: {checked, name, type, value}}) => {
    setBlock(true);
    setPage({...page, [name]: type === "checkbox" ? checked : value});
  };
  const onSubmit = (e) => {
    e.preventDefault();

    setBlock(false);
    createPage({page: withoutBlankValues(page)}).then(({message, success}) => {
      dispatch(createNotification({content: message, type: success ? "success" : "danger"}));

      if(success) { history.push("/admin/pages"); }
    });
  };
  const value = (name, defaultValue) => valueFrom({defaultValue, name, objects: [page]});

  usePrompt({when: block});

  return (
    <div className="container-fluid">
      <h1 className="text-center">New Page</h1>
      <Form {...{onChange, onSubmit, value}} />
    </div>
  );
}
