import * as React from 'react';
import { shallow } from 'enzyme';

import { <%= name %>Controller } from './<%= name %>.controller';

describe('Component::<%= name %>::controller', function() {
  let props;

  beforeEach(function() {
    props = {}
  });

  function renderDoc(override = {}) {
    return shallow(<<%= name %>Controller {...props} {...override} />);
  }

  it('does not throw an error on render', function() {
    expect(renderDoc).not.to.throw(Error);
  });
});
