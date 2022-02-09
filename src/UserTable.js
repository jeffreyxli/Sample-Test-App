import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Table } from 'reactstrap';

export const GET_USERS = gql`
  query GetUsers {
    users {
      id
      username
      age
      email
    }
  }
`;

const rowStyles = (user, canEdit) => canEdit(user)
  ? { cursor: 'pointer', fontWeight: 'bold' }
  : {};

const UserTable = ({ canEdit, onEdit }) => (
  <Query query={GET_USERS}>
    {({ loading, data }) => !loading && (
      <Table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Age</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {data.users.map(user => (
            <tr 
                key={user.id}
                style={rowStyles(user, canEdit)}
                onClick={() => canEdit(user) && onEdit(user)}
            >
              <td>{user.username}</td>
              <td>{user.age}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    )}
  </Query>
);

UserTable.defeaultProps = {
    canEdit: () => false,
    onEdit: () => null
};

export default UserTable;