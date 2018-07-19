/**
 * Form module.
 * @module form
 */

const BaseSubGenerator = require('../_base/BaseSubGenerator');

const DESTINATION_FOLDER = 'forms';

const TEMPLATES = {
  files: ['index.js'],
};
const NAMED_TEMPLATES = {
  files: ['view.js', 'view.css', 'controller.js', 'documentation.yml', 'values.js'],
  units: ['view.unit.js', 'values.unit.js', 'controller.unit.js'],
  stories: ['controller.stories.js'],
};

/**
 * Form generator class.
 *
 * @extends BaseSubGenerator
 * @type {module.FormGenerator}
 */
module.exports = class FormGenerator extends BaseSubGenerator {
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
      'form',
      "Form's name. Use CamelCase for it. You may use `featureName/FormName` to create form inside feature.",
    );
  }

  /**
   * Transform name.
   *
   * @param {string} name - Name to transform.
   * @returns {string} - Transformed name.
   */
  transformName(name) {
    return `${name}Form`;
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
    super.install(['recompose', '@saritasa/react-form', 'classnames'], { save: true });
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

  /**
   * Create template.
   */
  writing() {
    this.writeTemplates(TEMPLATES);
    this.writeNamedTemplates(NAMED_TEMPLATES);
  }
};
