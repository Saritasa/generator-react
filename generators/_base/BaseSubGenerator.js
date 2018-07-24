/**
 * BaseSubGenerator module.
 * @module BaseSubGenerator
 */

const ejs = require('ejs');
const path = require('path');

const BaseGenerator = require('./BaseGenerator');

/**
 * Yo sub generator class.
 * @type {module.BaseSubGenerator}
 * @extends BaseGenerator
 */
module.exports = class BaseSubGenerator extends BaseGenerator {
  /**
   * Camelize word.
   *
   * @param {string} word - Word for camelizing.
   * @returns {string} - Camelized word.
   * @static
   */
  static camelize(word) {
    return `${word[0].toLowerCase()}${word.slice(1)}`;
  }

  /**
   * Pascalize word.
   *
   * @param {string} word - Word for pascalizing.
   * @returns {string} - Pascalized word.
   * @static
   */
  static pascalize(word) {
    return `${word[0].toUpperCase()}${word.slice(1)}`;
  }

  /**
   * Setup.
   *
   * @param {string|Array} args - Arguments at initialization.
   * @param {Object} opts - Options at initialization.
   */
  constructor(args, opts) {
    // Calling the super constructor is important so our generator is correctly set up
    super(args, opts);

    this._initialized = false;
    this.option('install', {
      type: Boolean,
      default: false,
      description: 'Install dependencies for generated code',
    });
  }

  /**
   * Create name to camelize and pascalize notations.
   *
   * @private
   */
  _calcName() {
    const name = this.transformName(this.options[this._name].split('/').pop());

    this._checkMainArgumentName(name);

    this.options.name = BaseSubGenerator.camelize(name);
    this.options.Name = BaseSubGenerator.pascalize(name);
  }

  /**
   * Check name.
   * Throw error if name is incorrect.
   *
   * @param {string} name - Name for check.
   * @private
   */
  _checkMainArgumentName(name) {
    if (!/^[A-Z][a-zA-Z\d]*$/.test(name)) {
      throw new Error(
        `Last name's part should start with Capital latin letter, and may includes only latin letters and numbers. You passed "${name}"`,
      );
    }
  }

  /**
   * Create feature name from name.
   *
   * @private
   */
  _calcFeatureName() {
    const featurePathParts = this.options[this._name].split('/');

    featurePathParts.pop();

    const featureName = featurePathParts.map(BaseSubGenerator.camelize).join('/');
    const FeatureName = featurePathParts.map(BaseSubGenerator.pascalize).join('/');

    this.options.featureName = featureName;
    this.options.FeatureName = FeatureName;
  }

  /**
   * Create dest.
   *
   * @private
   */
  _calcDest() {
    this.options.dest = [
      ...this.options.featureName
        .split('/')
        .filter(Boolean)
        .map(part => `features/${part}`),
      this._dest ? `${this._dest}/${this.options.Name}` : '',
    ].join('/');
  }

  /**
   * Create module name.
   *
   * @private
   */
  _calcModuleName() {
    this.options.moduleName = this.transformModuleName(
      [this.options.FeatureName, BaseSubGenerator.pascalize(this._originalName), this.options.Name]
        .filter(Boolean)
        .join('/'),
    );
  }

  /**
   * Transform name.
   *
   * @param {string} name - Name to transform.
   * @returns {string} - Transformed name.
   */
  transformName(name) {
    return name;
  }

  /**
   * Transform module name.
   *
   * @param {string} name - Name to transform.
   * @returns {string} - Transformed name.
   */
  transformModuleName(name) {
    return name;
  }

  /**
   * Setup argument with name and description.
   *
   * @param {string} name - Name.
   * @param {string} description - Description.
   */
  mainArgument(name, description) {
    this._originalName = name;
    this._name = `[featureName/]${name}`;
    this.argument(this._name, {
      type: String,
      description,
      required: true,
    });
  }

  /**
   * Setup dest.
   *
   * @param {string} dest - Destination.
   */
  setDestination(dest) {
    this._dest = dest;
  }

  /**
   * Initializing.
   */
  initializing() {
    if (this._initialized) {
      this.destinationRoot(
        this.options['source-root']
          .split('/')
          .map(() => '..')
          .join('/'),
      );
    }
    this._initialized = true;
    super.initializing();
    this._calcName();
    this._calcFeatureName();
    this._calcDest();
    this._calcModuleName();
    this.destinationRoot(this.destinationPath(this.options['source-root']));
  }

  /**
   * Install dependencies.
   *
   * @param {*} rest - A list of packages and an options object to install through npm.
   */
  install(...rest) {
    if (this.options.install) {
      this.npmInstall(...rest);
    }
  }

  /**
   * Create named template from files.
   *
   * @param {Array} files - Array of files.
   * @param {Array} units - Array of files.
   * @param {Array} stories - Array of files.
   */
  writeNamedTemplates({ files = [], units = [], stories = [] }) {
    const { Name, unit: writeUnit, stories: writeStories, dest } = this.options;

    const filesToWrite = [...files];

    if (writeUnit) filesToWrite.push(...units);
    if (writeStories) filesToWrite.push(...stories);

    filesToWrite.forEach(file => {
      const [realFileName, ...paths] = file.split('/').reverse();

      this.fs.copyTpl(
        this.templatePath(`${file}.ejs`),
        this.destinationPath(path.join(dest, ...paths.reverse(), `${Name}.${realFileName}`)),
        this.options,
      );
    });
  }

  /**
   * Create missed template from files.
   *
   * @param {Array} files - Array of files.
   * @param {Array} units - Array of files.
   * @param {Array} stories - Array of files.
   */
  writeMissedTemplates({ files = [], units = [], stories = [] }) {
    const { unit: writeUnit, stories: writeStories, dest } = this.options;

    const filesToWrite = [...files];

    if (writeUnit) filesToWrite.push(...units);
    if (writeStories) filesToWrite.push(...stories);

    filesToWrite.forEach(file => {
      const [realFileName, ...paths] = file.split('/').reverse();

      const pathToRealFile = path.join(dest, ...paths.reverse(), realFileName);

      if (this.fs.exists(this.destinationPath(pathToRealFile))) return;

      this.fs.copyTpl(
        this.templatePath(`${file}.main.ejs`),
        this.destinationPath(pathToRealFile),
        this.options,
      );
    });
  }

  /**
   * Create missed named template from files.
   *
   * @param {Array} files - Array of files.
   * @param {Array} units - Array of files.
   * @param {Array} stories - Array of files.
   */
  writeMissedNamedTemplates({ files = [], units = [], stories = [] }) {
    const { Name, unit: writeUnit, stories: writeStories, dest } = this.options;

    const filesToWrite = [...files];

    if (writeUnit) filesToWrite.push(...units);
    if (writeStories) filesToWrite.push(...stories);

    filesToWrite.forEach(file => {
      const [realFileName, ...paths] = file.split('/').reverse();

      const pathToRealFile = path.join(dest, ...paths.reverse(), `${Name}.${realFileName}`);

      if (this.fs.exists(this.destinationPath(pathToRealFile))) return;

      this.fs.copyTpl(
        this.templatePath(`${file}.main.ejs`),
        this.destinationPath(pathToRealFile),
        this.options,
      );
    });
  }

  /**
   * Append template.
   *
   * @param {Array} files - Array of files.
   * @param {Array} units - Array of files.
   * @param {Array} stories - Array of files.
   */
  appendTemplates({ files = [], units = [], stories = [] }) {
    const { unit: writeUnit, stories: writeStories, dest } = this.options;

    const filesToWrite = [...files];

    if (writeUnit) filesToWrite.push(...units);
    if (writeStories) filesToWrite.push(...stories);

    filesToWrite.forEach(file => {
      const [realFileName, ...paths] = file.split('/').reverse();

      this.fs.append(
        this.destinationPath(path.join(dest, ...paths.reverse(), realFileName)),
        ejs.render(this.fs.read(this.templatePath(`${file}.part.ejs`)), this.options),
      );
    });
  }

  /**
   * Append named template.
   *
   * @param {Array} files - Array of files.
   * @param {Array} units - Array of files.
   * @param {Array} stories - Array of files.
   */
  appendNamedTemplates({ files = [], units = [], stories = [] }) {
    const { Name, unit: writeUnit, stories: writeStories, dest } = this.options;

    const filesToWrite = [...files];

    if (writeUnit) filesToWrite.push(...units);
    if (writeStories) filesToWrite.push(...stories);

    filesToWrite.forEach(file => {
      const [realFileName, ...paths] = file.split('/').reverse();

      this.fs.append(
        this.destinationPath(path.join(dest, ...paths.reverse(), `${Name}.${realFileName}`)),
        `\n${ejs.render(this.fs.read(this.templatePath(`${file}.part.ejs`)), this.options)}`,
      );
    });
  }
};
