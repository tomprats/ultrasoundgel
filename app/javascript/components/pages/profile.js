import {useContext, useState} from "react";
import {Redirect} from "react-router-dom";
import {Context} from "app";
import {createNotification} from "app/actions/notifications";
import {setUser} from "app/actions/user";
import {update as updateProfile} from "app/requests/profile";
import {FileInput, FormWithFiles} from "components/helpers";

export default function Profile() {
  const [{user}, dispatch] = useContext(Context);
  const [changes, setChanges] = useState({});
  const onChange = ({target: {checked, name, type, value}}) => (
    setChanges({...changes, [name]: type === "checkbox" ? checked : value})
  );
  const onImageChange = (e) => {
    const file = e.target.files[0];

    setChanges({...changes, image: file && file.name});
  };
  const onSubmit = (files) => {
    const updates = {...changes, ...files};

    if(Object.keys(updates).length === 0) {
      return dispatch(createNotification({
        content: "Please make changes before submitting",
        type: "danger"
      }));
    }

    updateProfile({user: updates}).then((data) => {
      dispatch(createNotification({
        content: data.message,
        type: data.success ? "success" : "danger"
      }));

      if(data.success) {
        dispatch(setUser(data.user));
        setChanges({});
      }
    });
  };
  const value = (name) => (
    changes[name] === undefined ? user[name] : changes[name]
  );

  if(!user) { return <Redirect to="/session" />; }

  return (
    <div className="container-fluid">
      <div className="row text-center">
        <div className="col-md-4 offset-md-4">
          <h3>Edit Profile</h3>
          <FormWithFiles onSubmit={onSubmit}>
            <div className="form-group">
              <input
                className="form-control"
                id="profile-first-name"
                name="first_name"
                onChange={onChange}
                placeholder="First Name"
                required={true}
                type="text"
                value={value("first_name") || ""}
              />
            </div>
            <div className="form-group">
              <input
                className="form-control"
                id="profile-last-name"
                name="last_name"
                onChange={onChange}
                placeholder="Last Name"
                required={true}
                type="text"
                value={value("last_name") || ""}
              />
            </div>
            <div className="form-group">
              <input
                className="form-control"
                id="profile-email"
                name="email"
                onChange={onChange}
                placeholder="Email"
                required={true}
                type="email"
                value={value("email") || ""}
              />
            </div>
            <div className="form-group">
              <input
                className="form-control"
                id="profile-password"
                name="password"
                onChange={onChange}
                placeholder="Password"
                type="password"
                value={changes.password || ""}
              />
            </div>
            <div className="form-group">
              <input
                className="form-control"
                id="profile-password-confirmation"
                name="password_confirmation"
                onChange={onChange}
                placeholder="Password Confirmation"
                type="password"
                value={changes.password_confirmation || ""}
              />
            </div>
            <div className="form-group">
              <div className="text-center">Profile Image</div>
              {!changes.image && user.image && (
                <img alt="Profile" className="img-fluid" src={user.image} />
              )}
              <FileInput id="profile-image" name="image" onChange={onImageChange} />
            </div>
            <div className="form-group">
              <div className="form-check">
                <input
                  checked={"post_notifications" in changes ? changes.post_notifications : user.post_notifications}
                  className="form-check-input"
                  id="profile-post-notifications"
                  name="post_notifications"
                  onChange={onChange}
                  type="checkbox"
                />
                <label className="form-check-label" htmlFor="profile-post-notifications">
                  Be notified when a new post is published?
                </label>
              </div>
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-primary px-5">Save Profile</button>
            </div>
          </FormWithFiles>
        </div>
      </div>
    </div>
  );
}
