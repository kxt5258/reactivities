import React, { useState, useEffect } from 'react';
import { Container } from 'semantic-ui-react';
import { v4 as uuid } from 'uuid';
import { Activity } from '../models/activity';
import NarBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import agent from '../api/agent';
import LoadingComponent from './LoadingComponent';

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<
    Activity | undefined
  >(undefined);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    agent.activities.list().then((response) => {
      let activities: Activity[] = [];

      response.forEach((activity) => {
        activity.date = activity.date.split('T')[0];
        activities.push(activity);
      });

      setActivities(activities);
      setLoading(false);
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
    setSubmitting(true);

    if (activity.id) {
      agent.activities.update(activity).then(() => {
        setActivities([
          ...activities.filter((x) => x.id !== activity.id),
          activity,
        ]);
        setSelectedActivity(activity);
        setEditMode(false);
        setSubmitting(false);
      });
    } else {
      activity.id = uuid();
      agent.activities.create(activity).then(() => {
        setActivities([...activities, activity]);
        setSelectedActivity(activity);
        setEditMode(false);
        setSubmitting(false);
      });
    }
  }

  function deleteActivity(id: string) {
    setSubmitting(true);
    agent.activities.delete(id).then(() => {
      setActivities(activities.filter((x) => x.id !== id));
      setSubmitting(false);
    });
  }

  return (
    <>
      <NarBar formOpen={handleFormOpen} />
      <Container style={{ marginTop: '7em' }}>
        {loading ? (
          <LoadingComponent content='Loading Activities...' />
        ) : (
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
            submitting={submitting}
          />
        )}
      </Container>
    </>
  );
}

export default App;
