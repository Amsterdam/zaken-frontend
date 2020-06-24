const path = require('path')

module.exports = {
  stories: ['../src/**/*.stories.(ts|tsx|js|jsx)'],
  webpackFinal: (config) => {
    config.module.rules.push({
      test: /\.jsx?$/,
      include: [
        path.resolve(__dirname, '../node_modules/@datapunt/asc-assets'),
        path.resolve(__dirname, '../node_modules/@datapunt/asc-ui'),
      ],
      use: {
        loader: 'babel-loader',
        options: {
          presets: [
            ['@babel/preset-env', { "useBuiltIns": "entry", "corejs": 2 }],
            '@babel/preset-react',
          ],
          plugins: [
            ['babel-plugin-styled-components', { 'pure': true }],
          ],
        }
      }
    })

    return config
  },
  addons: [
    '@storybook/preset-create-react-app',
    '@storybook/addon-actions',
    '@storybook/addon-links',
    '@storybook/addon-viewport/register',
    '@storybook/addon-knobs/register'
  ],
};
