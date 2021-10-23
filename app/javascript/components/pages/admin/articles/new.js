import {useState} from "react";
import {useHistory} from "react-router-dom";
import {createNotification} from "app/actions/notifications";
import {create as createArticle} from "app/requests/admin/articles";
import {valueFrom, valueFromTarget} from "lib/form";
import useAppContext from "lib/hooks/use-app-context";
import usePrompt from "lib/hooks/use-prompt";
import {withoutBlankValues} from "lib/object";
import Form from "./form";

export default function AdminArticlesNew() {
  const dispatch = useAppContext()[1];
  const history = useHistory();
  const [article, setArticle] = useState({
    category_id: "",
    journal: "",
    link: "",
    month: 1,
    title: "",
    year: new Date().getFullYear()
  });
  const [block, setBlock] = useState(false);
  const onChange = ({target}) => {
    setBlock(true);
    setArticle({...article, [target.name]: valueFromTarget(target)});
  };
  const onSubmit = (e) => {
    e.preventDefault();

    setBlock(false);
    createArticle({article: withoutBlankValues(article)}).then(({message, success}) => {
      dispatch(createNotification({content: message, type: success ? "success" : "danger"}));

      if(success) { history.push("/admin/articles"); }
    });
  };
  const value = (name, defaultValue) => valueFrom({defaultValue, name, objects: [article]});

  usePrompt({when: block});

  return (
    <div className="container-fluid">
      <h1 className="text-center">New Article</h1>
      <Form {...{onChange, onSubmit, value}} />
    </div>
  );
}
