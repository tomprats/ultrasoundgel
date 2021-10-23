import {Redirect} from "react-router-dom";
import useAppContext from "lib/hooks/use-app-context";
import SignIn from "./sign-in";
import SignUp from "./sign-up";

export default function Session() {
  const [{user}] = useAppContext();

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
