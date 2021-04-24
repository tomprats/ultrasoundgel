import {useContext} from "react";
import {Redirect} from "react-router-dom";
import {Context} from "app";
import SignIn from "./sign-in";
import SignUp from "./sign-up";

export default function Session() {
  const [{user}] = useContext(Context);

  if(user) { return <Redirect to="/profile" />; }

  return (
    <div className="container-fluid">
      <div className="row text-center">
        <div className="col-md-4 offset-md-1">
          <SignIn />
        </div>
        <div className="col-md-4 offset-md-2">
          <SignUp />
        </div>
      </div>
    </div>
  );
}
