import webpack = require("webpack");

interface WebpackDevServerConfiguration extends webpack.Configuration {
    devServer?: {
      port?: number,
      publicPath?: string,
      compress?: boolean,
      noInfo?: boolean,
      stats?: string,
      inline?: boolean,
      lazy?: boolean,
      hot?: boolean,
      headers?: string | any,
      contentBase?: string,
      watchOptions?: {
        aggregateTimeout?: number;
        ignored?: string | string[] | RegExp;
        poll?: number
      },
      historyApiFallback?: {
        verbose?: boolean,
        disableDotRule?: boolean
      },
      before?: () => void;
    }
  }