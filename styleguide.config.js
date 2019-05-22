const path = require('path');

module.exports = {
  ignore: ['**/*.container.tsx', '**/*.test.tsx', '**/build/**', '**/styleguide/**'],
  propsParser: require('react-docgen-typescript').parse,
  webpackConfig: require('react-scripts-ts/config/webpack.config.dev'),
  require: [
    path.join(__dirname, 'src/App.css'),
    path.join(__dirname, 'node_modules/bootstrap/dist/css/bootstrap.css'),
  ],
  
}
