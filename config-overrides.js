const {
    override,
    fixBabelImports,
    addLessLoader,
    addWebpackAlias,
    addBabelPlugins,
    addWebpackPlugin,
    useBabelRc,
    disableChunk,
    adjustWorkbox,
    setWebpackPublicPath,
    addBundleVisualizer,
    disableEsLint,
    addWebpackExternals,
    addWebpackModuleRule,
    addWebpackResolve,
    addTslintLoader
    // addBundleVisualizer
} = require('customize-cra')
const path = require('path');
const apiMocker = require('mocker-api');
const paths = require('react-scripts/config/paths')
const rewireReactHotLoader = require('react-app-rewire-hot-loader')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
// const rewireCompressionPlugin = require('react-app-rewire-compression-plugin')
const rewireUglifyjs = require('react-app-rewire-uglifyjs')
const FilterWarningsPlugin = require('webpack-filter-warnings-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
//打包成功有桌面提醒
const LodashWebpackPlugin = require('lodash-webpack-plugin')
const WebpackBuildNotifierPlugin = require('webpack-build-notifier')
const theme = require('./theme.ts');
// SKIP_PREFLIGHT_CHECK = true

const rewiredMap = () => config => {
    config.devtool = config.mode === 'development' ? 'cheap-module-source-map' : false
    return config
}
process.env.PORT = 3000
// console.log(process.env)
process.env.GENERATE_SOURCEMAP !== 'false'

// path
const resolveAlias = dir => path.join(__dirname, '.', dir)
// 热更新
const hotLoader = () => (config, env) => {
    config = rewireReactHotLoader(config, env)
    return config
}
// build--->prod --->文件设置
const appBuildPathFile = () => config => {
    if (config.mode === 'development') {
    } else if (config.mode === 'production') {
        // 关闭sourceMap
        config.devtool = false
        //  // 配置打包后的文件位置修改path目录
        paths.appBuild = path.join(path.dirname(paths.appBuild), 'dist')
        config.output.path = path.join(path.dirname(config.output.path), 'dist')
        // 添加js打包gzip配置
        // config.plugins.push(
        //   new CompressionWebpackPlugin({
        //     test: /\.js$|\.css$/,
        //     threshold: 1024
        //   })
        // )
        // 更改生产模式输出的文件名
        // config.output.filename = 'static/js/[name].js?_v=[chunkhash:8]'
        // config.output.chunkFilename = 'static/js/[name].chunk.js?_v=[chunkhash:8]'
    }
    return config
}
//生产环境去除console.* functions
const dropConsole = () => {
    return config => {
        if (config.optimization.minimizer) {
            config.optimization.minimizer.forEach(minimizer => {
                if (minimizer.constructor.name === 'TerserPlugin') {
                    minimizer.options.terserOptions.compress.drop_console = true
                }
            })
        }
        return config
    }
}
/**
 *
 * @description 解决打包的时候如下报错
 * @url{https://github.com/ant-design/ant-design/issues/15696}
 * https://blog.csdn.net/peade/article/details/84890399
chunk 3 [mini-css-extract-plugin]
Conflicting order between:
 * css ./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-7-1!./node_modules/postcss-loader/src??postcss!./node_modules/less-loader/dist/cjs.js??ref--6-oneOf-7-3!./node_modules/antd/es/input/style/index.less
 * css ./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-7-1!./node_modules/postcss-loader/src??postcss!./node_modules/less-loader/dist/cjs.js??ref--6-oneOf-7-3!./node_modules/antd/es/message/style/index.less
 */
const delConflictingOrder = () => {
    return config => {
        for (let i = 0; i < config.plugins.length; i++) {
            const p = config.plugins[i]
            if (!!p.constructor && p.constructor.name === MiniCssExtractPlugin.name) {
                const miniCssExtractOptions = { ...p.options, ignoreOrder: true }
                config.plugins[i] = new MiniCssExtractPlugin(miniCssExtractOptions)
                break
            }
        }
    }
}

const addMiniCssExtractPlugin = () => {
    return config => {
        config.plugins.unshift(
            new FilterWarningsPlugin({
                // exclude: /any-warnings-matching-this-will-be-hidden/
                // exclude: /mini-css-extract-plugin[^]*Conflicting order between:/
                exclude: /\[mini-css-extract-plugin\][^]*Conflicting order between:/
            })
        )
    }
}

//代理配置
const proxyApi = {
    '/api': {
        target: 'https://router.this1.cn', // prod
        changeOrigin: true,
        secure: false,
        xfwd: false,
        pathRewrite: {
            '^/api': '/'
        }
    }
}

module.exports = {
    webpack: override(
        fixBabelImports('import', {
            libraryName: 'antd',
            libraryDirectory: 'es',
            style: true
        }),
        addWebpackResolve({
            extensions: [".js", ".json", ".ts", ".tsx"],
        }),
        addTslintLoader({
            // tsConfigFile:'tsconfig_custom.json',
            // typeCheck:true,
            // configFile:true
        }),
        // addWebpackModuleRule({}),
        addLessLoader({
            // strictMath: true,
            // modifyVars: { ...theme },
            lessOptions: {  //新版本写法
                noIeCompat: true,
                javascriptEnabled: true,
                modifyVars: { ...theme },
                modules: true
            }
            // localIdentName: '[local]--[hash:base64:5]', // 自定义 CSS Modules 的 localIdentName
        }),
        // setWebpackPublicPath('/jjg'), // 修改 publicPath
        addWebpackExternals({
            React: 'React',
            lodash: 'Lodash'
        }),
        // addWebpackModules(),
        //相当于lib引入直接 @lib即可
        addWebpackAlias({
            ['@']: path.resolve(__dirname,'./src'),
            ['lib']: path.resolve(__dirname,'./src/lib'),
            ['components']: path.resolve(__dirname,'./src/components'),
            // lib: resolveAlias('src/lib'),
            // components: resolveAlias('src/components'),
            // images: resolveAlias('src/assets/images'),
            // styles: resolveAlias('src/assets/styles'),
            // utils: resolveAlias('src/utils'),
            // pages: resolveAlias('src/pages'),
            // store: resolveAlias('src/store'),
            // router: resolveAlias('src/router'),
            // locale: resolveAlias('src/locale'),
            // layouts: resolveAlias('src/layouts'),
            // 处理警告  React-Hot-Loader: react-🔥-dom patch is not detected. React 16.6+ features may not work.
            ['react-dom']: '@hot-loader/react-dom'
            // 解决antd 的icon图标打包体积大
            // '@ant-design/icons': 'purched-antd-icons'
        }),
        //显示eslint
        disableEsLint(),
        appBuildPathFile(),
        disableChunk(),
        dropConsole(),
        // 关闭mapSource
        rewiredMap(),
        // 热更新
        hotLoader(),  //需要安装和修改index.js
        // 配置babel解析器
        addBabelPlugins(
            ['@babel/plugin-proposal-decorators', { legacy: true }],
            ["@babel/plugin-proposal-nullish-coalescing-operator"],
            ["@babel/plugin-proposal-optional-chaining"]
        ),
        //启用ES7的修改器语法（babel 7）
        // ['@babel/plugin-proposal-decorators', {legacy: true}],
        // ['@babel/plugin-proposal-class-properties', {loose: true}],
        // 打包编译完成提醒
        addWebpackPlugin(
            new WebpackBuildNotifierPlugin({
                title: '微外包管理系统',
                logo: path.resolve('./public/logo.png'),
                suppressSuccess: true
            }),
            new MiniCssExtractPlugin({
                filename: 'static/css/[name].[contenthash].css',
                chunkFilename: 'static/css/[id].[contenthash].css',
                ignoreOrder: false
                // moduleFilename: ({ name }) => `${name.replace('/js/', '/css/')}.css`
            }),
            new LodashWebpackPlugin({ collections: true, paths: true }),      // 美化控制台
            // new DashboardPlugin(dashboard.setData),
            // 进度条
            new ProgressBarPlugin(),
            delConflictingOrder(),
            addMiniCssExtractPlugin()
        ),
        rewireUglifyjs,
        // rewireCompressionPlugin,
        // 允许使用.babelrc文件进行Babel配置。
        useBabelRc(),
        // add webpack bundle visualizer if BUNDLE_VISUALIZE flag is enabled
        process.env.BUNDLE_VISUALIZE == 1 && addBundleVisualizer(),
        adjustWorkbox(wb =>
            Object.assign(wb, {
                skipWaiting: true,
                exclude: (wb.exclude || []).concat('index.html')
            })
        )
        // addDecoratorsLegacy() // 解析器,
    ),
    // 配置devServer
    devServer: configFunction => (proxy, allowedHost) => {
        //代理只有开发环境可用并且不是mocker的方式,mocker启动后不使用本地代理,防止api冲突
        proxy = process.env.NODE_ENV === 'development'  && process.env.npm_lifecycle_event !== 'mocker' ? proxyApi : {};
        // allowedHost： 添加额外的地址
        const config = configFunction(proxy, allowedHost);
        //配置mocker 
        if(process.env.npm_lifecycle_event === 'mocker'){
            config.before = app=>{
                apiMocker(app, path.resolve('./src/mocker/index.js'), {
                    proxy: {
                        '/:owner/:repo/raw/:ref/(.*)': 'http://127.0.0.1:3000'  //匹配路径
                    },
                    changeHost: true,
                })
            }
        }
        return config
    }
}
