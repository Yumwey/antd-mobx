//配置请求设置
import axios from 'axios'
import _ from 'lodash'
import config from './config'
import docCookies from './docCookies';

let httpService
console.log(`http://api.${config.requestPath(API_ENV)}/basedata`)
httpService = axios.create ({
    method: 'post',
    baseURL: `http://api.${config.requestPath(API_ENV)}/basedata`,  // 不同环境请求接口地址
    timeout: 5000, //超时时间
    headers: {
        tokenId: docCookies.getItem('token')
    }
})

// 请求拦截器
httpService.interceptors.request.use((config) => config, (error) => Promise.reject(error))
// 响应拦截
httpService.interceptors.response.use((config) => config, (error) => Promise.reject(error))

export default httpService