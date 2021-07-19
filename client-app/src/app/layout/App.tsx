import React from 'react';
import { Container } from 'semantic-ui-react';
import NarBar from './NavBar';
import { observer } from 'mobx-react-lite';
import { Route, useLocation } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import ActivityForm from '../../features/activities/form/ActivityForm';
import ActivityDetails from '../../features/activities/details/ActivityDetails';

function App() {
  const { key } = useLocation();

  return (
    <>
      <Route path='/' component={HomePage} exact />
      <Route
        path={'/(.+)'}
        render={() => (
          <>
            <NarBar />
            <Container style={{ marginTop: '7em' }}>
              <Route path='/activities' component={ActivityDashboard} exact />
              <Route path='/activities/:id' component={ActivityDetails} />
              <Route
                path={['/createActivity', '/manage/:id']}
                component={ActivityForm}
                key={key}
              />
            </Container>
          </>
        )}
      />
    </>
  );
}

export default observer(App);
