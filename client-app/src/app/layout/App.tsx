import React from 'react';
import { Container } from 'semantic-ui-react';
import { ToastContainer } from 'react-toastify';

import NarBar from './NavBar';
import { observer } from 'mobx-react-lite';
import { Route, useLocation, Switch } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import ActivityForm from '../../features/activities/form/ActivityForm';
import ActivityDetails from '../../features/activities/details/ActivityDetails';
import TestErrors from '../../features/errors/TestError';
import NotFound from '../../features/errors/NotFound';
import ServerError from '../../features/errors/ServerError';

function App() {
  const { key } = useLocation();

  return (
    <>
      <ToastContainer position='bottom-right' hideProgressBar />
      <Route path='/' component={HomePage} exact />
      <Route
        path={'/(.+)'}
        render={() => (
          <>
            <NarBar />
            <Container style={{ marginTop: '7em' }}>
              <Switch>
                <Route path='/activities' component={ActivityDashboard} exact />
                <Route path='/activities/:id' component={ActivityDetails} />
                <Route
                  path={['/createActivity', '/manage/:id']}
                  component={ActivityForm}
                  key={key}
                />
                <Route path='/errors' component={TestErrors} />
                <Route path='/server-error' component={ServerError} />
                <Route component={NotFound} />
              </Switch>
            </Container>
          </>
        )}
      />
    </>
  );
}

export default observer(App);
