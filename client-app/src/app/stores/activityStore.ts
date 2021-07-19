import { makeAutoObservable, runInAction } from 'mobx';
import { Activity } from '../models/activity';
import agent from '../api/agent';

export default class ActivityStore {
  activityRegistry = new Map<string, Activity>();
  selectedActivity: Activity | undefined = undefined;
  editMode: boolean = false;
  loading: boolean = false;
  loadingInitital: boolean = true;
  editting: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  get activitiesByDate() {
    return Array.from(this.activityRegistry.values()).sort(
      (a, b) => Date.parse(a.date) - Date.parse(b.date),
    );
  }

  loadActivities = async () => {
    try {
      const activitiesList = await agent.activities.list();

      activitiesList.forEach((activity) => {
        this.setActivity(activity);
      });
      this.setLoadingInitital(false);
    } catch (error) {
      console.log(error);
      this.setLoadingInitital(false);
    }
  };

  loadActivity = async (id: string) => {
    let activity = this.getActivity(id);
    if (activity) {
      this.selectedActivity = activity;
      return activity;
    } else {
      this.loadingInitital = true;
      try {
        activity = await agent.activities.detail(id);
        this.setActivity(activity);
        runInAction(() => {
          this.selectedActivity = activity;
        });

        this.setLoadingInitital(false);
        return activity;
      } catch (error) {
        console.log(error);
        this.setLoadingInitital(false);
      }
    }
  };

  private setActivity = (activity: Activity) => {
    activity.date = activity.date.split('T')[0];
    this.activityRegistry.set(activity.id, activity);
  };

  private getActivity = (id: string) => {
    return this.activityRegistry.get(id);
  };

  setLoadingInitital = (value: boolean) => {
    this.loadingInitital = value;
  };

  createActivity = async (activity: Activity) => {
    this.loading = true;

    try {
      await agent.activities.create(activity);
      runInAction(() => {
        this.activityRegistry.set(activity.id, activity);
        this.selectedActivity = activity;
        this.loading = false;
        this.editMode = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
        this.editMode = false;
      });
    }
  };

  updateActivity = async (activity: Activity) => {
    this.loading = true;

    try {
      await agent.activities.update(activity);
      runInAction(() => {
        this.activityRegistry.set(activity.id, activity);
        this.selectedActivity = activity;
        this.editMode = false;
        this.loading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
        this.editMode = false;
      });
    }
  };

  deleteActivity = async (id: string) => {
    this.loading = true;

    try {
      await agent.activities.delete(id);
      runInAction(() => {
        this.activityRegistry.delete(id);
        this.loading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
      });
    }
  };
}
