import {useEffect, useState} from "react";
import {getAll as getUsers} from "app/requests/admin/users";
import Row from "./row";

export default function AdminUsersList() {
  const [users, setUsers] = useState([]);
  const onDestroy = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  useEffect(() => {
    getUsers().then((data) => setUsers(data.users));
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <h1 className="text-center">Users</h1>
          <div className="text-right mb-1">
            <a className="btn btn-outline-secondary btn-sm" href="/admin/users/new">Invite</a>
          </div>
          <div className="table-responsive rounded">
            <table className="table table-hover text-center">
              <thead className="thead-dark">
                <tr>
                  <th>Admin</th>
                  <th>Subscribed</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Date Created</th>
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
