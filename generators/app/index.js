const path = require('path');
const cp = require('child_process');

const Generator = require('yeoman-generator');



module.exports = class extends Generator {

  constructor(args, opts) {
    // Calling the super constructor is important so our generator is correctly set up
    super(args, opts);

    this.argument('name', {
      type: String,
      description: 'Application\'s name.',
      required: true
    });

    this.option('flow', { type: Boolean, default: true, description: 'Use --no-flow to remove flow from generated code' });
    this.option('stories', { type: Boolean, default: true, description: 'Use --no-stories to prevent stories\' generating' });
    this.option('unit', { type: Boolean, default: true, description: 'Use --no-unit to prevent tests\' generating' });

    this.option('source-root', { type: String, default: SOURCE_PATH, description: 'Path for source\'s root' });
  }

  initializing() {
    this._checkNodejsVerion();
    this._checkNpx();
    this._checkArguments();
    this.destinationRoot(this.destinationPath(this.options.name));
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

  _checkArguments() {
    if (!(/^[a-zA-Z][-a-zA-Z]*$/.test(this.options.name))) {
      throw new Error(`name should includes only latin letters and dashes. You passed "${this.options.name}"`);
    }
  }

  install() {

    "scripts": {
      -   "start": "react-scripts start",
        +   "start": "react-app-rewired start",
        -   "build": "react-scripts build",
        +   "build": "react-app-rewired build",
        -   "test": "react-scripts test --env=jsdom",
        +   "test": "react-app-rewired test --env=jsdom"
    }
  }
  // writing() {
  //   this._writeView();
  //   this._writeController();
  //   this._writeMain();
  // }
  //
  // _writeView() {
  //   const { name, flow, stories, unit, dest } = this.options;
  //   const files = ['view.js', 'view.css'];
  //
  //   if (stories) files.push('view.stories.js');
  //   if (unit) files.push('view.unit.js');
  //
  //   files.forEach(file => {
  //     this.fs.copyTpl(
  //       this.templatePath(`${file}.ejs`),
  //       this.destinationPath(path.join(dest, name, `${name}.${file}`)),
  //       { name, flow },
  //     );
  //   });
  // }
  //
  // _writeController() {
  //   const { name, flow, unit, dest } = this.options;
  //   const files = ['controller.js'];
  //
  //   if (unit) files.push('controller.unit.js');
  //
  //   files.forEach(file => {
  //     this.fs.copyTpl(
  //       this.templatePath(`${file}.ejs`),
  //       this.destinationPath(path.join(dest, name, `${name}.${file}`)),
  //       { name, flow },
  //     );
  //   });
  // }
  //
  // _writeMain() {
  //   const { name, flow, dest } = this.options;
  //
  //   const files = ['index.js'];
  //
  //   files.forEach(file => {
  //     this.fs.copyTpl(
  //       this.templatePath(`${file}.ejs`),
  //       this.destinationPath(path.join(dest, name, file)),
  //       { name, flow },
  //     );
  //   });
  // }
};