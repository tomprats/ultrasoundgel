import {useContext, useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import {Context} from "app";
import {createNotification} from "app/actions/notifications";
import {getAll as getEpisodes} from "app/requests/admin/episodes";
import {create as createPost} from "app/requests/admin/posts";
import {Loading} from "components/pages";
import {usePrompt} from "lib/hooks";
import {valueFrom, withoutBlankValues} from "lib/object";
import Form from "./form";

export default function AdminPostsNew() {
  const dispatch = useContext(Context)[1];
  const history = useHistory();
  const [block, setBlock] = useState(false);
  const [episodes, setEpisodes] = useState(null);
  const [post, setPost] = useState({
    content: "",
    public_tags: [],
    tags: "",
    title: ""
  });

  usePrompt({when: block});
  useEffect(() => {
    getEpisodes().then((data) => setEpisodes(data.episodes));
  }, []);

  if(!episodes) { return <Loading />; }

  const onChange = ({target: {checked, name, type, value}}) => {
    setBlock(true);
    setPost({...post, [name]: type === "checkbox" ? checked : value});
  };
  const onSubmit = (e) => {
    e.preventDefault();

    setBlock(false);
    createPost({post: withoutBlankValues(post)}).then(({message, success}) => {
      dispatch(createNotification({content: message, type: success ? "success" : "danger"}));

      if(success) { history.push("/admin/posts"); }
    });
  };
  const value = (name, defaultValue) => valueFrom({defaultValue, name, objects: [post]});

  return (
    <div className="container-fluid">
      <h1 className="text-center">New Post</h1>
      <Form {...{episodes, onChange, onSubmit, value}} />
    </div>
  );
}
