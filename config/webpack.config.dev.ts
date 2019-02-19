import * as path from 'path';
import * as webpack from 'webpack';
import { WebpackDevServerConfiguration } from '../types/WebpackDevServerConfiguration';

import * as HtmlWebpackPlugin from 'html-webpack-plugin';

const PROJECT_PATH = path.join(__dirname, '../');
const SOURCE_PATH = path.join(PROJECT_PATH, "./src");
const OUTPUT_PATH = path.join(PROJECT_PATH, "./dist");

const PORT = process.env.PORT || 8080;
const PUBLIC_PATH = `http://localhost:${PORT}`;

export default () => {

    const config: WebpackDevServerConfiguration =
    {
        context: __dirname,
        target: 'web',
        entry: [
            'react-hot-loader/patch',
            `webpack-dev-server/client?http://localhost:${PORT}`,
            'webpack/hot/only-dev-server',
            path.join(SOURCE_PATH, '/main.tsx'),
        ],
        output: {
            publicPath: `http://localhost:${PORT}/dist/`,
            path: OUTPUT_PATH,
            filename: 'app.js',
        },
        devtool: 'source-map',
        mode: 'development',
        resolve: {
            extensions: [".ts", ".tsx", ".js", ".json"],
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    loader: "awesome-typescript-loader",
                    exclude: /node_modules/,
                },
                {
                    test: /\.css$/,
                    use: ['style-loader', { loader: 'css-loader', options: { importLoaders: 1 } }],
                },
                {
                    test: /\.scss$/,
                    loaders: [
                        'style-loader',
                        { loader: 'css-loader', options: { importLoaders: 1 } },
                        'sass-loader',
                    ],
                },
                {
                    test: /\.(jpe?g|png|gif|svg)$/i,
                    loaders: [
                        'file-loader?hash=sha512&digest=hex&name=img/[hash].[ext]',
                        'image-webpack-loader?bypassOnDebug&optipng.optimizationLevel=7&gifsicle.interlaced=false',
                    ],
                },
            ]
        },
        externals: {
            "react": "React",
            "react-dom": "ReactDOM"
        },
        devServer: {
            port: (typeof PORT === 'string') ? parseInt(PORT) : PORT,
            publicPath: PUBLIC_PATH,
            hot: true,
            headers: { 'Access-Control-Allow-Origin': '*' },
            contentBase: OUTPUT_PATH,
            watchOptions: {
                aggregateTimeout: 300,
                ignored: /node_modules/,
                poll: 100
            },
            
        },
        
        plugins: [
            new webpack.HotModuleReplacementPlugin(), // enable HMR globally

            new webpack.optimize.OccurrenceOrderPlugin(true),

            new webpack.NamedModulesPlugin(), // prints more readable module names in the browser console on HMR 

            new webpack.ProvidePlugin({
                React: "react",
                ReactDOM: 'react-dom',
            }),

            new webpack.NoEmitOnErrorsPlugin(),

            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify('development')
            }),

            new HtmlWebpackPlugin({
                filename: path.join(OUTPUT_PATH, './index.html'),
                template: path.join(PROJECT_PATH, "./public/index.html"),
                inject: false,
            })
        ],
        
        node: {
            __dirname: false,
            __filename: false
        },
        

    }

    return config;

}