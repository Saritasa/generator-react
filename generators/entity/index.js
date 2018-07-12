const BaseSubGenerator = require('../_base/BaseSubGenerator');

const DESTINATION_FOLDER = 'entities';

const TEMPLATES = {
  files: ['index.js'],
};

const NAMED_TEMPLATES = {
  files: [
    'actions.js',
    'actionTypes.js',
    'api.js',
    'documentation.yml',
    'dto.js',
    'inject.js',
    'record.js',
    'reducer.js',
    'sagas.js',
    'schema.js',
    'selectors.js',
    'utils.js',
  ],
  units: ['actions.unit.js', 'actionTypes.unit.js', 'reducer.unit.js', 'schema.unit.js'],
};

module.exports = class EntityGenerator extends BaseSubGenerator {
  constructor(args, opts) {
    // Calling the super constructor is important so our generator is correctly set up
    super(args, opts);

    this.mainArgument(
      'entity',
      "Entities's name. Use CamelCase for it. You may use `featureName/EntityName` to create sub-entity.",
    );
  }

  initializing() {
    this.setDestination(DESTINATION_FOLDER);
    super.initializing();
  }

  install() {
    super.install(['immutable', 'reselect', 'redux-saga', 'axios', 'ajv'], {
      save: true,
    });
  }

  writing() {
    this.writeTemplates(TEMPLATES);
    this.writeNamedTemplates(NAMED_TEMPLATES);
  }
};
