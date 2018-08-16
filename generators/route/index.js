const BaseSubGenerator = require('../_base/BaseSubGenerator');

const DESTINATION_FOLDER = null;

const TEMPLATES = {};

const NAMED_TEMPLATES = {
  files: ['links/link.js'],
  units: ['links/link.unit.js'],
};

const PARTED_TEMPLATES = {
  files: [
    'links/index.js',
    'routes/paths.js',
    'routes/documentation.yml',
    'links/documentation.yml',
  ],
};

const PARTED_NAMED_TEMPLATES = {};

module.exports = class PageGenerator extends BaseSubGenerator {
  constructor(args, opts) {
    // Calling the super constructor is important so our generator is correctly set up
    super(args, opts);

    this.mainArgument(
      'route',
      "Route's name. Use CamelCase for it. You may use `featureName/RouteName` to create route inside feature.",
    );
  }

  transformModuleName(name) {
    const parts = name.split('/');

    parts.pop();
    parts.pop();

    return parts.join('/');
  }

  initializing() {
    this.setDestination(DESTINATION_FOLDER);
    super.initializing();
    this.options.linksModuleName = this.options.moduleName ? `${this.options.moduleName}/Routing/links` : 'Routing/links';
    this.options.routesModuleName = this.options.moduleName ? `${this.options.moduleName}/Routing/routes` : 'Routing/routes';
  }

  install() {
    super.install(['react', 'react-dom', 'recompose', 'classnames'], { save: true });
    super.install(
      [
        '@storybook/react',
        '@storybook/addon-knobs',
        '@storybook/addon-links',
        '@storybook/addon-actions',
      ],
      { 'save-dev': true },
    );
  }

  writing() {
    this.writeTemplates(TEMPLATES);
    this.writeNamedTemplates(NAMED_TEMPLATES);
    this.writeMissedTemplates(PARTED_TEMPLATES);
    this.writeMissedNamedTemplates(PARTED_NAMED_TEMPLATES);
    this.appendTemplates(PARTED_TEMPLATES);
    this.appendNamedTemplates(PARTED_NAMED_TEMPLATES);
  }
};
