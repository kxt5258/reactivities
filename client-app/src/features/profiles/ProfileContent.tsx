import { observer } from 'mobx-react-lite';
import React from 'react';
import { Tab, TabPane } from 'semantic-ui-react';
import { Profile } from '../../app/models/Profile';
import { useStore } from '../../app/stores/store';
import ProfileActivities from './ProfileActivities';
import ProfileFollowings from './ProfileFollowings';
import ProfilePhotos from './ProfilePhotos';

interface Props {
  profile: Profile;
}

const ProfileContent = ({ profile }: Props) => {
  const { profileStore } = useStore();

  const panes = [
    { menuItem: 'About', render: () => <TabPane>About Content</TabPane> },
    { menuItem: 'Photos', render: () => <ProfilePhotos profile={profile} /> },
    { menuItem: 'Events', render: () => <ProfileActivities /> },
    {
      menuItem: 'Followers',
      render: () => <ProfileFollowings />,
    },
    {
      menuItem: 'Followings',
      render: () => <ProfileFollowings />,
    },
  ];

  return (
    <Tab
      menu={{ fluid: true, vertical: true }}
      menuPosition='right'
      panes={panes}
      onTabChange={(e, data) => profileStore.setActiveTab(data.activeIndex)}
    />
  );
};

export default observer(ProfileContent);
