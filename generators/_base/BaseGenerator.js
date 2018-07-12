const path = require('path');
const cp = require('child_process');

const Generator = require('yeoman-generator');

const SOURCE_PATH = 'src';

module.exports = class BaseGenerator extends Generator {
  constructor(args, opts) {
    // Calling the super constructor is important so our generator is correctly set up
    super(args, opts);

    this.option('flow', {
      type: Boolean,
      default: true,
      description: 'Use --no-flow to remove flow from generated code',
    });
    this.option('stories', {
      type: Boolean,
      default: true,
      description: "Use --no-stories to prevent stories' generating",
    });
    this.option('unit', {
      type: Boolean,
      default: true,
      description: "Use --no-unit to prevent tests' generating",
    });

    this.option('source-root', {
      type: String,
      default: SOURCE_PATH,
      description: "Path for source's root",
    });
  }

  initializing() {
    // use current folder as default destination
    this.options.dest = '.';
    this._checkNodejsVerion();
    this._checkNpx();
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

  writeTemplates({ files = [], units = [], stories = [] }) {
    const {
      name,
      Name,
      moduleName,
      featureName,
      FeatureName,
      flow,
      unit: writeUnit,
      stories: writeStories,
      dest = '',
    } = this.options;

    const filesToWrite = [...files];

    if (writeUnit) filesToWrite.push(...units);
    if (writeStories) filesToWrite.push(...stories);

    filesToWrite.forEach(file => {
      this.fs.copyTpl(
        this.templatePath(`${file}.ejs`),
        this.destinationPath(
          path.join(dest, file.replace(/^source_root/, this.options['source-root'])),
        ),
        { name, Name, featureName, moduleName, FeatureName, flow },
      );
    });
  }
};
