const { environment } = require('@rails/webpacker');
const darkTheme = require('antd/dist/dark-theme');

const lessLoader = {
  test: /\.less$/,
  use: [
    {
      loader: 'style-loader',
    },
    {
      loader: 'css-loader',
    },
    {
      loader: 'less-loader',
      options: {
        modifyVars: {
          hack: `true;@import "${require.resolve('antd/lib/style/color/colorPalette.less')}";`,
          ...darkTheme,
        },
        javascriptEnabled: true,
      },
    },
  ],
};

environment.loaders.append('less', lessLoader);

module.exports = environment;
