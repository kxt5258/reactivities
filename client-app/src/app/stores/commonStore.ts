import { ServerErrorInterface } from '../../features/errors/serverErrorInterface';
import { makeAutoObservable } from 'mobx';

export default class CommonStore {
  error: ServerErrorInterface | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  setServerError = (error: ServerErrorInterface) => {
    this.error = error;
  };
}
