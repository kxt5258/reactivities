import { useEffect, useState } from 'react';
import { Button, Grid } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';

import ActivityList from './ActivityList';
import { useStore } from '../../../app/stores/store';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import ActivityFilters from './ActivityFilters';
import { PagingParams } from '../../../app/models/Pagination';
import { toJS } from 'mobx';

export default observer(function ActivityDashboard() {
  const { activityStore } = useStore();
  const {
    loadActivities,
    activityRegistry,
    loadingInitital,
    setPagingParams,
    pagination,
  } = activityStore;
  const [loadingNext, setLoadingNext] = useState(false);

  const handleGetNext = () => {
    setLoadingNext(true);
    console.log('PAGINATION IS ', toJS(pagination));
    setPagingParams(new PagingParams(pagination!.currentPage + 1));
    loadActivities().then(() => setLoadingNext(false));
  };

  useEffect(() => {
    if (activityRegistry.size <= 1) loadActivities();
  }, [activityRegistry.size, loadActivities]);

  return loadingInitital ? (
    <LoadingComponent content='Loading Activities...' />
  ) : (
    <Grid>
      <Grid.Column width='10'>
        <ActivityList />
        <Button
          floated='right'
          content='More...'
          positive
          onClick={handleGetNext}
          loading={loadingNext}
          disabled={pagination?.totalPages === pagination?.currentPage}
        />
      </Grid.Column>
      <Grid.Column width='6'>
        <ActivityFilters />
      </Grid.Column>
    </Grid>
  );
});
