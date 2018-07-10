const path = require('path');
const cp = require('child_process');

const Generator = require('yeoman-generator');

const SOURCE_PATH = 'src';

module.exports = class extends Generator {

  constructor(args, opts) {
    // Calling the super constructor is important so our generator is correctly set up
    super(args, opts);

    this.option('flow', { type: Boolean, default: true, description: 'Use --no-flow to remove flow from generated code' });
    this.option('stories', { type: Boolean, default: true, description: 'Use --no-stories to prevent stories\' generating' });
    this.option('unit', { type: Boolean, default: true, description: 'Use --no-unit to prevent tests\' generating' });

    this.option('source-root', { type: String, default: SOURCE_PATH, description: 'Path for source\'s root' });
  }

  initializing() {
    this._checkNodejsVerion();
    this._checkNpx();
  }

  _checkNodejsVerion() {
    const { node } = process.versions;
    if (Number(node.split('.')[0]) !== 8) {
      throw new Error(`Use nodejs v8 instead of ${node}`);
    }
  }

  _checkNpx() {
    try {
      cp.execSync('npx --version');
    } catch (error) {
      throw new Error('Install npx please (you may use npm v5.7+ for it).');
    }
  }

   _writingSrc() {
     const { flow, 'source-root': sourceRoot } = this.options;
       const files = [
         `${SOURCE_PATH}/index.js`,
         `${SOURCE_PATH}/index.client.js`,
         `${SOURCE_PATH}/components/ExampleHeader.js`,
         `${SOURCE_PATH}/links/index.js`,
         `${SOURCE_PATH}/links/nested.link.js`,
         `${SOURCE_PATH}/links/root.link.js`,
         `${SOURCE_PATH}/routes/index.js`,
         `${SOURCE_PATH}/routes/paths.js`,
         `${SOURCE_PATH}/routes/routeStore.js`,
         `${SOURCE_PATH}/pages/ExampleRootPage.js`,
         `${SOURCE_PATH}/pages/ExampleNestedPage.js`,
       ];

       files.forEach(file => {
         const fileName = file.replace(SOURCE_PATH, sourceRoot);
         this.fs.copyTpl(
           this.templatePath(`${file}.ejs`),
           this.destinationPath(fileName),
           { flow },
         );
       });
   }

  writing() {
    const { flow, 'source-root': sourceRoot } = this.options;
    const files = ['config-overrides.js'];

    files.forEach(file => {
      this.fs.copyTpl(
        this.templatePath(`${file}.ejs`),
        this.destinationPath(`${file}`),
        { flow, sourceRoot },
      );
    });
    this._writingSrc();
  }
};