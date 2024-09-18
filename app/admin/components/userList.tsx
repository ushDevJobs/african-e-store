// components/UserList.tsx

import React from "react";

interface User {
  id: string;
  fullname: string;
  accountType: string;
  telephone: string;
  status: string;
  email: string;
}

interface UserListProps {
  users: User[];
}

const UserList: React.FC<UserListProps> = ({ users }) => (
  <div className="bg-white shadow-lg rounded-lg p-6">
    <h2 className="text-2xl font-semibold mb-4">Active Users</h2>
    <div className=" min-w-full overflow-x-auto">
      <table className="min-w-full w-max">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 text-left">Name</th>
            <th className="py-2 px-4 text-left">Status</th>
            <th className="py-2 px-4 text-left">Email</th>
            <th className="py-2 px-4 text-left">Account Type</th>
            <th className="py-2 px-4 text-left">Telephone</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-b">
              <td className="py-2 px-4">{user.fullname}</td>
              <td className="py-2 px-4">{user.status}</td>
              <td className="py-2 px-4">{user.email}</td>
              <td className="py-2 px-4">{user.accountType}</td>
              <td className="py-2 px-4">{user.telephone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default UserList;
