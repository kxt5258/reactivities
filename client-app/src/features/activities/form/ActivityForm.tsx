import React, { useState, ChangeEvent } from 'react';
import { Form, Segment, Button } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';

interface Props {
  activity: Activity | undefined;
  formClose: () => void;
  createOrEdit: (activity: Activity) => void;
}

const ActivityForm = ({
  formClose,
  activity: selectedActivity,
  createOrEdit,
}: Props) => {
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
    createOrEdit(activity);
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
          placeholder='Date'
          value={activity.date}
          name='title'
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

export default ActivityForm;
