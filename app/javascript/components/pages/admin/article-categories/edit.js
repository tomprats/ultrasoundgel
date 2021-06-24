import {useContext, useEffect, useState} from "react";
import {useHistory, useParams} from "react-router-dom";
import {Context} from "app";
import {createNotification} from "app/actions/notifications";
import {get as getCategory, update as updateCategory} from "app/requests/admin/article-categories";
import {Loading} from "components/pages";
import {usePrompt} from "lib/hooks";
import {valueFrom} from "lib/object";
import Form from "./form";

export default function AdminArticleCategoriesEdit() {
  const dispatch = useContext(Context)[1];
  const history = useHistory();
  const {id} = useParams();
  const [block, setBlock] = useState(false);
  const [category, setCategory] = useState(null);
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
