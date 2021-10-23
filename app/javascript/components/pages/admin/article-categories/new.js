import {useState} from "react";
import {useHistory} from "react-router-dom";
import {createNotification} from "app/actions/notifications";
import {create as createCategory} from "app/requests/admin/article-categories";
import {valueFrom, valueFromTarget} from "lib/form";
import useAppContext from "lib/hooks/use-app-context";
import usePrompt from "lib/hooks/use-prompt";
import {withoutBlankValues} from "lib/object";
import Form from "./form";

export default function AdminArticleCategoriesNew() {
  const dispatch = useAppContext()[1];
  const history = useHistory();
  const [block, setBlock] = useState(false);
  const [category, setCategory] = useState({
    name: "",
    rank: 100
  });
  const onChange = ({target}) => {
    setBlock(true);
    setCategory({...category, [target.name]: valueFromTarget(target)});
  };
  const onSubmit = (e) => {
    e.preventDefault();

    setBlock(false);
    createCategory({category: withoutBlankValues(category)}).then(({message, success}) => {
      dispatch(createNotification({content: message, type: success ? "success" : "danger"}));

      if(success) { history.push("/admin/article-categories"); }
    });
  };
  const value = (name, defaultValue) => valueFrom({defaultValue, name, objects: [category]});

  usePrompt({when: block});

  return (
    <div className="container-fluid">
      <h1 className="text-center">New Category</h1>
      <Form {...{onChange, onSubmit, value}} />
    </div>
  );
}
