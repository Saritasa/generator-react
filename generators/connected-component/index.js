const path = require('path');
const fs = require('fs');

const BaseSubGenerator = require('../_base/BaseSubGenerator');

const DESTINATION_FOLDER = '.';

const TEMPLATES = {
  files: ['index.js'],
};
const NAMED_TEMPLATES = {
  files: ['documentation.yml', 'connect.js'],
};

module.exports = class ComponentGenerator extends BaseSubGenerator {
  constructor(args, opts) {
    // Calling the super constructor is important so our generator is correctly set up
    super(args, opts);

    this.mainArgument(
      'connectedComponent',
      "Connected component's name. Use CamelCase for it. You may use `featureName/ConnectedComponentName` to create connected component inside feature.",
    );
  }

  transformName(name) {
    return `Connected${name}`;
  }

  transformModuleName(name) {
    const parts = name.split('/');
    const realName = parts.pop();

    parts.pop();
    parts.push(this.options.Page);
    parts.push('Component');
    parts.push(realName);

    return parts.join('/');
  }

  initializing() {
    this.setDestination(DESTINATION_FOLDER);
    super.initializing();
  }

  prompting() {
    return this.prompt([
      {
        type: 'list',
        name: 'page',
        message: 'Which page should use this connected component?',
        choices: () => {
          const pagesPath = this.destinationPath(path.join(this.options.dest, '../pages'));

          try {
            const pages = fs.readdirSync(pagesPath).filter(file => {
              const stats = fs.statSync(path.join(pagesPath, file));

              return stats.isDirectory();
            });

            if (pages.length === 0) {
              throw new Error(
                `Looks like there is no pages in such feature as "${
                  this.options.FeatureName
                }". You need to create any page before creating connected component.`,
              );
            }

            return pages;
          } catch (e) {
            if (e.code === 'ENOENT') {
              throw new Error(
                `Looks like there is not such feature as "${
                  this.options.FeatureName
                }". Or there is not ./pages directory inside it. Possibly you need to create any page before creating connected component.`,
              );
            }
            throw e;
          }
        },
      },
      {
        type: 'list',
        name: 'component',
        message: 'Which component should be connected?',
        choices: () => {
          const componentsPath = this.destinationPath(
            path.join(this.options.dest, '../components'),
          );
          const formsPath = this.destinationPath(path.join(this.options.dest, '../forms'));

          try {
            const components = fs
              .readdirSync(componentsPath)
              .filter(file => {
                const stats = fs.statSync(path.join(componentsPath, file));

                return stats.isDirectory();
              })
              .map(file => `components/${file}`);

            const forms = fs
              .readdirSync(formsPath)
              .filter(file => {
                const stats = fs.statSync(path.join(formsPath, file));

                return stats.isDirectory();
              })
              .map(file => `forms/${file}`);

            if (components.length === 0 && forms.length === 0) {
              throw new Error(
                `Looks like there is no components and forms in such feature as "${
                  this.options.FeatureName
                }". You need to create any component or form before creating connected component.`,
              );
            }

            return [...components, ...forms];
          } catch (e) {
            if (e.code === 'ENOENT') {
              throw new Error(
                `Looks like there is not such feature as "${
                  this.options.FeatureName
                }". Or there is not ./components directory inside it. Possibly you need to create any component before creating connected component.`,
              );
            }
            throw e;
          }
        },
      },
    ]).then(answers => {
      const [directory, componentName] = answers.component.split('/');

      this.options.page = BaseSubGenerator.camelize(answers.page);
      this.options.Page = BaseSubGenerator.pascalize(answers.page);
      this.options.componentDirectory = directory;
      this.options.component = BaseSubGenerator.camelize(componentName);
      this.options.Component = BaseSubGenerator.pascalize(componentName);

      this.setDestination(`pages/${this.options.Page}/components`);
      super.initializing();
    });
  }

  install() {
    super.install(['react-redux'], { save: true });
  }

  writing() {
    this.writeTemplates(TEMPLATES);
    this.writeNamedTemplates(NAMED_TEMPLATES);
  }
};
