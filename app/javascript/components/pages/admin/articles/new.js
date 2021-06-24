import {useContext, useState} from "react";
import {useHistory} from "react-router-dom";
import {Context} from "app";
import {createNotification} from "app/actions/notifications";
import {create as createArticle} from "app/requests/admin/articles";
import {usePrompt} from "lib/hooks";
import {valueFrom, withoutBlankValues} from "lib/object";
import Form from "./form";

export default function AdminArticlesNew() {
  const dispatch = useContext(Context)[1];
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
  const onChange = ({target: {checked, name, type, value}}) => {
    setBlock(true);
    setArticle({...article, [name]: type === "checkbox" ? checked : value});
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
