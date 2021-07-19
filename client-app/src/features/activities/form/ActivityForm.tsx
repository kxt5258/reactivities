import React, { useState, ChangeEvent, useEffect } from 'react';
import { Form, Segment, Button } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { useParams, useHistory, Link } from 'react-router-dom';
import { v4 as uuid } from 'uuid';

import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';

const ActivityForm = () => {
  const { activityStore } = useStore();
  const {
    createActivity,
    updateActivity,
    loading,
    loadActivity,
    loadingInitital,
    setLoadingInitital,
  } = activityStore;

  const { id } = useParams<{ id: string }>();

  const history = useHistory();

  const [activity, setActivity] = useState({
    id: '',
    title: '',
    date: '',
    description: '',
    category: '',
    city: '',
    venue: '',
  });

  useEffect(() => {
    if (id) {
      loadActivity(id).then((activity) => setActivity(activity!));
    } else {
      setLoadingInitital(false);
    }
  }, [id, loadActivity, setLoadingInitital]);

  const handleSubmit = () => {
    if (activity.id.length === 0) {
      let newActivity = {
        ...activity,
        id: uuid(),
      };
      createActivity(newActivity).then(() =>
        history.push(`/activities/${newActivity.id}`),
      );
    } else {
      updateActivity(activity).then(() =>
        history.push(`/activities/${activity.id}`),
      );
    }
  };

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    // set the value of name to value
    setActivity({ ...activity, [name]: value });
  };

  if (loadingInitital)
    return <LoadingComponent content='Loading Activity...' />;

  return (
    <Segment clearing>
      <Form>
        <Form.Input
          placeholder='Title'
          value={activity.title}
          name='title'
          onChange={handleInputChange}
        />
        <Form.TextArea
          placeholder='Description'
          value={activity.description}
          name='description'
          onChange={handleInputChange}
        />
        <Form.Input
          placeholder='Category'
          value={activity.category}
          name='category'
          onChange={handleInputChange}
        />
        <Form.Input
          type='date'
          placeholder='Date'
          value={activity.date}
          name='date'
          onChange={handleInputChange}
        />
        <Form.Input
          placeholder='City'
          value={activity.city}
          name='city'
          onChange={handleInputChange}
        />
        <Form.Input
          placeholder='Venue'
          value={activity.venue}
          name='venue'
          onChange={handleInputChange}
        />

        <Button
          onClick={handleSubmit}
          loading={loading}
          floated='right'
          positive
          type='submit'
          content='Submit'
        />
        <Button
          as={Link}
          to='/activities'
          floated='right'
          type='button'
          content='Cancel'
        />
      </Form>
    </Segment>
  );
};

export default observer(ActivityForm);
