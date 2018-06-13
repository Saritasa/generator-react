# @saritasa/generator-react

Package that allow to generate boilerplate code for react projects.

Installation:
```bash
npm i --save-dev yo @saritasa/generator-react
```

Run:
```bash
npx yo @saritasa/react:[sub-generator-name]
```


## Sub-generator 'component'

Sub-generator for creating components with stories, unit-tests.

Examples:
```bash
# creates PROJECT_ROOT/src/components/MyComponent
npx yo @saritasa/react:component MyComponent

# creates PROJECT_ROOT/src/My/Nested/Path/MyComponent
npx yo @saritasa/react:component My/Nested/Path/MyComponent

# creates PROJECT_ROOT/source_root/My/Nested/Path/MyComponent
npx yo @saritasa/react:component My/Nested/Path/MyComponent --source-root=source_root

# generate plain js without flow-type
npx yo @saritasa/react:component MyComponent --no-flow

# generate component without unit tests
npx yo @saritasa/react:component MyComponent --no-unit

# generate component without stories
npx yo @saritasa/react:component MyComponent --no-stories

# install dependencies for component
npx yo @saritasa/react:component MyComponent --install
```

To run help, use `npx yo @saritasa/react:component --help`.


## Sub-generator 'entity'

Sub-generator for creating redux entity with sagas, selectors, actions and reducer.

Examples:
```bash
# creates PROJECT_ROOT/src/components/MyComponent
npx yo @saritasa/react:entity MyComponent

# creates PROJECT_ROOT/src/My/Nested/Path/MyComponent
npx yo @saritasa/react:entity My/Nested/Path/MyComponent

# creates PROJECT_ROOT/source_root/My/Nested/Path/MyComponent
npx yo @saritasa/react:entity My/Nested/Path/MyComponent --source-root=source_root

# generate plain js without flow-type
npx yo @saritasa/react:entity MyComponent --no-flow

# generate entity without unit tests
npx yo @saritasa/react:entity MyComponent --no-unit

# install dependencies for entity
npx yo @saritasa/react:entity MyComponent --install
```

To run help, use `npx yo @saritasa/react:entity --help`.


## Sub-generator 'form'

Sub-generator for creating form with stories and unit-tests.

Examples:
```bash
# creates PROJECT_ROOT/src/components/MyForm
npx yo @saritasa/react:form My

# creates PROJECT_ROOT/src/My/Nested/Path/MyForm
npx yo @saritasa/react:form My/Nested/Path/My

# creates PROJECT_ROOT/source_root/My/Nested/Path/MyForm
npx yo @saritasa/react:form My/Nested/Path/My --source-root=source_root

# generate plain js without flow-type
npx yo @saritasa/react:form MyComponent --no-flow

# generate entity without unit tests
npx yo @saritasa/react:form MyComponent --no-unit

# install dependencies for forms
npx yo @saritasa/react:form My --install
```

To run help, use `npx yo @saritasa/react:form --help`.