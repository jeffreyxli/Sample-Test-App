import React from 'react';
import gql from 'graphql-tag';
import {
  Button,
  Form,
  FormGroup,
  Label,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';
import { Form as FinalForm, Field } from 'react-final-form';
import client from './apollo';
import { GET_USERS } from './UserTable';

const CREATE_USER = gql`
  mutation CreateUser($input: UserInput!) {
    createUser(input: $input) {
      id
    }
  }
`;

const AddUser = ({ user, onClose }) => (
  <FinalForm
    onSubmit={async ({ id, username, age, email }) => {
      const input = { id, username, age, email };

      await client.mutate({
        variables: { input },
        mutation: CREATE_USER,
        refetchQueries: () => [{ query: GET_USERS }],
      });
      onClose();
    }}
    initialValues={user}
    render={({ handleSubmit, pristine, invalid }) => (
      <Modal isOpen toggle={onClose}>
        <Form onSubmit={handleSubmit}>
          <ModalHeader toggle={onClose}>
            {user.id ? 'Edit Post' : 'New Post'}
          </ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label>Username</Label>
              <Field
                required
                name="username"
                className="form-control"
                component="input"
              />
            </FormGroup>
            <FormGroup>
              <Label>Age</Label>
              <Field
                required
                name="age"
                className="form-control"
                component="input"
              />
            </FormGroup>
            <FormGroup>
              <Label>Email</Label>
              <Field
                required
                name="email"
                className="form-control"
                component="input"
              />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button type="submit" disabled={pristine} color="primary">Save</Button>
            <Button color="secondary" onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </Form>
      </Modal>
    )}
  />
);

export default AddUser;