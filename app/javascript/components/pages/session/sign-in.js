import {useState} from "react";
import {createNotification} from "app/actions/notifications";
import {setUser} from "app/actions/user";
import {create as createSession} from "app/requests/session";
import useAppContext from "lib/hooks/use-app-context";
import useToggle from "lib/hooks/use-toggle";
import ForgotPassword from "./forgot-password";

export default function SignIn() {
  const dispatch = useAppContext()[1];
  const [showForgotPassword, toggleForgotPassword] = useToggle(false);
  const [user, setChanges] = useState({email: "", password: ""});
  const onChange = ({target: {name, value}}) => setChanges({...user, [name]: value});
  const onSubmit = (e) => {
    e.preventDefault();

    createSession({user}).then((data) => {
      dispatch(createNotification({
        content: data.message,
        type: data.success ? "success" : "danger"
      }));

      if(data.success) { dispatch(setUser(data.user)); }
    });
  };

  return (
    <>
      <h3>Sign In</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <input
            className="form-control"
            id="sign-in-email"
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
            id="sign-in-password"
            name="password"
            onChange={onChange}
            placeholder="Password"
            required={true}
            type="password"
            value={user.password}
          />
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-primary px-5">Sign In</button>
          <button className="btn btn-link btn-sm" onClick={toggleForgotPassword} type="button">Forgot Password?</button>
        </div>
      </form>
      {showForgotPassword && <ForgotPassword />}
    </>
  );
}
