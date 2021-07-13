import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container } from 'semantic-ui-react';
import { v4 as uuid } from 'uuid';
import { Activity } from '../models/activity';
import NarBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<
    Activity | undefined
  >(undefined);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    axios
      .get<Activity[]>('http://localhost:5000/api/activities')
      .then((res) => {
        setActivities(res.data);
      });
  }, []);

  function handleSelectedActivity(id: string) {
    setSelectedActivity(activities.find((x) => x.id === id));
  }

  function handleCancelActivity() {
    setSelectedActivity(undefined);
  }

  function handleFormOpen(id?: string) {
    id ? handleSelectedActivity(id) : handleCancelActivity();
    setEditMode(true);
  }

  function handleFormClose() {
    setEditMode(false);
  }

  function handleCreateOrEditActivity(activity: Activity) {
    activity.id
      ? setActivities([
          ...activities.filter((x) => x.id !== activity.id),
          activity,
        ])
      : setActivities([...activities, { ...activity, id: uuid() }]);

    setEditMode(false);
    setSelectedActivity(activities[activities.length - 1]);
  }

  function deleteActivity(id: string) {
    setActivities(activities.filter((x) => x.id !== id));
  }

  return (
    <>
      <NarBar formOpen={handleFormOpen} />
      <Container style={{ marginTop: '7em' }}>
        <ActivityDashboard
          activities={activities}
          selectedActivity={selectedActivity}
          selectActivity={handleSelectedActivity}
          cancelActivity={handleCancelActivity}
          editMode={editMode}
          formOpen={handleFormOpen}
          formClose={handleFormClose}
          createOrEdit={handleCreateOrEditActivity}
          deleteActivity={deleteActivity}
        />
      </Container>
    </>
  );
}

export default App;
