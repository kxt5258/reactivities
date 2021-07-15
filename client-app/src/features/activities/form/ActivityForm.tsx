import React, { useState, ChangeEvent } from 'react';
import { Form, Segment, Button } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';

const ActivityForm = () => {
  const { activityStore } = useStore();
  const {
    selectedActivity,
    formClose,
    createActivity,
    updateActivity,
    loading,
  } = activityStore;

  const initialState = selectedActivity ?? {
    id: '',
    title: '',
    date: '',
    description: '',
    category: '',
    city: '',
    venue: '',
  };

  const [activity, setActivity] = useState(initialState);

  const handleSubmit = () => {
    activity.id ? updateActivity(activity) : createActivity(activity);
  };

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    // set the value of name to value
    setActivity({ ...activity, [name]: value });
  };

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
          onClick={formClose}
          floated='right'
          type='button'
          content='Cancel'
        />
      </Form>
    </Segment>
  );
};

export default observer(ActivityForm);
