import { useEffect, useState } from 'react';
import { Grid, GridColumn, Loader } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';

import ActivityList from './ActivityList';
import { useStore } from '../../../app/stores/store';
import ActivityFilters from './ActivityFilters';
import { PagingParams } from '../../../app/models/Pagination';
import InfiniteScroll from 'react-infinite-scroller';
import ActivityListItemPlaceholder from './ActivityListItemPlaceholder';

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
    setPagingParams(new PagingParams(pagination!.currentPage + 1));
    loadActivities().then(() => setLoadingNext(false));
  };

  useEffect(() => {
    if (activityRegistry.size <= 1) loadActivities();
  }, [activityRegistry.size, loadActivities]);

  return (
    <Grid>
      <Grid.Column width='10'>
        {loadingInitital && !loadingNext ? (
          <>
            <ActivityListItemPlaceholder />
            <ActivityListItemPlaceholder />
          </>
        ) : (
          <InfiniteScroll
            pageStart={0}
            loadMore={handleGetNext}
            hasMore={
              !loadingNext &&
              !!pagination &&
              pagination.currentPage < pagination.totalPages
            }
            initialLoad={false}>
            <ActivityList />
          </InfiniteScroll>
        )}
      </Grid.Column>
      <Grid.Column width='6'>
        <ActivityFilters />
      </Grid.Column>
      <GridColumn width={10}>
        <Loader active={loadingNext} />
      </GridColumn>
    </Grid>
  );
});
