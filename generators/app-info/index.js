/**
 * AppInfo module.
 * @module appInfo
 */

const BaseSubGenerator = require('../_base/BaseSubGenerator');

const DESTINATION_FOLDER = 'appInfos';

const TEMPLATES = {
  files: ['index.js'],
};

const NAMED_TEMPLATES = {
  files: [
    'actions.js',
    'actionTypes.js',
    'documentation.yml',
    'inject.js',
    'reducer.js',
    'sagas.js',
    'selectors.js',
    'utils.js',
  ],
  units: [
    'actions.unit.js',
    'actionTypes.unit.js',
    'reducer.unit.js',
    'sagas.unit.js',
    '__mocks__/utils.js',
    'selectors.unit.js',
    'utils.unit.js',
  ],
};

/**
 * Entity generator class.
 *
 * @extends BaseSubGenerator
 * @type {module.EntityGenerator}
 */
module.exports = class EntityGenerator extends BaseSubGenerator {
  /**
   * Setup.
   *
   * @param {string|Array} args - Arguments at initialization.
   * @param {Object} opts - Options at initialization.
   */
  constructor(args, opts) {
    // Calling the super constructor is important so our generator is correctly set up
    super(args, opts);

    this.mainArgument(
      'appInfo',
      "AppInfo's name. Use CamelCase for it. You may use `featureName/AppInfoName` to create sub-appInfo.",
    );
  }

  /**
   * Initialize.
   */
  initializing() {
    this.setDestination(DESTINATION_FOLDER);
    super.initializing();
  }

  /**
   * Install.
   */
  install() {
    super.install(['immutable', 'reselect', 'redux-saga'], {
      save: true,
    });
  }

  /**
   * Method for "writing" phase of yeaoman generator.
   */
  writing() {
    this.writeTemplates(TEMPLATES);
    this.writeNamedTemplates(NAMED_TEMPLATES);
  }
};
