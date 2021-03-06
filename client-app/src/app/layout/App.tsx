import { useEffect } from 'react';
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
import LoginForm from '../../features/users/LoginForm';
import { useStore } from '../stores/store';
import LoadingComponent from './LoadingComponent';
import ModalContainer from '../common/modals/ModalContainer';
import ProfilePage from '../../features/profiles/ProfilePage';
import PrivateRoute from './PrivateRoute';

function App() {
  const { key } = useLocation();
  const { commonStore, userStore } = useStore();

  useEffect(() => {
    if (commonStore.token) {
      userStore.getUser().finally(() => commonStore.setAppLoaded());
    } else {
      commonStore.setAppLoaded();
    }
  }, [commonStore, userStore]);

  if (!commonStore.appLoaded) return <LoadingComponent content='Loading App' />;

  return (
    <>
      <ToastContainer position='bottom-right' hideProgressBar />
      <ModalContainer />
      <Route path='/' component={HomePage} exact />
      <Route
        path={'/(.+)'}
        render={() => (
          <>
            <NarBar />
            <Container style={{ marginTop: '7em' }}>
              <Switch>
                <PrivateRoute
                  path='/activities'
                  component={ActivityDashboard}
                  exact
                />
                <PrivateRoute
                  path='/activities/:id'
                  component={ActivityDetails}
                />
                <PrivateRoute
                  path={['/createActivity', '/manage/:id']}
                  component={ActivityForm}
                  key={key}
                />
                <PrivateRoute
                  path='/profiles/:username'
                  component={ProfilePage}
                />
                <PrivateRoute path='/errors' component={TestErrors} />
                <Route path='/server-error' component={ServerError} />
                <Route path='/login' component={LoginForm} />
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
