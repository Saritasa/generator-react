const path = require('path');

const Generator = require('yeoman-generator');

const SOURCE_PATH = 'src';
const Page_DEST = 'pages';

module.exports = class extends Generator {

  constructor(args, opts) {
    // Calling the super constructor is important so our generator is correctly set up
    super(args, opts);

    this.argument('page', {
      type: String,
      description: 'Page\'s name. Use CamelCase for it. You may use `featureName/PageName`. By default feature is empty.',
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
    this._calcPageName();
    this._checkArguments();
    this._calcModuleName();
    this.destinationRoot(this.destinationPath(this.options['source-root']));
  }

  _checkNodejsVerion() {
    const { node } = process.versions;
    if (Number(node.split('.')[0]) !== 8) {
      throw new Error(`Use nodejs v8 instead of ${node}`);
    }
  }

  _calcPageName() {
    const [name, ...prefixParts] = this.options.entityName.split('/').reverse();

    const featureName = prefixParts.reverse().join('/');

    this.options.name = `${name[0].toLowerCase()}${name.slice(1)}Page`;
    this.options.Name = `${name[0].toUpperCase()}${name.slice(1)}Page`;
    this.options.featureName = `${featureName.slice(0, 1).toLowerCase()}${featureName.slice(1)}`;
    this.options.FeatureName = `${featureName.slice(0, 1).toUpperCase()}${featureName.slice(1)}`;
    this.options.dest = [this.options.featureName, Page_DEST].filter(Boolean).join('/');
  }

  _checkArguments() {
    if (!(/^[A-Z][a-zA-Z]*$/.test(this.options.name))) {
      throw new Error(`name should includes only latin letters and be CamelCased. You passed "${this.options.name}"`);
    }
  }

  _calcModuleName() {
    this.options.moduleName = [this.options.FeatureName, this.options.Name].filter(Boolean).join('/');
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
    const filesWithName = ['documentation.yml'];

    files.forEach(file => {
      this.fs.copyTpl(
        this.templatePath(`${file}.ejs`),
        this.destinationPath(path.join(dest, name, file)),
        { name, flow },
      );
    });

    filesWithName.forEach(file => {
      this.fs.copyTpl(
        this.templatePath(`${file}.ejs`),
        this.destinationPath(path.join(dest, name, `${name}.${file}`)),
        { name, flow },
      );
    });
  }
};