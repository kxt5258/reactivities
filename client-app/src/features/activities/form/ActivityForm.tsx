import React, { useState, useEffect } from 'react';
import { Segment, Button, Header } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { useParams, useHistory, Link } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import { Formik, Form } from 'formik';

import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import * as Yup from 'yup';
import MyTextInput from '../../../app/common/form/MyTextInput';
import MyTextArea from '../../../app/common/form/MyTextArea';
import MySelectInput from '../../../app/common/form/MySelectInput';
import { categoryOptions } from '../../../app/common/options/categoryOptions';
import MyDateInput from '../../../app/common/form/MyDateInput';
import { Activity } from '../../../app/models/activity';

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

  const [activity, setActivity] = useState<Activity>({
    id: '',
    title: '',
    date: null,
    description: '',
    category: '',
    city: '',
    venue: '',
  });

  const validationSchema = Yup.object({
    title: Yup.string().required('Activity title is required'),
    description: Yup.string().required('Activity description is required'),
    category: Yup.string().required(),
    date: Yup.string().required('Date is required').nullable(),
    city: Yup.string().required(),
    venue: Yup.string().required(),
  });

  useEffect(() => {
    if (id) {
      loadActivity(id).then((activity) => setActivity(activity!));
    } else {
      setLoadingInitital(false);
    }
  }, [id, loadActivity, setLoadingInitital]);

  const handleFormSubmit = (activity: Activity) => {
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

  if (loadingInitital)
    return <LoadingComponent content='Loading Activity...' />;

  return (
    <Segment clearing>
      <Header content='Activity Details' sub color='teal' />
      <Formik
        initialValues={activity}
        enableReinitialize
        validationSchema={validationSchema}
        onSubmit={(values) => handleFormSubmit(values)}>
        {({ handleSubmit, isValid, isSubmitting, dirty }) => (
          <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
            <MyTextInput name='title' placeholder='Title' />
            <MyTextArea placeholder='Description' name='description' rows={4} />
            <MySelectInput
              placeholder='Category'
              name='category'
              options={categoryOptions}
            />
            <MyDateInput
              placeholderText='Date'
              name='date'
              showTimeSelect
              timeCaption='time'
              dateFormat='MMMM d, yyyy h:mm aa'
            />

            <Header content='Location Details' sub color='teal' />
            <MyTextInput placeholder='City' name='city' />
            <MyTextInput placeholder='Venue' name='venue' />

            <Button
              disabled={isSubmitting || !dirty || !isValid}
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
        )}
      </Formik>
    </Segment>
  );
};

export default observer(ActivityForm);
