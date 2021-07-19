import React from 'react';
import { Menu, Container, Button } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

export default function NarBar() {
  return (
    <Menu inverted fixed='top'>
      <Container>
        <Menu.Item header as={NavLink} to='/' exact>
          <img
            src='/assets/logo.png'
            alt='logo'
            style={{ marginRight: '10px' }}
          />
          Reactivities
        </Menu.Item>
        <Menu.Item as={NavLink} to='/activities' name='activities'></Menu.Item>
        <Menu.Item as={NavLink} to='/createActivity'>
          <Button positive content='Create Activity'></Button>
        </Menu.Item>
      </Container>
    </Menu>
  );
}
