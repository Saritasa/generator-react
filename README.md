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
```

To run help, use `npx yo @saritasa/react:component --help`.
