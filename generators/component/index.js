const path = require('path');

const Generator = require('yeoman-generator');

const SOURCE_PATH = 'src';
const COMPONENT_DEST = 'components';

module.exports = class extends Generator {

  constructor(args, opts) {
    // Calling the super constructor is important so our generator is correctly set up
    super(args, opts);

    this.argument('component', {
      type: String,
      description: 'Component\'s name. Use CamelCase for it. You may use `prefix/ComponentName`. By default prefix="components".',
      required: true
    });

    this.option('flow', { type: Boolean, default: true, description: 'Use --no-flow to remove flow from generated code' });
    this.option('stories', { type: Boolean, default: true, description: 'Use --no-stories to prevent stories\' generating' });
    this.option('unit', { type: Boolean, default: true, description: 'Use --no-unit to prevent tests\' generating' });

    this.option('source-root', { type: String, default: SOURCE_PATH, description: 'Path for source\'s root' });
    this.option('install', { type: Boolean, default: false, description: 'Install dependencies for generated code' });
  }

  initializing() {
    this._checkNodejsVerion();
    this._calcComponentName();
    this._checkArguments();
    this.destinationRoot(this.destinationPath(this.options['source-root']));
  }

  _checkNodejsVerion() {
    const { node } = process.versions;
    if (Number(node.split('.')[0]) !== 8) {
      throw new Error(`Use nodejs v8 instead of ${node}`);
    }
  }

  _calcComponentName() {
    const [name, ...pathParts] = this.options.component.split('/').reverse();

    this.options.name = name;
    this.options.dest = pathParts.reverse().join('/') || COMPONENT_DEST;
  }

  _checkArguments() {
    if (!(/^[A-Z][a-zA-Z]*$/.test(this.options.name))) {
      throw new Error(`name should includes only latin letters and be CamelCased. You passed "${this.options.name}"`);
    }
  }

  install() {
    if (this.options['install']) {
      this.npmInstall(['recompose', 'classnames'], { 'save': true });
      this.npmInstall(['@storybook/react', '@storybook/addon-knobs', '@storybook/addon-links', '@storybook/addon-actions'], { 'save-dev': true });
    }
  }


  writing() {
    this._writeView();
    this._writeController();
    this._writeMain();
  }

  _writeView() {
    const { name, flow, stories, unit, dest } = this.options;
    const files = ['view.js', 'view.css'];

    if (stories) files.push('view.stories.js');
    if (unit) files.push('view.unit.js');

    files.forEach(file => {
      this.fs.copyTpl(
        this.templatePath(`${file}.ejs`),
        this.destinationPath(path.join(dest, name, `${name}.${file}`)),
        { name, flow },
      );
    });
  }

  _writeController() {
    const { name, flow, unit, dest } = this.options;
    const files = ['controller.js'];

    if (unit) files.push('controller.unit.js');

    files.forEach(file => {
      this.fs.copyTpl(
        this.templatePath(`${file}.ejs`),
        this.destinationPath(path.join(dest, name, `${name}.${file}`)),
        { name, flow },
      );
    });
  }

  _writeMain() {
    const { name, flow, dest } = this.options;

    const files = ['index.js'];

    files.forEach(file => {
      this.fs.copyTpl(
        this.templatePath(`${file}.ejs`),
        this.destinationPath(path.join(dest, name, file)),
        { name, flow },
      );
    });
  }
};