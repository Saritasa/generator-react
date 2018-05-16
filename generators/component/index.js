const path = require('path');

const Generator = require('yeoman-generator');

const SOURCE_PATH = 'src';

module.exports = class extends Generator {

  constructor(args, opts) {
    // Calling the super constructor is important so our generator is correctly set up
    super(args, opts);

    this.argument('component', {
      type: String,
      description: 'Component\'s name. Use CamelCase for it. You may use `prefix/ComponentName`. By default prefix="components".',
      required: true
    });

    this.option('source-root', { type: String, default: SOURCE_PATH, description: 'path for source\'s root' });

    this.option('stories');
    this.option('install-deps');
  }

  initializing() {
    this._checkNodejsVerion();
    this._checkArguments();
    this.destinationRoot(this.destinationPath(this.options['source-root']));
    this._calcComponentName();
  }

  _checkNodejsVerion() {
    const { node } = process.versions;
    if (Number(node.split('.')[0]) !== 8) {
      throw new Error(`Use nodejs v8 instead of ${node}`);
    }
  }

  _checkArguments() {
    if (!(/^[A-Z][a-zA-Z]*$/.test(this.options.name))) {
      throw new Error(`name should includes only latin letters and be CamelCased. You passed "${this.options.name}"`);
    }
  }

  _calcComponentName() {
    const [name, ...pathParts] = this.options.component.split('/').reverse();

    this.options.name = name;
    this.options.dest = pathParts.reverse().join('/') || 'components';
  }

  install() {
    if (this.options['install-deps']) {
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
    const { name, dest } = this.options;

    const files = ['view.js', 'view.css', 'view.stories.js', 'view.unit.js'];

    files.forEach(file => {
      this.fs.copyTpl(
        this.templatePath(file),
        this.destinationPath(path.join(dest, name, `${name}.${file}`)),
        { name },
      );
    });
  }

  _writeController() {
    const { name, dest } = this.options;

    const files = ['controller.js', 'controller.unit.js'];

    files.forEach(file => {
      this.fs.copyTpl(
        this.templatePath(file),
        this.destinationPath(path.join(dest, name, `${name}.${file}`)),
        { name },
      );
    });
  }

  _writeMain() {
    const { name, dest } = this.options;

    const files = ['index.js'];

    files.forEach(file => {
      this.fs.copyTpl(
        this.templatePath(file),
        this.destinationPath(path.join(dest, name, file)),
        { name },
      );
    });
  }
};