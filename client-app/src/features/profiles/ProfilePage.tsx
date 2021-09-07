import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';
import { Grid, GridColumn } from 'semantic-ui-react';
import { useStore } from '../../app/stores/store';
import ProfileContent from './ProfileContent';
import ProfileHeader from './ProfileHeader';

const ProfilePage = () => {
  const { username } = useParams<{ username: string }>();
  const { profileStore } = useStore();
  const { profile, loadProfile, setActiveTab } = profileStore;

  useEffect(() => {
    loadProfile(username);
    return () => {
      setActiveTab(0);
    };
  }, [username, loadProfile, setActiveTab]);

  return (
    <Grid>
      <GridColumn width={16}>
        {profile && <ProfileHeader profile={profile} />}
        {profile && <ProfileContent profile={profile} />}
      </GridColumn>
    </Grid>
  );
};

export default observer(ProfilePage);
