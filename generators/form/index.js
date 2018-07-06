const path = require('path');

const Generator = require('yeoman-generator');

const SOURCE_PATH = 'src';
const COMPONENT_DEST = 'components';

module.exports = class extends Generator {

  constructor(args, opts) {
    // Calling the super constructor is important so our generator is correctly set up
    super(args, opts);

    this.argument('form-name', {
      type: String,
      description: 'Form component\'s name. Use CamelCase for it. You may use `prefix/ComponentName`. By default prefix="components".',
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
    this._calcFormName();
    this._checkArguments();
    this._prepareArguments();
    this.destinationRoot(this.destinationPath(this.options['source-root']));
  }

  _checkNodejsVerion() {
    const { node } = process.versions;
    if (Number(node.split('.')[0]) !== 8) {
      throw new Error(`Use nodejs v8 instead of ${node}`);
    }
  }

  _calcFormName() {
    const [formName, ...pathParts] = this.options['form-name'].split('/').reverse();

    this.options.formName = formName;
    this.options.dest = pathParts.reverse().join('/') || COMPONENT_DEST;
  }

  _checkArguments() {
    if (!(/^[A-Z][a-zA-Z]*$/.test(this.options.formName))) {
      throw new Error(`form-name should include only latin letters and be CamelCased. You passed "${this.options.formName}"`);
    }
    if (/Form/.test(this.options.formName)) {
      throw new Error(`form-name should not include 'Form' as substring, generator adds it automatically. You passed "${this.options.formName}"`);
    }
  }

  _prepareArguments() {
    const { formName } = this.options;

    this.options.name = `${formName[0].toLowerCase()}${formName.slice(1)}Form`;
    this.options.Name = `${formName[0].toUpperCase()}${formName.slice(1)}Form`;
    this.options.featureName = `${featureName.slice(0, 1).toLowerCase()}${featureName.slice(1)}`;
    this.options.FeatureName = `${featureName.slice(0, 1).toUpperCase()}${featureName.slice(1)}`;
    this.options.dest = [this.options.featureName, DEST].filter(Boolean).join('/');
  }

  _calcModuleName() {
    this.options.moduleName = [this.options.FeatureName, this.options.Name].filter(Boolean).join('/');
  }

  install() {
    if (this.options['install']) {
      this.npmInstall(['recompose', '@saritasa/react-form', 'classnames'], { 'save': true });
      this.npmInstall(['@storybook/react', '@storybook/addon-knobs', '@storybook/addon-links', '@storybook/addon-actions'], { 'save-dev': true });
    }
  }


  writing() {
    this._writeView();
    this._writeController();
    this._writeMain();
  }

  _writeView() {
    const { Name, unit, dest } = this.options;
    const files = ['view.js', 'view.css'];

    if (unit) files.push('view.unit.js');

    files.forEach(file => {
      this.fs.copyTpl(
        this.templatePath(`${file}.ejs`),
        this.destinationPath(path.join(dest, Name, `${Name}.${file}`)),
        this.options,
      );
    });
  }

  _writeController() {
    const { Name, stories, unit, dest } = this.options;
    const files = ['controller.js', 'values.js'];

    if (stories) files.push('controller.stories.js');
    if (unit) files.push('controller.unit.js', 'values.unit.js');

    files.forEach(file => {
      this.fs.copyTpl(
        this.templatePath(`${file}.ejs`),
        this.destinationPath(path.join(dest, Name, `${Name}.${file}`)),
        this.options,
      );
    });
  }

  _writeMain() {
    const { Name, dest } = this.options;

    const files = ['index.js'];

    files.forEach(file => {
      this.fs.copyTpl(
        this.templatePath(`${file}.ejs`),
        this.destinationPath(path.join(dest, Name, file)),
        this.options,
      );
    });
  }
};