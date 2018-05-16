// @flow
import * as React from 'react';
import { pure } from 'recompose';
import classNames from 'classnames/bind';

import styles from './<%= name %>.view.css';

// Use css-modules. This allows to use `cls('root') that returns styles.root's value that is real classname.
const cls = classNames.bind(styles);

export type <%= name %>ViewProps = {};

/**
 * View part of <%= name %> component.
 * @params {<%= name %>ViewProps} $1 Props passed from parent component.
 * @returns {?React.Node}
 */
export const <%= name %>ViewPlain = ({}: <%= name %>ViewProps) => (
  <div className={cls('root')}>
    <%= name %>View works!
  </div>
);

// Uncomment default props if need
// <%= name %>View.defaultProps = {};

export const <%= name %>View = pure(<%= name %>ViewPlain);