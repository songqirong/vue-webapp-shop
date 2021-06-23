module.exports={
    devServer:{
        // 改变端口号
        port:'8090',
        // 代理配置
        proxy: {
            '/api': {
              target: 'https://api.persion.cn',  // 是接口所在的服务器地址
              ws: true,
              changeOrigin: true
            },
        }
    },
    publicPath:'/',
}