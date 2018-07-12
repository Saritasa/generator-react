const ejs = require('ejs');
const path = require('path');

const BaseGenerator = require('./BaseGenerator');

function camelize(word) {
  return `${word[0].toLowerCase()}${word.slice(1)}`;
}

function pascalize(word) {
  return `${word[0].toUpperCase()}${word.slice(1)}`;
}

module.exports = class BaseSubGenerator extends BaseGenerator {
  constructor(args, opts) {
    // Calling the super constructor is important so our generator is correctly set up
    super(args, opts);

    this.option('install', {
      type: Boolean,
      default: false,
      description: 'Install dependencies for generated code',
    });
  }

  transformName(name) {
    return name;
  }

  transformModuleName(name) {
    return name;
  }

  mainArgument(name, description) {
    this._originalName = name;
    this._name = `[featureName/]${name}`;
    this.argument(this._name, {
      type: String,
      description,
      required: true,
    });
  }

  setDestination(dest) {
    this._dest = dest;
  }

  initializing() {
    super.initializing();
    this._calcName();
    this._calcFeatureName();
    this._calcDest();
    this._calcModuleName();
    this.destinationRoot(this.destinationPath(this.options['source-root']));
  }

  _calcName() {
    const name = this.transformName(this.options[this._name].split('/').pop());

    this._checkMainArgumentName(name);

    this.options.name = camelize(name);
    this.options.Name = pascalize(name);
  }

  _checkMainArgumentName(name) {
    if (!/^[A-Z][a-zA-Z\d]*$/.test(name)) {
      throw new Error(
        `Last name's part should start with Capital latin letter, and may includes only latin letters and numbers. You passed "${name}"`,
      );
    }
  }

  _calcFeatureName() {
    const featurePathParts = this.options[this._name].split('/');

    featurePathParts.pop();

    const featureName = featurePathParts.map(camelize).join('/');
    const FeatureName = featurePathParts.map(pascalize).join('/');

    this.options.featureName = featureName;
    this.options.FeatureName = FeatureName;
  }

  _calcDest() {
    this.options.dest = [
      ...this.options.featureName
        .split('/')
        .filter(Boolean)
        .map(part => `features/${part}`),
      this._dest ? `${this._dest}/${this.options.Name}` : '',
    ].join('/');
  }

  _calcModuleName() {
    this.options.moduleName = this.transformModuleName(
      [this.options.FeatureName, pascalize(this._originalName), this.options.Name]
        .filter(Boolean)
        .join('/'),
    );
  }

  install(...rest) {
    if (this.options.install) {
      this.npmInstall(...rest);
    }
  }

  writeNamedTemplates({ files = [], units = [], stories = [] }) {
    const {
      name,
      Name,
      moduleName,
      featureName,
      FeatureName,
      flow,
      unit: writeUnit,
      stories: writeStories,
      dest,
    } = this.options;

    const filesToWrite = [...files];

    if (writeUnit) filesToWrite.push(...units);
    if (writeStories) filesToWrite.push(...stories);

    filesToWrite.forEach(file => {
      const [realFileName, ...paths] = file.split('/').reverse();

      this.fs.copyTpl(
        this.templatePath(`${file}.ejs`),
        this.destinationPath(path.join(dest, ...paths.reverse(), `${Name}.${realFileName}`)),
        { name, Name, featureName, moduleName, FeatureName, flow },
      );
    });
  }

  writeMissedTemplates({ files = [], units = [], stories = [] }) {
    const {
      name,
      Name,
      moduleName,
      featureName,
      FeatureName,
      flow,
      unit: writeUnit,
      stories: writeStories,
      dest,
    } = this.options;

    const filesToWrite = [...files];

    if (writeUnit) filesToWrite.push(...units);
    if (writeStories) filesToWrite.push(...stories);

    filesToWrite.forEach(file => {
      const [realFileName, ...paths] = file.split('/').reverse();

      const pathToRealFile = path.join(dest, ...paths.reverse(), realFileName);

      if (this.fs.exists(this.destinationPath(pathToRealFile))) return;

      this.fs.copyTpl(this.templatePath(`${file}.main.ejs`), this.destinationPath(pathToRealFile), {
        name,
        Name,
        featureName,
        moduleName,
        FeatureName,
        flow,
      });
    });
  }

  writeMissedNamedTemplates({ files = [], units = [], stories = [] }) {
    const {
      name,
      Name,
      moduleName,
      featureName,
      FeatureName,
      flow,
      unit: writeUnit,
      stories: writeStories,
      dest,
    } = this.options;

    const filesToWrite = [...files];

    if (writeUnit) filesToWrite.push(...units);
    if (writeStories) filesToWrite.push(...stories);

    filesToWrite.forEach(file => {
      const [realFileName, ...paths] = file.split('/').reverse();

      const pathToRealFile = path.join(dest, ...paths.reverse(), `${Name}.${realFileName}`);

      if (this.fs.exists(this.destinationPath(pathToRealFile))) return;

      this.fs.copyTpl(this.templatePath(`${file}.main.ejs`), this.destinationPath(pathToRealFile), {
        name,
        Name,
        featureName,
        moduleName,
        FeatureName,
        flow,
      });
    });
  }

  appendTemplates({ files = [], units = [], stories = [] }) {
    const {
      name,
      Name,
      moduleName,
      featureName,
      FeatureName,
      flow,
      unit: writeUnit,
      stories: writeStories,
      dest,
    } = this.options;

    const filesToWrite = [...files];

    if (writeUnit) filesToWrite.push(...units);
    if (writeStories) filesToWrite.push(...stories);

    filesToWrite.forEach(file => {
      const [realFileName, ...paths] = file.split('/').reverse();

      this.fs.append(
        this.destinationPath(path.join(dest, ...paths.reverse(), realFileName)),
        ejs.render(this.fs.read(this.templatePath(`${file}.part.ejs`)), {
          name,
          Name,
          featureName,
          moduleName,
          FeatureName,
          flow,
        }),
      );
    });
  }

  appendNamedTemplates({ files = [], units = [], stories = [] }) {
    const {
      name,
      Name,
      moduleName,
      featureName,
      FeatureName,
      flow,
      unit: writeUnit,
      stories: writeStories,
      dest,
    } = this.options;

    const filesToWrite = [...files];

    if (writeUnit) filesToWrite.push(...units);
    if (writeStories) filesToWrite.push(...stories);

    filesToWrite.forEach(file => {
      const [realFileName, ...paths] = file.split('/').reverse();

      this.fs.append(
        this.destinationPath(path.join(dest, ...paths.reverse(), `${Name}.${realFileName}`)),
        `\n${ejs.render(this.fs.read(this.templatePath(`${file}.part.ejs`)), {
          name,
          Name,
          featureName,
          moduleName,
          FeatureName,
          flow,
        })}`,
      );
    });
  }
};
