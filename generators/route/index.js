const path = require('path');

const ejs = require('ejs');
const Generator = require('yeoman-generator');

const DEST = 'routes';
const SOURCE_PATH = 'src';

module.exports = class extends Generator {

  constructor(args, opts) {
    // Calling the super constructor is important so our generator is correctly set up
    super(args, opts);

    this.argument('route-name', {
      type: String,
      description: 'Route\'s name.',
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
    const [name, ...prefixParts] = this.options['route-name'].split('/').reverse();

    const featureName = prefixParts.reverse().join('/');

    this.options.name = `${name[0].toLowerCase()}${name.slice(1)}`;
    this.options.Name = `${name[0].toUpperCase()}${name.slice(1)}`;
    this.options.featureName = `${featureName.slice(0, 1).toLowerCase()}${featureName.slice(1)}`;
    this.options.FeatureName = `${featureName.slice(0, 1).toUpperCase()}${featureName.slice(1)}`;
    this.options.dest = [this.options.featureName].filter(Boolean).join('/');
  }

  _calcModuleName() {
    this.options.moduleName = [this.options.FeatureName, 'Route', this.options.Name].filter(Boolean).join('/');
  }

  _checkArguments() {
    if (!(/^[A-Z][a-zA-Z]*$/.test(this.options.Name))) {
      throw new Error(`name should includes only latin letters and be CamelCased. You passed "${this.options.Name}"`);
    }
  }

  _writeMains() {
    const { name, Name, flow, stories, unit, dest } = this.options;
    const files = ['links/index.js', 'routes/paths.js'];

    if (stories) files.push(...[]);
    if (unit) files.push(...[]);

    console.log('write mains');
    files.forEach(file => {
      console.log(this.destinationPath(path.join(dest, `${file}`)));
      if (this.fs.exists(this.destinationPath(path.join(dest, `${file}`)))) return;

      this.fs.copyTpl(
        this.templatePath(`${file}.main.ejs`),
        this.destinationPath(path.join(dest, `${file}`)),
        { name, Name, flow },
      );
    });
  }

  _writeLink() {
    const { name, Name, flow, stories, unit, dest } = this.options;
    const files = ['links/link.js'];

    if (stories) files.push(...[]);
    if (unit) files.push(...[]);

    console.log('write link');
    files.forEach(file => {
      const [filename, ...prefix] = file.split('/').reverse();

      this.fs.copyTpl(
        this.templatePath(`${file}.ejs`),
        this.destinationPath(path.join(dest, ...prefix.reverse(), `${Name}.${filename}`)),
        { name, Name, flow },
      );
    });
  }

  _writeParts() {
    const { name, Name, flow, stories, unit, dest } = this.options;
    const files = ['links/index.js', 'routes/paths.js'];

    if (stories) files.push(...[]);
    if (unit) files.push(...[]);

    console.log('write part');
    files.forEach(file => {
      const pathToFile = this.destinationPath(path.join(dest, `${file}`));
      console.log(this.destinationPath(path.join(dest, `${file}`)));

      this.fs.append(
        pathToFile,
        '\n' + ejs.render(
          this.fs.read(this.templatePath(`${file}.part.ejs`)),
          { name, Name, flow },
        ),
      );
    });

  }

  writing() {
    this._writeMains();
    this._writeLink();
    this._writeParts();
  }
};