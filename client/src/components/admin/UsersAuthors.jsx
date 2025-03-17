import { useEffect, useState } from "react";
import axios from "axios";

const UsersAuthors = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    try {
      const res = await axios.get("http://localhost:3000/admin-api/users-authors");
      setUsers(res.data.payload);
    } catch (err) {
      console.error("Failed to load users/authors");
    }
  }

  async function toggleUser(id) {
    await axios.put(`http://localhost:3000/admin-api/toggle-user/${id}`);
    fetchUsers();
  }

  return (
    <div>
      <h2>Users & Authors</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <td>{user.firstName} {user.lastName}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{user.isActive ? "Active" : "Blocked"}</td>
              <td>
                <button 
                  className={`btn ${user.isActive ? "btn-danger" : "btn-success"}`} 
                  onClick={() => toggleUser(user._id)}
                >
                  {user.isActive ? "Block" : "Enable"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersAuthors;
