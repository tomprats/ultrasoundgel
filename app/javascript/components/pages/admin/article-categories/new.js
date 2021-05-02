import {useContext, useState} from "react";
import {useHistory} from "react-router-dom";
import {Context} from "app";
import {createNotification} from "app/actions/notifications";
import {create as createCategory} from "app/requests/admin/article-categories";
import {valueFrom, withoutBlankValues} from "lib/object";
import Form from "./form";

export default function AdminArticleCategoriesNew() {
  const dispatch = useContext(Context)[1];
  const history = useHistory();
  const [category, setCategory] = useState({
    name: "",
    rank: 100
  });
  const onChange = ({target: {checked, name, type, value}}) => (
    setCategory({...category, [name]: type === "checkbox" ? checked : value})
  );
  const onSubmit = (e) => {
    e.preventDefault();

    createCategory({category: withoutBlankValues(category)}).then(({message, success}) => {
      dispatch(createNotification({content: message, type: success ? "success" : "danger"}));

      if(success) { history.push("/admin/article-categories"); }
    });
  };
  const value = (name, defaultValue) => valueFrom({defaultValue, name, objects: [category]});

  return (
    <div className="container-fluid">
      <h1 className="text-center">New Category</h1>
      <Form {...{onChange, onSubmit, value}} />
    </div>
  );
}
