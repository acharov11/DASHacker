// UserDataTable.js
import React from 'react';

const DataTableUser = ({ filteredUsers }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Year</th>
          <th>Courses</th>
        </tr>
      </thead>
      <tbody>
        {filteredUsers.map(user => (
          <tr key={user.email}>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.year}</td>
            <td>{user.courses.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DataTableUser;
