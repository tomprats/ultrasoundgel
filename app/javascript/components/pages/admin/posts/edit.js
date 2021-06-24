import {useContext, useEffect, useState} from "react";
import {useHistory, useParams} from "react-router-dom";
import {Context} from "app";
import {createNotification} from "app/actions/notifications";
import {get as getPost, update as updatePost} from "app/requests/admin/posts";
import {Loading} from "components/pages";
import {usePrompt} from "lib/hooks";
import {valueFrom} from "lib/object";
import Form from "./form";

export default function AdminPostsEdit() {
  const dispatch = useContext(Context)[1];
  const history = useHistory();
  const {uid} = useParams();
  const [block, setBlock] = useState(false);
  const [changes, setChanges] = useState({});
  const [post, setPost] = useState(null);
  const onChange = ({target: {checked, name, type, value}}) => {
    setBlock(true);
    setChanges({...changes, [name]: type === "checkbox" ? checked : value});
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
    updatePost(post.uid, {post: changes}).then(({message, success}) => {
      dispatch(createNotification({content: message, type: success ? "success" : "danger"}));

      if(success) { history.push("/admin/posts"); }
    });
  };
  const value = (name, defaultValue) => valueFrom({
    defaultValue,
    name,
    objects: [changes, post]
  });

  usePrompt({when: block});
  useEffect(() => {
    getPost(uid).then((data) => setPost(data.post));
  }, []);

  if(!post) { return <Loading />; }

  return (
    <div className="container-fluid">
      <h1 className="text-center">Edit Post</h1>
      <Form {...{onChange, onSubmit, value}} />
    </div>
  );
}
