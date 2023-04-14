//与服务端进行联调的测试：http://localhost:7001/user/login?name=BlendAndroid&pwd=123456
//本机的ip地址：10.219.28.247

const apiConfig = {
    login: {
        url: '/user/login',
        method: 'get',
    },
    homeList: {
        url: '/home/homeList',
        method: 'get',
    },
    articleDetail: {
        url: '/article/articleDetail',
        method: 'get',
    },
}

export default apiConfig;