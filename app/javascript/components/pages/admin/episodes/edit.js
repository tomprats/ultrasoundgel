import {useContext, useEffect, useState} from "react";
import {useHistory, useParams} from "react-router-dom";
import {Context} from "app";
import {createNotification} from "app/actions/notifications";
import {get as getEpisode, update as updateEpisode} from "app/requests/admin/episodes";
import {Loading} from "components/pages";
import {usePrompt} from "lib/hooks";
import {valueFrom} from "lib/object";
import Form from "./form";

export default function AdminEpisodesEdit() {
  const dispatch = useContext(Context)[1];
  const history = useHistory();
  const {uid} = useParams();
  const [block, setBlock] = useState(false);
  const [changes, setChanges] = useState({});
  const [episode, setEpisode] = useState(null);
  const onChange = ({target: {checked, name, type, value}}) => {
    setBlock(true);
    setChanges({...changes, [name]: type === "checkbox" ? checked : value});
  };
  const onSubmit = (files) => {
    const updates = {...changes, ...files};

    if(Object.keys(updates).length === 0) {
      return dispatch(createNotification({
        content: "Please make changes before submitting",
        type: "danger"
      }));
    }

    setBlock(false);
    updateEpisode(episode.uid, {episode: updates}).then(({message, success}) => {
      dispatch(createNotification({content: message, type: success ? "success" : "danger"}));

      if(success) { history.push("/admin/episodes"); }
    });
  };
  const value = (name, defaultValue) => valueFrom({
    defaultValue,
    name,
    objects: [changes, episode]
  });

  usePrompt({when: block});
  useEffect(() => {
    getEpisode(uid).then((data) => setEpisode(data.episode));
  }, []);

  if(!episode) { return <Loading />; }

  return (
    <div className="container-fluid">
      <h1 className="text-center">Edit Episode</h1>
      <Form {...{onChange, onSubmit, value}} />
    </div>
  );
}
