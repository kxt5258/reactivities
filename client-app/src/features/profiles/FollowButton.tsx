import { observer } from 'mobx-react-lite';
import { SyntheticEvent } from 'react';
import { Reveal, RevealContent, Button } from 'semantic-ui-react';
import { Profile } from '../../app/models/Profile';
import { useStore } from '../../app/stores/store';

interface Props {
  profile: Profile;
}

const FollowButton = ({ profile }: Props) => {
  const { profileStore, userStore } = useStore();
  const { updateFollowing, loading } = profileStore;

  if (userStore.user?.username === profile.username) return null;

  const handleFollow = (e: SyntheticEvent, username: string) => {
    e.preventDefault();

    profile.following
      ? updateFollowing(username, false)
      : updateFollowing(username, true);
  };

  return (
    <Reveal animated='move'>
      <RevealContent visible style={{ width: '100%' }}>
        <Button
          fluid
          color='teal'
          content={profile.following ? 'Following' : 'Not following'}
        />
      </RevealContent>
      <RevealContent hidden style={{ width: '100%' }}>
        <Button
          fluid
          basic
          color={profile.following ? 'red' : 'green'}
          content={profile.following ? 'Unfollow' : 'Follow'}
          loading={loading}
          onClick={(e) => handleFollow(e, profile.username)}
        />
      </RevealContent>
    </Reveal>
  );
};

export default observer(FollowButton);
