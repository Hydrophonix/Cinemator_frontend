// Core
import {
    Configuration,
    DefinePlugin,
    ProvidePlugin,
    HotModuleReplacementPlugin,
} from 'webpack';
import WebpackBar from 'webpackbar';
import FriendlyErrorsWebpackPlugin from 'friendly-errors-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import dotenv from 'dotenv';

export const connectBuildProgressIndicator = (): Configuration => ({
    plugins: [ new WebpackBar() ],
});

export const connectFriendlyErrors = (): Configuration => ({
    plugins: [ new FriendlyErrorsWebpackPlugin() ],
});

export const connectHMR = (): Configuration => ({
    plugins: [ new HotModuleReplacementPlugin() ],
});

export const connectBundleAnalyzer = (): Configuration => ({
    plugins: [
        new BundleAnalyzerPlugin({
            analyzerMode:      'disabled',
            openAnalyzer:      false,
            generateStatsFile: true,
        }),
    ],
});

export const defineEnvVariables = (isProd: boolean): Configuration => ({
    plugins: [
        new DefinePlugin({
            'process.env': JSON.stringify({
                ...dotenv.config({ path: isProd ? 'prod.env' : '.env' }).parsed,
            }),
        }),
    ],
});

export const provideGlobals = (): Configuration => ({
    plugins: [
        new ProvidePlugin({
            React: 'react',
        }),
    ],
});

// export const setupStaticServing = () => ({
//     plugins: [
//         new CopyWebpackPlugin([
//             {
//                 from: `${STATIC}/CI/now.json`,
//                 to:   `${BUILD}/now.json`,
//             },
//         ]),
//     ],
// });
