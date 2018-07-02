const path = require('path');

const Generator = require('yeoman-generator');

const SOURCE_PATH = 'src';
const DEST = 'entities';

module.exports = class extends Generator {

  constructor(args, opts) {
    // Calling the super constructor is important so our generator is correctly set up
    super(args, opts);

    this.argument('entityName', {
      type: String,
      description: 'Entities\'s name. Use CamelCase for it. You may use `prefix/EntityName` to create sub-entity.',
      required: true
    });

    this.option('flow', { type: Boolean, default: true, description: 'Use --no-flow to remove flow from generated code' });
    this.option('unit', { type: Boolean, default: true, description: 'Use --no-unit to prevent tests\' generating' });

    this.option('source-root', { type: String, default: SOURCE_PATH, description: 'Path for source\'s root' });
    this.option('install', { type: Boolean, default: false, description: 'Install dependencies for generated code' });
  }

  initializing() {
    this._checkNodejsVerion();
    this._calcEntityNames();
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
    const [name, ...prefixParts] = this.options.entityName.split('/').reverse();

    this.options.name = `${name[0].toLowerCase()}${name.slice(1)}`;
    this.options.Name = `${name[0].toUpperCase()}${name.slice(1)}`;
    this.options.dest = prefixParts.reverse().join('/') || DEST;
  }

  _checkArguments() {
    if (!(/^[A-Z][a-zA-Z]*$/.test(this.options.Name))) {
      throw new Error(`name should includes only latin letters and be CamelCased. You passed "${this.options.Name}"`);
    }
  }

  install() {
    if (this.options['install']) {
      this.npmInstall(['immutable', 'reselect', 'redux-saga', 'axios', 'ajv'], { 'save': true });
    }
  }


  writing() {
    const { name, Name, flow, unit, dest } = this.options;
    const files = ['actions.js', 'actionTypes.js', 'api.js', 'dto.js', 'record.js', 'reducer.js', 'sagas.js', 'schema.js', 'selectors.js', 'utils.js'];

    if (unit) ['actions.unit.js', 'actionTypes.unit.js', 'reducer.unit.js', 'schema.unit.js'].forEach(file => files.push(file));
    if (flow) ['actionTypes.flow.unit.js'].forEach(file => files.push(file));

    files.forEach(file => {
      this.fs.copyTpl(
        this.templatePath(`${file}.ejs`),
        this.destinationPath(path.join(dest, Name, `${Name}.${file}`)),
        { name, Name, flow },
      );
    });
  }
};