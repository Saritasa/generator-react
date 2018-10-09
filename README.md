# @saritasa/generator-react

[![Greenkeeper badge](https://badges.greenkeeper.io/Saritasa/generator-react.svg)](https://greenkeeper.io/)

Package that allow to generate boilerplate code for react projects.

Installation:
```bash
npm i --save-dev yo @saritasa/generator-react
```

Creating the app:
```bash
npx @saritasa/generator-react [app-name] && cd [app-name] && npx yo @saritasa/react
```

Running any sub-generator:
```bash
npx yo @saritasa/react:[sub-generator-name]
```

## Existed sub-generators
There are some generators for internal application's parts:
- feature - Sub-generator for feature. Creates base routes, page examples.
- entity - Sub-generator for creating redux entity with sagas, selectors, actions and reducer.
- component - Sub-generator for creating react component. Creates separated view and controller parts.
- form - Sub-generator for creating form component. Creates separated view and controller parts.
- route - Sub-generator for creating the route. Creates injected path and Link component. 
- page - Sub-generator for creating the page (only pages should handle routes). Routes should be handle 
_only_ by pages. 
- guard - Generates guard components and its connect base.
- connected-component - Generates connected version of some component inside `pages/{Page}/components` directory.

Every generator needs `name` argument to generates content:
```bash
                              name argument
                                   ▼
npx yo @saritasa/react:feature FeatureName
                          ^
                    sub-generator's name
```

Also every generator allows you to use self in next ways:
```bash
# creates PROJECT_ROOT/src/components/MyComponent
npx yo @saritasa/react:component MyComponent

# creates PROJECT_ROOT/src/features/Deep/features/Nested/components/MyComponent
npx yo @saritasa/react:component Deep/Nested/MyComponent

# creates PROJECT_ROOT/my_source_root/MyComponent
npx yo @saritasa/react:component MyComponent --source-root=my_source_root

# generates plain js without flow-types
npx yo @saritasa/react:component MyComponent --no-flow

# generates component without unit tests
npx yo @saritasa/react:component MyComponent --no-unit

# generates component without stories
npx yo @saritasa/react:component MyComponent --no-stories

# displays help for generator
npx yo @saritasa/react:component --help
```
