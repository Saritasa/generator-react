// @flow
import * as React from 'react';

import { <%= name %>View, type <%= name %>ViewProps } from './<%= name %>.view';

export type <%= name %>ControllerProps = {};
type <%= name %>ControllerState = null;

export class <%= name %>Controller extends React.PureComponent<<%= name %>ControllerProps, <%= name %>ControllerState> {
  // Uncomment default props if need
  // static defaultProps = {};

  getViewProps(): <%= name %>ViewProps {
    return {};
  }

  render() {
    return <<%= name %>View {...this.getViewProps()} />;
  }
}
