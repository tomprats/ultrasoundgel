import {useEffect, useState} from "react";
import {getAll as getUsers} from "app/requests/admin/users";
import {Loading} from "components/pages";
import Row from "./row";

export default function AdminUsersList() {
  const [users, setUsers] = useState(null);
  const onDestroy = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  useEffect(() => {
    getUsers().then((data) => setUsers(data.users));
  }, []);

  if(!users) { return <Loading />; }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-10 offset-md-1">
          <h1 className="text-center">Users</h1>
          <div className="table-responsive rounded">
            <table className="table table-hover text-center">
              <thead className="thead-dark">
                <tr>
                  <th>Admin</th>
                  <th>Email</th>
                  <th>Name</th>
                  <th>Created At</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <Row key={user.id} onDestroy={onDestroy} user={user} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
