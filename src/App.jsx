import React, { Component } from 'react';
import AddUser from './AddUser';
import UserTable from './UserTable';
import { Button, Container } from 'reactstrap';

class App extends Component {
  state = { 
    editing: null, 
  };

  render() {
    const { editing } = this.state;
    
    return (
      <Container fluid>
        <Button
          className="my-2"
          color="primary"
          onClick={() => this.setState({ editing: {} })}
        >
          New User
        </Button>
        <UserTable
          canEdit={() => true}
          onEdit={(user) => this.setState({ editing: user })}
        />
        {editing && (
          <AddUser
            user={editing}
            onClose={() => this.setState({ editing: null })}
          />
        )}
      </Container>
    );
  }
}

export default App;
