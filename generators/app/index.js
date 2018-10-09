/**
 * App module.
 * @module app
 */

const BaseGenerator = require('../_base/BaseGenerator');

const TEMPLATES = {
  files: [
    '.env',
    '.env.test',
    '.eslintrc.yml',
    '.eslintignore',
    '.flowconfig',
    `source_root/index.js`,
    `source_root/index.client.js`,
    `source_root/setupTest.js`,
    `source_root/setupTest.updated.js`,
    `source_root/api/index.js`,
    `source_root/api/http.js`,
    `source_root/components/ExampleHeader.js`,
    `source_root/links/index.js`,
    `source_root/links/Nested.link.js`,
    `source_root/links/Root.link.js`,
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
   * Method for "writing" phase of yeaoman generator.
   */
  writing() {
    this.writeTemplates(TEMPLATES);
  }
};
