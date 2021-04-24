import {useContext, useState} from "react";
import {Context} from "app";
import {createNotification} from "app/actions/notifications";
import {forgotPassword} from "app/requests/session";

export default function ForgotPassword() {
  const dispatch = useContext(Context)[1];
  const [user, setUser] = useState({email: ""});
  const onChange = ({target: {name, value}}) => setUser({...user, [name]: value});
  const onSubmit = (e) => {
    e.preventDefault();

    forgotPassword(user).then((data) => {
      dispatch(createNotification({
        content: data.message,
        type: data.success ? "success" : "danger"
      }));
    });
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="form-group">
        <input
          className="form-control"
          id="forgot-password-email"
          name="email"
          onChange={onChange}
          placeholder="email"
          required={true}
          type="Email"
          value={user.email}
        />
      </div>
      <div className="form-group">
        <button type="submit" className="btn btn-primary px-5">Forgot Password</button>
      </div>
    </form>
  );
}
