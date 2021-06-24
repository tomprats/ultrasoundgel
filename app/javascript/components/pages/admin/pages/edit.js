import {useContext, useEffect, useState} from "react";
import {useHistory, useParams} from "react-router-dom";
import {Context} from "app";
import {createNotification} from "app/actions/notifications";
import {get as getPage, update as updatePage} from "app/requests/admin/pages";
import {Loading} from "components/pages";
import {usePrompt} from "lib/hooks";
import {valueFrom} from "lib/object";
import Form from "./form";

export default function AdminPagesEdit() {
  const dispatch = useContext(Context)[1];
  const history = useHistory();
  const {id} = useParams();
  const [block, setBlock] = useState(false);
  const [changes, setChanges] = useState({});
  const [page, setPage] = useState(null);
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
    updatePage(page.id, {page: changes}).then(({message, success}) => {
      dispatch(createNotification({content: message, type: success ? "success" : "danger"}));

      if(success) { history.push("/admin/pages"); }
    });
  };
  const value = (name, defaultValue) => valueFrom({
    defaultValue,
    name,
    objects: [changes, page]
  });

  usePrompt({when: block});
  useEffect(() => {
    getPage(id).then((data) => setPage(data.page));
  }, []);

  if(!page) { return <Loading />; }

  return (
    <div className="container-fluid">
      <h1 className="text-center">Edit Page</h1>
      <Form {...{onChange, onSubmit, value}} />
    </div>
  );
}
