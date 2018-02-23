
//配置不同环境请求接口

let apiConfig = {
    test: 't.api.resource.dotransit.net/basedata',
    cn: 'resource.dotransit.cn',
    com: 'resource.dotransit.com',
    dev: 'resource.dotransit.net',
    requestPath(env) {
        return this[env];
    }
}

export default apiConfig