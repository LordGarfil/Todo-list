const htmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: {
      app: "./src/app.js",
      task: "./src/controllers/tasks.js"
    },
    output: {
        path: __dirname + "/dist",
        filename: "[name].js"
    },
    module: {
        rules: [
          {
            test: /\.html$/i,
        loader: 'html-loader',
          },
          {
            test: /\.php$/,
        loaders: [
          'html-minify',
          'php-loader'
        ]
          },
          {
            test: /\.css$/i,
            use: ['style-loader', 'css-loader'],
          },
          {
            test: /\.s[ac]ss$/i,
            use: [
              // Creates `style` nodes from JS strings
              "style-loader",
              // Translates CSS into CommonJS
              "css-loader",
              // Compiles Sass to CSS
              "sass-loader",
            ],
          },
          {
            test: /\.(png|svg|jpe?g|gif)$/i,
        loader: 'file-loader',
        options: {
          outputPath: './images',
        },
          }
        ]
      },
      devServer: {
        host: 'localhost',
        port: 8080,
        disableHostCheck: true,
        headers: { 'Access-Control-Allow-Origin': '*' },
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*',
    }
      },
    plugins: [
        new htmlWebPackPlugin({
          filename: 'index.html',
            template: "./src/index.html",
            chunks: ['app']
        }),
        new htmlWebPackPlugin({
          filename: 'mainTasks.html',
          template: "./src/views/mainTasks.html",
          chunks: ['task']
      })
    ]
};