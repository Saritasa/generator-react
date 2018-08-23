/**
 * Feature module.
 * @module feature
 */

const BaseSubGenerator = require('../_base/BaseSubGenerator');

const DESTINATION_FOLDER = 'features';

const TEMPLATES = {
  files: [
    'components/ExampleHeader.js',
    'links/index.js',
    'pages/ExampleRootPage.js',
    'routes/index.js',
    'links/Root.link.js',
    'routes/paths.js',
    'routes/routeStore.js',
    'index.js',
  ],
};
const NAMED_TEMPLATES = {
  files: ['documentation.yml', 'inject.js'],
};

/**
 * Feature generator class.
 *
 * @extends BaseSubGenerator
 * @type {module.FeatureGenerator}
 */
module.exports = class FeatureGenerator extends BaseSubGenerator {
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
      'feature',
      "Feature's name. Use CamelCase for it. You may use `mainFeatureName/FeatureName` to create sub-feature.",
    );
  }

  /**
   * Calculate path of destination.
   * Lower-cased feature names in paths.
   *
   * @private
   */
  _calcDest() {
    this.options.dest = [
      ...this.options.featureName
        .split('/')
        .filter(Boolean)
        .map(part => `features/${part}`),
      this._dest,
      this.options.name,
    ].join('/');
  }

  /**
   * Calculate module name.
   * Prevent extra "feature" inside module.
   *
   * @private
   */
  _calcModuleName() {
    this.options.moduleName = [this.options.FeatureName, this.options.Name]
      .filter(Boolean)
      .join('/');
  }

  /**
   * Initialize.
   */
  initializing() {
    this.setDestination(DESTINATION_FOLDER);
    super.initializing();
  }

  /**
   * Method for "writing" phase of yeaoman generator.
   */
  writing() {
    this.writeTemplates(TEMPLATES);
    this.writeNamedTemplates(NAMED_TEMPLATES);
  }
};
