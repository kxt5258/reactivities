import React from 'react';
import { Menu, Container, Button } from 'semantic-ui-react';
import { useStore } from '../stores/store';

export default function NarBar() {
  const { activityStore } = useStore();

  return (
    <Menu inverted fixed='top'>
      <Container>
        <Menu.Item header>
          <img
            src='/assets/logo.png'
            alt='logo'
            style={{ marginRight: '10px' }}
          />
          Reactivities
        </Menu.Item>
        <Menu.Item name='activities'></Menu.Item>
        <Menu.Item>
          <Button
            onClick={() => activityStore.formOpen()}
            positive
            content='Create Activity'></Button>
        </Menu.Item>
      </Container>
    </Menu>
  );
}
