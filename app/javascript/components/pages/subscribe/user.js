import {useContext, useState} from "react";
import {Context} from "app";
import {createNotification} from "app/actions/notifications";
import {setUser} from "app/actions/user";
import {create as createUser} from "app/requests/user";
import {FileInput, FormWithFiles} from "components/helpers";
import {withoutBlankValues} from "lib/object";

export default function User() {
  const dispatch = useContext(Context)[1];
  const [user, setChanges] = useState({
    email: "",
    first_name: "",
    last_name: "",
    password: "",
    password_confirmation: "",
    post_notifications: true
  });
  const onChange = ({target: {checked, name, type, value}}) => (
    setChanges({...user, [name]: type === "checkbox" ? checked : value})
  );
  const onSubmit = (files) => {
    createUser({user: withoutBlankValues({...user, ...files})}).then((data) => {
      dispatch(createNotification({
        content: data.message,
        type: data.success ? "success" : "danger"
      }));

      if(data.success) { dispatch(setUser(data.user)); }
    });
  };

  return (
    <FormWithFiles onSubmit={onSubmit}>
      <div className="input-group mb-4">
        <input
          className="form-control py-4"
          id="user-first-name"
          name="first_name"
          onChange={onChange}
          placeholder="first name"
          required={true}
          type="text"
          value={user.first_name}
        />
      </div>
      <div className="input-group mb-4">
        <input
          className="form-control py-4"
          id="user-last-name"
          name="last_name"
          onChange={onChange}
          placeholder="last name"
          required={true}
          type="text"
          value={user.last_name}
        />
      </div>
      <div className="input-group mb-4">
        <input
          className="form-control py-4"
          id="user-email"
          name="email"
          onChange={onChange}
          placeholder="email"
          required={true}
          type="email"
          value={user.email}
        />
      </div>
      <div className="input-group mb-4">
        <input
          className="form-control py-4"
          id="user-password"
          name="password"
          onChange={onChange}
          placeholder="password"
          required={true}
          type="password"
          value={user.password}
        />
      </div>
      <div className="input-group mb-4">
        <input
          className="form-control py-4"
          id="user-password-confirmation"
          name="password_confirmation"
          onChange={onChange}
          placeholder="password confirmation"
          required={true}
          type="password"
          value={user.password_confirmation}
        />
      </div>
      <div className="input-group mb-4">
        <FileInput id="user-image" name="image" />
      </div>
      <div className="custom-control custom-switch mb-4">
        <input
          checked={user.post_notifications}
          className="custom-control-input py-4"
          id="user-post-notifications"
          name="post_notifications"
          onChange={onChange}
          type="checkbox"
        />
        <label className="custom-control-label" htmlFor="user-post-notifications">Post Notifications</label>
      </div>
      <div className="form-group">
        <button type="submit" className="btn btn-primary px-5">Sign Up</button>
      </div>
    </FormWithFiles>
  );
}
