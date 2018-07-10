const path = require('path');
const cp = require('child_process');

const Generator = require('yeoman-generator');

const DEST = 'features';
const SOURCE_PATH = 'src';

module.exports = class extends Generator {

  constructor(args, opts) {
    // Calling the super constructor is important so our generator is correctly set up
    super(args, opts);

    this.argument('feature-name', {
      type: String,
      description: 'Feature\'s name.',
      required: true
    });

    this.option('flow', { type: Boolean, default: true, description: 'Use --no-flow to remove flow from generated code' });
    this.option('unit', { type: Boolean, default: true, description: 'Use --no-unit to prevent tests\' generating' });

    this.option('source-root', { type: String, default: SOURCE_PATH, description: 'Path for source\'s root' });
  }

  initializing() {
    this._checkNodejsVerion();
    this._calcEntityNames();
    this._calcModuleName();
    this._checkArguments();
    this.destinationRoot(this.destinationPath(this.options['source-root']));
  }

  _checkNodejsVerion() {
    const { node } = process.versions;
    if (Number(node.split('.')[0]) !== 8) {
      throw new Error(`Use nodejs v8 instead of ${node}`);
    }
  }
  _calcEntityNames() {
    const [name, ...prefixParts] = this.options['feature-name'].split('/').reverse();

    const featureName = prefixParts.reverse().join('/');

    this.options.name = `${name[0].toLowerCase()}${name.slice(1)}`;
    this.options.Name = `${name[0].toUpperCase()}${name.slice(1)}`;
    this.options.featureName = `${featureName.slice(0, 1).toLowerCase()}${featureName.slice(1)}`;
    this.options.FeatureName = `${featureName.slice(0, 1).toUpperCase()}${featureName.slice(1)}`;
    this.options.dest = [this.options.featureName, DEST].filter(Boolean).join('/');
  }

  _calcModuleName() {
    this.options.moduleName = [this.options.FeatureName, this.options.Name].filter(Boolean).join('/');
  }

  _checkArguments() {
    if (!(/^[A-Z][a-zA-Z]*$/.test(this.options.Name))) {
      throw new Error(`name should includes only latin letters and be CamelCased. You passed "${this.options.Name}"`);
    }
  }

  _writeUnnamed() {
    const { name, Name, flow, stories, unit, dest } = this.options;
    const files = ['components/ExampleHeader.js', 'links/index.js', 'pages/ExampleRootPage.js', 'pages/ExampleNestedPage.js', 'routes/index.js', 'index.js'];

    if (stories) files.push(...[]);
    if (unit) files.push(...[]);

    files.forEach(file => {
      this.fs.copyTpl(
        this.templatePath(`${file}.ejs`),
        this.destinationPath(path.join(dest, name, `${file}`)),
        { name, Name, flow },
      );
    });
  }

  _writeNamed() {
    const { name, Name,flow, stories, unit, dest } = this.options;
    const files = ['links/root.link.js', 'links/nested.link.js', 'routes/paths.js', 'routes/routeStore.js', 'inject.js'];

    if (stories) files.push(...[]);
    if (unit) files.push(...[]);

    files.forEach(file => {
      const [fileName, ...paths] = file.split('/').reverse();

      this.fs.copyTpl(
        this.templatePath(`${file}.ejs`),
        this.destinationPath(path.join(dest, name, ...paths.reverse(), `${Name}.${fileName}`)),
        { name, Name, flow },
      );
    });
  }

  writing() {
    this._writeUnnamed();
    this._writeNamed();
  }
};