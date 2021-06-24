import {useContext, useEffect, useState} from "react";
import {useHistory, useParams} from "react-router-dom";
import {Context} from "app";
import {createNotification} from "app/actions/notifications";
import {get as getSection, update as updateSection} from "app/requests/admin/sections";
import {FormWithFiles} from "components/helpers";
import {Loading} from "components/pages";
import {usePrompt} from "lib/hooks";
import Content from "./content";

export default function AdminSectionsEdit() {
  const [changes, setChanges] = useState({});
  const dispatch = useContext(Context)[1];
  const history = useHistory();
  const {id} = useParams();
  const [block, setBlock] = useState(false);
  const [section, setSection] = useState(null);
  const onChange = (updatedContent) => {
    const contents = (changes.contents || section.contents).map((content) => (
      content.id === updatedContent.id ? updatedContent : content
    ));

    setBlock(true);
    setChanges({...changes, contents});
  };
  const onSubmit = (files) => {
    const {contents, ...updates} = changes;

    updates.contents_attributes = contents.map((content) => (
      files[content.id] ? {...content, value: files[content.id]} : content
    ));

    if(Object.keys(updates).length === 0) {
      return dispatch(createNotification({
        content: "Please make changes before submitting",
        type: "danger"
      }));
    }

    setBlock(false);
    updateSection(section.id, {section: updates}).then(({message, success}) => {
      dispatch(createNotification({content: message, type: success ? "success" : "danger"}));

      if(success) { history.push("/admin/sections"); }
    });
  };

  usePrompt({when: block});
  useEffect(() => {
    getSection(id).then((data) => setSection(data.section));
  }, []);

  if(!section) { return <Loading />; }

  return (
    <div className="container-fluid">
      <FormWithFiles onSubmit={onSubmit}>
        <div className="row">
          <div className="col-md-4 offset-md-4">
            <h1 className="text-center">Edit Section</h1>
            <h2 className="text-center">{section.name}</h2>
            {(changes.contents || section.contents).map((content) => (
              <Content key={content.id} content={content} onChange={onChange} />
            ))}
            <div className="form-group text-center">
              <button type="submit" className="btn btn-primary">Submit</button>
            </div>
          </div>
        </div>
      </FormWithFiles>
    </div>
  );
}
