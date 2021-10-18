import {useState} from "react";
import {createNotification} from "app/actions/notifications";
import {setUser} from "app/actions/user";
import {create as createProfile} from "app/requests/profile";
import File from "components/helpers/form/file";
import FormWithFiles from "components/helpers/form/with-files";
import useAppContext from "lib/hooks/use-app-context";
import {withoutBlankValues} from "lib/object";

export default function SignUp() {
  const dispatch = useAppContext()[1];
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
    createProfile({user: withoutBlankValues({...user, ...files})}).then((data) => {
      dispatch(createNotification({
        content: data.message,
        type: data.success ? "success" : "danger"
      }));

      if(data.success) { dispatch(setUser(data.user)); }
    });
  };

  return (
    <>
      <h3>Sign Up</h3>
      <FormWithFiles onSubmit={onSubmit}>
        <div className="form-group">
          <input
            className="form-control"
            id="sign-up-first-name"
            name="first_name"
            onChange={onChange}
            placeholder="First Name"
            required={true}
            type="text"
            value={user.first_name}
          />
        </div>
        <div className="form-group">
          <input
            className="form-control"
            id="sign-up-last-name"
            name="last_name"
            onChange={onChange}
            placeholder="Last Name"
            required={true}
            type="text"
            value={user.last_name}
          />
        </div>
        <div className="form-group">
          <input
            className="form-control"
            id="sign-up-email"
            name="email"
            onChange={onChange}
            placeholder="Email"
            required={true}
            type="email"
            value={user.email}
          />
        </div>
        <div className="form-group">
          <input
            className="form-control"
            id="sign-up-password"
            name="password"
            onChange={onChange}
            placeholder="Password"
            required={true}
            type="password"
            value={user.password}
          />
        </div>
        <div className="form-group">
          <input
            className="form-control"
            id="sign-up-password-confirmation"
            name="password_confirmation"
            onChange={onChange}
            placeholder="Password Confirmation"
            required={true}
            type="password"
            value={user.password_confirmation}
          />
        </div>
        <div className="form-group">
          <div className="text-center">Profile Image</div>
          <File id="sign-up-image" name="image" />
        </div>
        <div className="form-group">
          <div className="form-check">
            <input
              checked={user.post_notifications}
              className="form-check-input"
              id="sign-up-post-notifications"
              name="post_notifications"
              onChange={onChange}
              type="checkbox"
            />
            <label className="form-check-label" htmlFor="sign-up-post-notifications">
              Be notified when a new post is published?
            </label>
          </div>
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-primary px-5">Sign Up</button>
        </div>
      </FormWithFiles>
    </>
  );
}
