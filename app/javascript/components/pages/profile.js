import {useContext, useState} from "react";
import {Redirect} from "react-router-dom";
import {Context} from "app";
import {createNotification} from "app/actions/notifications";
import {setUser} from "app/actions/user";
import {update as updateUser} from "app/requests/user";
import {FileInput, FormWithFiles} from "components/helpers";
import {usePage} from "lib/hooks";

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

    updateUser({user: updates}).then((data) => {
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

  usePage({heading: "Profile"});

  if(!user) { return <Redirect to="/subscribe" />; }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-9">
          <div className="row mt-3">
            <div className="col-lg-6">
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
                    value={value("first_name") || ""}
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
                    value={value("last_name") || ""}
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
                    value={value("email") || ""}
                  />
                </div>
                <div className="input-group mb-4">
                  <input
                    className="form-control py-4"
                    id="user-password"
                    name="password"
                    onChange={onChange}
                    placeholder="password"
                    type="password"
                    value={changes.password || ""}
                  />
                </div>
                <div className="input-group mb-4">
                  <input
                    className="form-control py-4"
                    id="user-password-confirmation"
                    name="password_confirmation"
                    onChange={onChange}
                    placeholder="password confirmation"
                    type="password"
                    value={changes.password_confirmation || ""}
                  />
                </div>
                <div className="input-group mb-4">
                  <FileInput id="user-image" name="image" onChange={onImageChange} />
                </div>
                {!changes.image && user.image && (
                  <div className="row">
                    <div className="col-xl-3 col-lg-6">
                      <img alt="Profile" className="img-fluid mb-4" src={user.image} />
                    </div>
                  </div>
                )}
                <div className="custom-control custom-switch mb-4">
                  <input
                    checked={"post_notifications" in changes ? changes.post_notifications : user.post_notifications}
                    className="custom-control-input"
                    id="user-post-notifications"
                    name="post_notifications"
                    onChange={onChange}
                    type="checkbox"
                  />
                  <label className="custom-control-label" htmlFor="user-post-notifications">Post Notifications</label>
                </div>
                <div className="form-group">
                  <button type="submit" className="btn btn-primary px-5">Save Profile</button>
                </div>
              </FormWithFiles>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
