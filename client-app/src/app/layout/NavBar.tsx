import { Menu, Container, Button, Image, Dropdown } from 'semantic-ui-react';
import { Link, NavLink } from 'react-router-dom';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';

function NarBar() {
  const {
    userStore: { user, logout },
  } = useStore();

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
        <Menu.Item as={NavLink} to='/errors' name='errors'></Menu.Item>
        <Menu.Item as={NavLink} to='/createActivity'>
          <Button positive content='Create Activity'></Button>
        </Menu.Item>
        <Menu.Item position='right'>
          <Image
            src={user?.image || '/assets/user.png'}
            avatar
            spaced='right'
          />
          <Dropdown pointing='top left' text={user?.displayName}>
            <Dropdown.Menu>
              <Dropdown.Item
                as={Link}
                to={`/profile/${user?.username}`}
                text='My Profile'
              />
              <Dropdown.Item onClick={logout} text='Logout' icon='power' />
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Item>
      </Container>
    </Menu>
  );
}

export default observer(NarBar);
