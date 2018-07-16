### 1.0.0-rc.7
- Update connected component naming to create component named `Connected{name}` to resolve possible issues with naming.

### 1.0.0-rc.6
- Resolve minor issues with generated documentation for guard and entity.

#### Features
- Add `connected-component` sub generator to create connected version of existed component inside existed page's directory. It works only in 1 feature lever (or app). For example if we have f1 and f2 as features, we can't create connected component inside f1's page with component from f2.  

### 1.0.0-rc.2
- Update license info in package.json file.

### 1.0.0-rc.1
#### Features 
- Improve jsdoc comments and documentation for route generator.
- Update Page generator to work as other existed generators (see 1.0.0-rc.0).
- Add Guard generator.
- Make generated documentation to be pretty in case of eslint rules.


#### Internal change (for developers)
- Add `BaseSubGenerator#transformModuleName()` method to change module name.


### 1.0.0-rc.0
We have re-written existed sub-generators to replace much code with separated modules that do the same things.
This allows to think more about "what code do we generate" instead of "how do we generate the code". 

#### Breaking changes
- Nested generators not works in other way:
  - Old:
    - `yo @saritasa/react:entity MyEntity` command generates 
      `src/entities/MyEntity` folder with internal content.
    - `yo @saritasa/react:entity Deep/Nested/MyEntity` command generates 
      `src/Deep/Nested/MyEntity` folder with internal content.
  - New:
      - `yo @saritasa/react:entity MyEntity` command generates 
        `src/entities/MyEntity` folder with internal content. **Was not changed**.
      - `yo @saritasa/react:entity Deep/Nested/MyEntity` command generates 
        `src/features/Deep/features/Nested/entities/MyEntity` folder with internal content. **Was changed**.

#### Features 
- Add Route generator.
- Add Feature generator.
- Add `create-saritasa-react-app` script to allow generate app via `npx @saritasa/generator-react app-name`.
- Add generating documentation.yml files for generated content for future usage.

#### Internal change (for developers)
- Create `BaseGenerator` that implements basic logic for generators 
and adds some flags into every generator.
- Create `BaseSubGenerator` that extends `BaseGenerator` and 
implements basic logic for sub-generators for writing named and parted templates.


### 0.2.1
#### Features
- Change entity's schema to use .js instead of .json file.
- Add flow's check for action types to use strict literal types.
- Add SET and SET_LIST actions into reducer.


### 0.1.2
#### Features
- Add documentation for entity's action creators.
- Add tags for package.
- Add generator for forms.


### 0.1.1
#### Bugfixes
- Fix miss-named classname inside component view's generated jsdoc. 


### 0.1.0
#### Features
- Add generator for entities.


### 0.0.8
#### Bugfixes
- Resolve issue with missing props cause wrong default code.


### 0.0.7
#### Features
- Add some tests for controller.


### 0.0.6
#### Bugfixes
- Prevent eslint errors cause @return tag instead of @returns.


### 0.0.5
#### Features
- Allow to generate code without flow.
- Allow to generate code without stories.
- Allow to generate code without tests.


### 0.0.4
#### Features
- Improve generated jsdoc comments to prevent extra changes after generation.
- Replace `root` className with `host`.  


### 0.0.3
#### Bugfixes
- Resolve issue with throw error on `generate:component` cause wrong initializing order.


### 0.0.2
- Bump version to publish.


### 0.0.1
- Init package.
- Add `component` sub-generator.