const baseUrl = require('./src/libs/baseUrl')

module.exports = {
    //配置axios跨域请求
    devServer: {
        proxy: {
            '/api': { //访问路径，可以自己设置，
                target: baseUrl, //代理接口，即请求的url的前缀
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
    chainWebpack: config => {
        config
            .plugin('html')
            .tap(args => {
                args[0].title = 'title'
                return args
            })
    }
}
