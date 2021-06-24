import {useContext, useEffect, useState} from "react";
import {useHistory, useParams} from "react-router-dom";
import {Context} from "app";
import {createNotification} from "app/actions/notifications";
import {get as getArticle, update as updateArticle} from "app/requests/admin/articles";
import {Loading} from "components/pages";
import {usePrompt} from "lib/hooks";
import {valueFrom} from "lib/object";
import Form from "./form";

export default function AdminArticlesEdit() {
  const dispatch = useContext(Context)[1];
  const history = useHistory();
  const {id} = useParams();
  const [article, setArticle] = useState(null);
  const [block, setBlock] = useState(false);
  const [changes, setChanges] = useState({});
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
    updateArticle(article.id, {article: changes}).then(({message, success}) => {
      dispatch(createNotification({content: message, type: success ? "success" : "danger"}));

      if(success) { history.push("/admin/articles"); }
    });
  };
  const value = (name, defaultValue) => valueFrom({
    defaultValue,
    name,
    objects: [changes, article]
  });

  usePrompt({when: block});
  useEffect(() => {
    getArticle(id).then((data) => setArticle(data.article));
  }, []);

  if(!article) { return <Loading />; }

  return (
    <div className="container-fluid">
      <h1 className="text-center">Edit Article</h1>
      <Form {...{onChange, onSubmit, value}} />
    </div>
  );
}
