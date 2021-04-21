import {useContext, useState} from "react";
import {Redirect} from "react-router-dom";
import {Context} from "app";
import {createNotification} from "app/actions/notifications";
import {forgotPassword} from "app/requests/session";

export default function ForgotPassword() {
  const [{user}, dispatch] = useContext(Context);
  const [email, setEmail] = useState("");
  const onSubmit = (e) => {
    e.preventDefault();

    forgotPassword({email}).then((data) => {
      dispatch(createNotification({
        content: data.message,
        type: data.success ? "success" : "danger"
      }));
    });
  };

  if(user) { return <Redirect to="/profile" />; }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-9">
          <div className="row mt-3">
            <div className="col-lg-6">
              <form onSubmit={onSubmit}>
                <div className="input-group mb-4">
                  <input
                    className="form-control py-4"
                    id="session-email"
                    name="email"
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email"
                    required={true}
                    type="email"
                    value={email}
                  />
                </div>
                <div className="form-group">
                  <button type="submit" className="btn btn-primary px-5">Submit</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
