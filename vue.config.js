const Timestamp = new Date().getTime();
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
module.exports = {
    //配置axios跨域请求
    devServer: {
        proxy: {
            '/api': { //访问路径，可以自己设置，
                target: 'http://192.168.1.6/zwxx', //代理接口，即请求的url的前缀
                // target: 'http://192.168.1.6/zwxx', //代理接口，即请求的url的前缀
                changeOrigin: true, //设置是否跨域，开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样客户端端和服务端进行数据的交互就不会有跨域问题
                ws: false, // 是否启用websockets
                pathRewrite: { //访问路径重写
                    '^/api': ''
                }
            }
        }
    },
    publicPath: './',
    outputDir: "form",
    configureWebpack: { //webpack 配置
        output: { // 输出重构  打包编译后的 文件名称  【模块名称.版本号.时间戳】
            filename: `js/[name].${Timestamp}.js`,
            chunkFilename: `js/[name].${Timestamp}.js`
        },
        plugins: [
            new MiniCssExtractPlugin({
                //修改打包后的css文件名
                filename: `css/[name].${Timestamp}.css`,
                chunkFilename: `css/[name].${Timestamp}.css`,
            }),
        ],
    },
    chainWebpack: config => {
        config
            .plugin('html')
            .tap(args => {
                args[0].title = 'title'
                return args
            })
    }
}
