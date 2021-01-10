import {useContext, useState} from "react";
import {useHistory} from "react-router-dom";
import {Context} from "app";
import {createNotification} from "app/actions/notifications";
import {create as createUser} from "app/requests/admin/users";
import {FileInput, FormWithFiles} from "components/helpers";
import {withoutBlankValues} from "lib/object";

export default function AdminUsersNew() {
  const dispatch = useContext(Context)[1];
  const history = useHistory();
  const [user, setUser] = useState({
    admin: false,
    email: "",
    first_name: "",
    last_name: "",
    post_notifications: true
  });
  const onChange = ({target: {checked, name, type, value}}) => (
    setUser({...user, [name]: type === "checkbox" ? checked : value})
  );
  const onImageChange = (e) => {
    const file = e.target.files[0];

    setUser({...user, image: file && file.name});
  };
  const onSubmit = (files) => {
    createUser({user: withoutBlankValues({...user, ...files})}).then((data) => {
      if(data.success) {
        history.push("/admin/users", {message: data.message, type: "success"});
      } else {
        dispatch(createNotification({content: data.message, type: "danger"}));
      }
    });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-4 offset-md-4">
          <h1 className="text-center">Invite User</h1>
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
                value={user.first_name}
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
                value={user.last_name}
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
                value={user.email}
              />
            </div>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <label className="input-group-text" htmlFor="user-image">Profile Image</label>
              </div>
              <FileInput id="user-image" name="image" onChange={onImageChange} />
            </div>
            <div className="custom-control custom-switch text-center mb-3">
              <input
                checked={user.admin}
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
                checked={user.post_notifications}
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
