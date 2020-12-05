var tailwindcss = require('tailwindcss');
// var autoprefixer = require('autoprefixer');

module.exports = {
  module: {
    rules: [{
      test: /\.scss$|\.sass$/,
      use: [{
        loader: 'sass-loader',
        options: {
            postcssOptions: {
                           ident: 'postcss',
                           syntax: 'postcss-scss',
                            plugins: [
                             require('postcss-import'),
                              require('tailwindcss'),
                              require('autoprefixer'),
                            ],
                          },
        }
      }]
    }]
  }
}
