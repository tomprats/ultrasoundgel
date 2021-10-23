import {useEffect, useState} from "react";
import {useHistory, useParams} from "react-router-dom";
import {createNotification} from "app/actions/notifications";
import {get as getArticle, update as updateArticle} from "app/requests/admin/articles";
import {Loading} from "components/pages";
import {valueFrom, valueFromTarget} from "lib/form";
import useAppContext from "lib/hooks/use-app-context";
import usePrompt from "lib/hooks/use-prompt";
import Form from "./form";

export default function AdminArticlesEdit() {
  const dispatch = useAppContext()[1];
  const history = useHistory();
  const {id} = useParams();
  const [article, setArticle] = useState(null);
  const [block, setBlock] = useState(false);
  const [changes, setChanges] = useState({});
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
