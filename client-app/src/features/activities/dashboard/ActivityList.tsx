import React, { useState, SyntheticEvent } from 'react';
import { Activity } from '../../../app/models/activity';
import { Segment, ItemGroup, Item, Button, Label } from 'semantic-ui-react';

interface Props {
  activities: Activity[];
  selectActivity: (id: string) => void;
  deleteActivity: (id: string) => void;
  submitting: boolean;
}

const ActivityList = ({
  activities,
  selectActivity,
  deleteActivity,
  submitting,
}: Props) => {
  const [target, setTarget] = useState('');

  const handleDeleteActivity = (
    e: SyntheticEvent<HTMLButtonElement>,
    id: string,
  ) => {
    setTarget(e.currentTarget.name);
    deleteActivity(id);
  };

  return (
    <Segment>
      <ItemGroup divided>
        {activities.map((activity) => (
          <Item key={activity.id}>
            <Item.Content>
              <Item.Header as='a'>{activity.title}</Item.Header>
              <Item.Meta>{activity.date}</Item.Meta>
              <Item.Description>
                <div>{activity.description}</div>
                <div>
                  {activity.city}, {activity.venue}
                </div>
              </Item.Description>
              <Item.Extra>
                <Button
                  onClick={() => selectActivity(activity.id)}
                  floated='right'
                  content='View'
                  color='blue'
                />

                <Button
                  onClick={(e) => handleDeleteActivity(e, activity.id)}
                  floated='right'
                  content='Delete'
                  color='red'
                  loading={submitting && target === activity.id}
                  name={activity.id}
                />
                <Label basic content={activity.category} />
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </ItemGroup>
    </Segment>
  );
};

export default ActivityList;
