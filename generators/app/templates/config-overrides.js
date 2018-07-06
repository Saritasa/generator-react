/* eslint-disable no-unused-vars, no-param-reassign */
const path = require('path');

const RESOLVE_OPTIONS = {
  paths: [
    __dirname,
    path.join(__dirname, 'node_modules/react-scripts/node_modules'),
  ],
};

module.exports = function override(config, env) {
  // do stuff with the webpack config...
  const rules = config.module.rules.filter(rule =>
    !rule.test.test('java-script-rule.js') &&
    !rule.test.test('css-rule.css')
  );

  config.module.rules = [
    ...rules,
    // Process JS with Babel.
    {
      test: /\.(js|jsx|mjs)$/,
      loader: require.resolve('babel-loader', RESOLVE_OPTIONS),
      include: path.resolve(path.join(__dirname, 'src')),
      exclude: { or: [/(node_modules|bower_components)/, /\.min\.js$/] },
      options: {
        // @remove-on-eject-begin
        babelrc: false,
        presets: [require.resolve('babel-preset-react-app', RESOLVE_OPTIONS)],
        // @remove-on-eject-end
        // This is a feature of `babel-loader` for webpack (not Babel itself).
        // It enables caching results in ./node_modules/.cache/babel-loader/
        // directory for faster rebuilds.
        cacheDirectory: true,
      },
    },
    // "postcss" loader applies autoprefixer to our CSS.
    // "css" loader resolves paths in CSS and adds assets as dependencies.
    // "style" loader turns CSS into JS modules that inject <style> tags.
    // In production, we use a plugin to extract that CSS to a file, but
    // in development "style" loader enables hot editing of CSS.
    {
      test: /\.css$/,
      include: path.resolve(path.join(__dirname, 'src')),
      exclude: { or: [/(node_modules|bower_components)/] },
      use: [
        require.resolve('style-loader', RESOLVE_OPTIONS),
        {
          loader: require.resolve('css-loader', RESOLVE_OPTIONS),
          options: {
            modules: true,
            localIdentName: '[path][name]__[local]--[hash:base64:5]',
          },
        },
      ],
    },
  ];

  return config;
};
/* eslint-enable */
