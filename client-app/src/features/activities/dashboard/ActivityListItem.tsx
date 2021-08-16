import React from 'react';
import { Item, Button, Segment, Icon, Label } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { ActivityListenItemAttendee } from './ActivityListenItemAttendee';

interface Props {
  activity: Activity;
}

const ActivityListItem = ({ activity }: Props) => {
  return (
    <Segment.Group>
      {activity.isCancelled && (
        <Label
          attached='top'
          color='red'
          content='Cancelled'
          style={{ textAlign: 'center' }}></Label>
      )}
      <Segment>
        <Item.Group>
          <Item>
            <Item.Image
              size='tiny'
              circular
              src={activity.host?.image || '/assets/user.png'}
              as={Link}
              to={`/profiles/${activity.host?.username}`}
            />
            <Item.Content>
              <Item.Header as={Link} to={`/activities/${activity.id}`}>
                {activity.title}
              </Item.Header>
              <Item.Description>
                Hosted by{' '}
                <Link to={`/profiles/${activity.host?.username}`}>
                  {activity.host?.displayName}
                </Link>
                {activity.isHost && (
                  <Item.Description>
                    <Label color='orange' basic>
                      You're hosting this activity
                    </Label>
                  </Item.Description>
                )}
                {activity.isGoing && !activity.isHost && (
                  <Item.Description>
                    <Label color='green' basic>
                      You're going to this activity
                    </Label>
                  </Item.Description>
                )}
              </Item.Description>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>

      <Segment>
        <span>
          <Icon name='clock' /> {format(activity.date!, 'dd MMM yyyy h:mm aa')}
          <Icon name='marker' /> {activity.venue}
        </span>
      </Segment>
      <Segment secondary>
        <ActivityListenItemAttendee attendees={activity.attendees!} />
      </Segment>
      <Segment clearing>
        <span>{activity.description}</span>
        <Button
          as={Link}
          to={`/activities/${activity.id}`}
          color='teal'
          floated='right'
          content='View'
        />
      </Segment>
    </Segment.Group>
  );
};

export default ActivityListItem;
