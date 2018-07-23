/**
 * Guard module.
 * @module guard
 */

const BaseSubGenerator = require('../_base/BaseSubGenerator');

const DESTINATION_FOLDER = 'guards';

const TEMPLATES = {
  files: ['index.js'],
};

const NAMED_TEMPLATES = {
  files: ['component.js', 'connect.js', 'documentation.yml'],
  units: ['component.unit.js'],
};

/**
 * Guard generator class.
 *
 * @extends BaseSubGenerator
 * @type {module.GuardGenerator}
 */
module.exports = class GuardGenerator extends BaseSubGenerator {
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
      'guard',
      "Guard's name. Use CamelCase for it. You may use `featureName/GuardName` to create guard inside feature.",
    );
  }

  /**
   * Transform name.
   *
   * @param {string} name - Name to transform.
   * @returns {string} - Transformed name.
   */
  transformName(name) {
    return `${name}Guard`;
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
    super.install(['react', 'react-dom'], { save: true });
  }

  /**
   * Method for "writing" phase of yeaoman generator.
   */
  writing() {
    this.writeTemplates(TEMPLATES);
    this.writeNamedTemplates(NAMED_TEMPLATES);
  }
};
