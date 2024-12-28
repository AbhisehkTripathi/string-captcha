// webpack.config.js

module.exports = {
    // Entry point for the application
    entry: './src/index.js',
  
    // Output configuration
    output: {
      filename: 'bundle.js',
      path: __dirname + '/dist'
    },
  
    module: {
      rules: [
        {
          test: /\.jsx?$/, // Apply Babel loader to .js and .jsx files
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'] // Enable Babel presets for React
            }
          }
        }
      ]
    },
  
    resolve: {
      extensions: ['.js', '.jsx'] // Ensure Webpack resolves .jsx files
    },
  
    // Other configurations as needed...
  };
  