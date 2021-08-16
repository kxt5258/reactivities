import { observer } from 'mobx-react-lite';
import React from 'react';
import { Tab, TabPane } from 'semantic-ui-react';
import { Profile } from '../../app/models/Profile';
import ProfilePhotos from './ProfilePhotos';

interface Props {
  profile: Profile;
}

const ProfileContent = ({ profile }: Props) => {
  const panes = [
    { menuItem: 'About', render: () => <TabPane>About Content</TabPane> },
    { menuItem: 'Photos', render: () => <ProfilePhotos profile={profile} /> },
    { menuItem: 'Events', render: () => <TabPane>Events Content</TabPane> },
    {
      menuItem: 'Followers',
      render: () => <TabPane>Followers Content</TabPane>,
    },
    {
      menuItem: 'Followings',
      render: () => <TabPane>Followings Content</TabPane>,
    },
  ];

  return (
    <Tab
      menu={{ fluid: true, vertical: true }}
      menuPosition='right'
      panes={panes}
    />
  );
};

export default observer(ProfileContent);
