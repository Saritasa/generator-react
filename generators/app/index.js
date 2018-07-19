/**
 * App module.
 * @module app
 */

const BaseGenerator = require('../_base/BaseGenerator');

const TEMPLATES = {
  files: [
    'config-overrides.js',
    `source_root/index.js`,
    `source_root/index.client.js`,
    `source_root/components/ExampleHeader.js`,
    `source_root/links/index.js`,
    `source_root/links/nested.link.js`,
    `source_root/links/root.link.js`,
    `source_root/routes/index.js`,
    `source_root/routes/paths.js`,
    `source_root/routes/routeStore.js`,
    `source_root/pages/ExampleRootPage.js`,
    `source_root/pages/ExampleNestedPage.js`,
  ],
};

/**
 * App generator class.
 *
 * @extends BaseGenerator
 * @type {module.AppGenerator}
 */
module.exports = class AppGenerator extends BaseGenerator {
  /**
   * Create template.
   */
  writing() {
    this.writeTemplates(TEMPLATES);
  }
};
