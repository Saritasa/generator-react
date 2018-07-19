/**
 * Page module.
 * @module page
 */

const BaseSubGenerator = require('../_base/BaseSubGenerator');

const DESTINATION_FOLDER = 'pages';

const TEMPLATES = {
  files: ['index.js'],
};

const NAMED_TEMPLATES = {
  files: ['view.js', 'view.css', 'controller.js', 'documentation.yml'],
  units: ['view.unit.js', 'controller.unit.js'],
  stories: ['view.stories.js'],
};

/**
 * Page generator class.
 *
 * @extends BaseSubGenerator
 * @type {module.PageGenerator}
 */
module.exports = class PageGenerator extends BaseSubGenerator {
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
      'page',
      "Page's name. Use CamelCase for it. You may use `featureName/PageName` to create page inside feature.",
    );
  }

  /**
   * Transform name.
   *
   * @param {string} name - Name to transform.
   * @returns {string} - Transformed name.
   */
  transformName(name) {
    return `${name}Page`;
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

  /**
   * Create template.
   */
  writing() {
    this.writeTemplates(TEMPLATES);
    this.writeNamedTemplates(NAMED_TEMPLATES);
  }
};
