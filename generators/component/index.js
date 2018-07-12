const BaseSubGenerator = require('../_base/BaseSubGenerator');

const DESTINATION_FOLDER = 'components';

const TEMPLATES = {
  files: ['index.js'],
};

const NAMED_TEMPLATES = {
  files: ['view.js', 'view.css', 'controller.js', 'documentation.yml'],
  units: ['view.unit.js', 'controller.unit.js'],
  stories: ['view.stories.js'],
};

module.exports = class ComponentGenerator extends BaseSubGenerator {
  constructor(args, opts) {
    // Calling the super constructor is important so our generator is correctly set up
    super(args, opts);

    this.mainArgument(
      'component',
      "Component's name. Use CamelCase for it. You may use `featureName/ComponentName` to create component inside feature.",
    );
  }

  initializing() {
    this.setDestination(DESTINATION_FOLDER);
    super.initializing();
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
  }
};
