import {useEffect, useState} from "react";
import {useHistory, useParams} from "react-router-dom";
import {createNotification} from "app/actions/notifications";
import {get as getUser, update as updateUser} from "app/requests/admin/users";
import File from "components/helpers/form/file";
import FormWithFiles from "components/helpers/form/with-files";
import {Loading} from "components/pages";
import {valueFrom, valueFromTarget} from "lib/form";
import useAppContext from "lib/hooks/use-app-context";
import usePrompt from "lib/hooks/use-prompt";
import {withoutBlankValues} from "lib/object";

export default function AdminUsersEdit() {
  const dispatch = useAppContext()[1];
  const history = useHistory();
  const {id} = useParams();
  const [block, setBlock] = useState(false);
  const [changes, setChanges] = useState({});
  const [user, setUser] = useState(null);
  const onChange = ({target}) => {
    setBlock(true);
    setChanges({...changes, [target.name]: valueFromTarget(target)});
  };
  const onSubmit = (files) => {
    const updates = withoutBlankValues({...changes, ...files});

    if(Object.keys(updates).length === 0) {
      return dispatch(createNotification({
        content: "Please make changes before submitting",
        type: "danger"
      }));
    }

    setBlock(false);
    updateUser(user.id, {user: updates}).then(({message, success}) => {
      dispatch(createNotification({content: message, type: success ? "success" : "danger"}));

      if(success) { history.push("/admin/users"); }
    });
  };
  const value = (name, defaultValue) => valueFrom({defaultValue, name, objects: [changes, user]});

  usePrompt({when: block});
  useEffect(() => {
    getUser(id).then((data) => setUser(data.user));
  }, []);

  if(!user) { return <Loading />; }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-4 offset-md-4">
          <h1 className="text-center">Edit User</h1>
          <FormWithFiles onSubmit={onSubmit}>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <label className="input-group-text" htmlFor="user-first-name">First Name</label>
              </div>
              <input
                className="form-control"
                id="user-first-name"
                name="first_name"
                onChange={onChange}
                placeholder="Mindy"
                required={true}
                type="text"
                value={value("first_name")}
              />
            </div>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <label className="input-group-text" htmlFor="user-last-name">Last Name</label>
              </div>
              <input
                className="form-control"
                id="user-last-name"
                name="last_name"
                onChange={onChange}
                placeholder="Kaling"
                required={true}
                type="text"
                value={value("last_name")}
              />
            </div>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <label className="input-group-text" htmlFor="user-email">Email</label>
              </div>
              <input
                className="form-control"
                id="user-email"
                name="email"
                onChange={onChange}
                placeholder="mindy@kaling.com"
                required={true}
                type="email"
                value={value("email")}
              />
            </div>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <label className="input-group-text" htmlFor="user-image">Profile Image</label>
              </div>
              <File id="user-image" name="image" onChange={onChange} />
              <img alt="Preview" className="img-fluid" src={value("image")} />
            </div>
            <div className="custom-control custom-switch text-center mb-3">
              <input
                checked={value("admin", false)}
                className="custom-control-input"
                id="user-admin"
                name="admin"
                onChange={onChange}
                type="checkbox"
              />
              <label className="custom-control-label" htmlFor="user-admin">Admin</label>
            </div>
            <div className="custom-control custom-switch text-center mb-3">
              <input
                checked={value("post_notifications", false)}
                className="custom-control-input"
                id="user-post-notifications"
                name="post_notifications"
                onChange={onChange}
                type="checkbox"
              />
              <label className="custom-control-label" htmlFor="user-post-notifications">Post Notifications</label>
            </div>
            <div className="form-group text-center">
              <button type="submit" className="btn btn-primary">Submit</button>
            </div>
          </FormWithFiles>
        </div>
      </div>
    </div>
  );
}
