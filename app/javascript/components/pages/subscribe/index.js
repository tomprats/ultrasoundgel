import {useContext} from "react";
import {Redirect} from "react-router-dom";
import {Context} from "app";
import Session from "./session";
import User from "./user";

export default function Subscribe() {
  const [{user}] = useContext(Context);

  if(user) { return <Redirect to="/profile" />; }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-9">
          <h1 className="page-heading">Subscribe</h1>
          <div className="row mt-3">
            <div className="col-md-6 mb-4">
              <Session />
            </div>
            <div className="col-md-6">
              <User />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
