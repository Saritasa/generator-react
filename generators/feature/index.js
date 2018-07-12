const BaseSubGenerator = require('../_base/BaseSubGenerator');

const DESTINATION_FOLDER = 'features';

const TEMPLATES = {
  files: [
    'components/ExampleHeader.js',
    'links/index.js',
    'pages/ExampleRootPage.js',
    'pages/ExampleNestedPage.js',
    'routes/index.js',
    'index.js',
  ],
};
const NAMED_TEMPLATES = {
  files: [
    'documentation.yml',
    'links/root.link.js',
    'links/nested.link.js',
    'routes/paths.js',
    'routes/routeStore.js',
    'inject.js',
  ],
};

module.exports = class FeatureGenerator extends BaseSubGenerator {
  constructor(args, opts) {
    // Calling the super constructor is important so our generator is correctly set up
    super(args, opts);

    this.mainArgument(
      'feature',
      "Feature's name. Use CamelCase for it. You may use `mainFeatureName/FeatureName` to create sub-feature.",
    );
  }

  // used to use lower-cased feature names in paths
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

  // used to use prevent extra "feature" inside module
  _calcModuleName() {
    this.options.moduleName = [this.options.FeatureName, this.options.Name]
      .filter(Boolean)
      .join('/');
  }

  initializing() {
    this.setDestination(DESTINATION_FOLDER);
    super.initializing();
  }

  writing() {
    this.writeTemplates(TEMPLATES);
    this.writeNamedTemplates(NAMED_TEMPLATES);
  }
};
