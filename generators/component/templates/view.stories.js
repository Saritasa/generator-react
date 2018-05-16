// @flow
import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, boolean, select } from '@storybook/addon-knobs';

import { <%= name %>View } from './<%= name %>.view';

const stories = storiesOf('Components::<%= name %>::View', module);

stories.addDecorator(withKnobs);

stories
  .add('without props', () => <<%= name %>View />);
