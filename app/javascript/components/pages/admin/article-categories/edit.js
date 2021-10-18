import {useEffect, useState} from "react";
import {useHistory, useParams} from "react-router-dom";
import {createNotification} from "app/actions/notifications";
import {get as getCategory, update as updateCategory} from "app/requests/admin/article-categories";
import {Loading} from "components/pages";
import {valueFrom, valueFromTarget} from "lib/form";
import useAppContext from "lib/hooks/use-app-context";
import usePrompt from "lib/hooks/use-prompt";
import Form from "./form";

export default function AdminArticleCategoriesEdit() {
  const dispatch = useAppContext()[1];
  const history = useHistory();
  const {id} = useParams();
  const [block, setBlock] = useState(false);
  const [category, setCategory] = useState(null);
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
    updateCategory(category.id, {category: changes}).then(({message, success}) => {
      dispatch(createNotification({content: message, type: success ? "success" : "danger"}));

      if(success) { history.push("/admin/article-categories", {message, type: "success"}); }
    });
  };
  const value = (name, defaultValue) => valueFrom({
    defaultValue,
    name,
    objects: [changes, category]
  });

  usePrompt({when: block});
  useEffect(() => {
    getCategory(id).then((data) => setCategory(data.category));
  }, []);

  if(!category) { return <Loading />; }

  return (
    <div className="container-fluid">
      <h1 className="text-center">Edit Category</h1>
      <Form {...{onChange, onSubmit, value}} />
    </div>
  );
}
