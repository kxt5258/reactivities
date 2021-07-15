import React from 'react';
import { Card, Image, Button } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import LoadingComponent from '../../../app/layout/LoadingComponent';

const ActivityDetails = () => {
  const { activityStore } = useStore();
  const {
    formOpen,
    cancelSelectedActivity,
    selectedActivity: activity,
  } = activityStore;

  if (!activity) return <LoadingComponent />;

  return (
    <Card fluid>
      <Image src={`/assets/categoryImages/${activity.category}.jpg`} />
      <Card.Content>
        <Card.Header>{activity.title}</Card.Header>
        <Card.Meta>
          <span className='date'>{activity.date}</span>
        </Card.Meta>
        <Card.Description>{activity.description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths='2'>
          <Button
            onClick={() => formOpen(activity.id)}
            basic
            color='blue'
            content='Edit'
          />
          <Button
            onClick={cancelSelectedActivity}
            basic
            color='grey'
            content='Cancel'
          />
        </Button.Group>
      </Card.Content>
    </Card>
  );
};

export default ActivityDetails;
