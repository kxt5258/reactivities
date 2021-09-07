import { observer } from 'mobx-react-lite';
import {
  Divider,
  Grid,
  GridColumn,
  Header,
  Item,
  ItemContent,
  ItemGroup,
  ItemImage,
  Segment,
  Statistic,
  StatisticGroup,
} from 'semantic-ui-react';
import { Profile } from '../../app/models/Profile';
import FollowButton from './FollowButton';

interface Props {
  profile: Profile;
}

const ProfileHeader = ({ profile }: Props) => {
  return (
    <Segment>
      <Grid>
        <Grid.Column width={12}>
          <ItemGroup>
            <Item>
              <ItemImage
                avatar
                size='small'
                src={profile.image || '/assets/user.png'}
              />
              <ItemContent verticalAlign='middle'>
                <Header as='h1' content={profile.displayName} />
              </ItemContent>
            </Item>
          </ItemGroup>
        </Grid.Column>
        <GridColumn width={4}>
          <StatisticGroup widths={2}>
            <Statistic label='Followers' value={profile.follwersCount} />
            <Statistic label='Following' value={profile.followingCount} />
          </StatisticGroup>
          <Divider />
          <FollowButton profile={profile} />
        </GridColumn>
      </Grid>
    </Segment>
  );
};

export default observer(ProfileHeader);
