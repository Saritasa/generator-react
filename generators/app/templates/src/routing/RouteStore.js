// @flow
import { Route } from 'react-router-dom';

type RouteShape = React.ElementProps<typeof Route>;

export class RouteStore {
  routes: Array<RouteShape> = [];
  subscribers: Array<(Array<RouteShape>) => void> = [];

  subscribe(callback: (Array<RouteShape>) => void) {
    this.subscribers.push(callback);
    callback(this.routes);
  }

  inject(routes: Array<RouteShape>) {
    this.routes.push(...routes);
    this.callSubscribers();
  }

  callSubscribers() {
    this.subscribers.forEach(cb => cb(this.routes));
  }
}