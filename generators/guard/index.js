const BaseSubGenerator = require('../_base/BaseSubGenerator');

const DESTINATION_FOLDER = 'guards';

const TEMPLATES = {
  files: ['index.js'],
};

const NAMED_TEMPLATES = {
  files: ['component.js', 'connect.js', 'documentation.yml'],
  units: ['component.unit.js'],
};

module.exports = class ComponentGenerator extends BaseSubGenerator {
  constructor(args, opts) {
    // Calling the super constructor is important so our generator is correctly set up
    super(args, opts);

    this.mainArgument(
      'guard',
      "Guard's name. Use CamelCase for it. You may use `featureName/GuardName` to create guard inside feature.",
    );
  }

  transformName(name) {
    return `${name}Guard`;
  }

  initializing() {
    this.setDestination(DESTINATION_FOLDER);
    super.initializing();
  }

  install() {
    super.install(['react', 'react-dom'], { save: true });
  }

  writing() {
    this.writeTemplates(TEMPLATES);
    this.writeNamedTemplates(NAMED_TEMPLATES);
  }
};
