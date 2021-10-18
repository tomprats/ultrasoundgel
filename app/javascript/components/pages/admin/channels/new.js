import {useState} from "react";
import {useHistory} from "react-router-dom";
import {createNotification} from "app/actions/notifications";
import {create as createChannel} from "app/requests/admin/channels";
import {valueFrom, valueFromTarget} from "lib/form";
import useAppContext from "lib/hooks/use-app-context";
import usePrompt from "lib/hooks/use-prompt";
import {withoutBlankValues} from "lib/object";
import Form from "./form";

export default function AdminChannelsNew() {
  const dispatch = useAppContext()[1];
  const history = useHistory();
  const [block, setBlock] = useState(false);
  const [channel, setChannel] = useState({
    author: "",
    categories: "",
    description: "",
    explicit: false,
    google_link: "",
    itunes_link: "",
    link: "",
    owner_email: "",
    owner_name: "",
    subtitle: "",
    title: ""
  });
  const onChange = ({target}) => {
    setBlock(true);
    setChannel({...channel, [target.name]: valueFromTarget(target)});
  };
  const onSubmit = (files) => {
    const updates = {...channel, ...files};

    setBlock(false);
    createChannel({channel: withoutBlankValues(updates)}).then(({message, success}) => {
      dispatch(createNotification({content: message, type: success ? "success" : "danger"}));

      if(success) { history.push("/admin/channels"); }
    });
  };
  const value = (name, defaultValue) => valueFrom({defaultValue, name, objects: [channel]});

  usePrompt({when: block});

  return (
    <div className="container-fluid">
      <h1 className="text-center">New Channel</h1>
      <Form {...{onChange, onSubmit, value}} />
    </div>
  );
}
