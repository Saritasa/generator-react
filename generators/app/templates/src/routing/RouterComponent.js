// @flow
import * as React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'

import { RouteStore } from './RouteStore'

type RouterComponentProps = {| routeStore: RouteStore |};
type RouterComponentState = { routeStore: ?RouteStore, routes: Array<*> };

export class RouterComponent extends React.PureComponent<RouterComponentProps, RouterComponentState> {
  static getDerivedStateFromProps(props, state) {
    if (!state.routeStore) {
      return state.routeStore;
    }

    if (props.routeStore !== state.routeStore) {
      throw new Error('Can\'t update routeStore in hot mode.');
    }

    return state;
  }

  state = { routes: [], routeStore: null };

  componentDidMount() {
    if (!this.state.routeStore) {
      throw new Error('componentDidMount called without #routeStore. This should never happened. Please change if you passed #routeStore property to RouteComponent.');
    }
    this.state.routeStore.subscribe(this.handleRouteUpdates)
  }

  render() {
    return (
      <Routes>
        {this.state.routes.map(route => <Route {...route} />)}
      </Routes>
    );
  }
}