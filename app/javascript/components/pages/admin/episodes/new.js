import {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import {createNotification} from "app/actions/notifications";
import {getAll as getChannels} from "app/requests/admin/channels";
import {create as createEpisode} from "app/requests/admin/episodes";
import {Loading} from "components/pages";
import {valueFrom, valueFromTarget} from "lib/form";
import useAppContext from "lib/hooks/use-app-context";
import usePrompt from "lib/hooks/use-prompt";
import {withoutBlankValues} from "lib/object";
import Form from "./form";

export default function AdminEpisodesNew() {
  const dispatch = useAppContext()[1];
  const history = useHistory();
  const [block, setBlock] = useState(false);
  const [channels, setChannels] = useState(null);
  const [episode, setEpisode] = useState({
    author: "",
    description: "",
    explicit: false,
    google_link: "",
    itunes_link: "",
    subtitle: "",
    title: ""
  });

  usePrompt({when: block});
  useEffect(() => {
    getChannels().then((data) => setChannels(data.channels));
  }, []);

  if(!channels) { return <Loading />; }

  const onChange = ({target}) => {
    setBlock(true);
    setEpisode({...episode, [target.name]: valueFromTarget(target)});
  };
  const onSubmit = (files) => {
    const updates = {...episode, ...files};

    setBlock(false);
    createEpisode({episode: withoutBlankValues(updates)}).then(({message, success}) => {
      dispatch(createNotification({content: message, type: success ? "success" : "danger"}));

      if(success) { history.push("/admin/episodes"); }
    });
  };
  const value = (name, defaultValue) => valueFrom({defaultValue, name, objects: [episode]});

  return (
    <div className="container-fluid">
      <h1 className="text-center">New Episode</h1>
      <Form {...{channels, onChange, onSubmit, value}} />
    </div>
  );
}
