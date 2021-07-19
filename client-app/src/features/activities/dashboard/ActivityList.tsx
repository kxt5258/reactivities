import React, { Fragment } from 'react';
import { Header } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';

import ActivityListItem from './ActivityListItem';
import { useStore } from '../../../app/stores/store';

const ActivityList = () => {
  const { activityStore } = useStore();
  const { groupedActivities } = activityStore;

  return (
    <>
      {groupedActivities.map(([group, acitivities]) => (
        <Fragment key={group}>
          <Header sub color='teal'>
            {group}
          </Header>

          {acitivities.map((activity) => (
            <ActivityListItem activity={activity} key={activity.id} />
          ))}
        </Fragment>
      ))}
    </>
  );
};

export default observer(ActivityList);
