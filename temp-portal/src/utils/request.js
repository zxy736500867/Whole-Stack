import axios from 'axios'
import config from "../config/index.js";
import { ElMessage } from 'element-plus'

/**
 * axios二次封装
 */

// 创建axios实例
const service = axios.create({
    baseURL: config.baseURL,
    timeout: 5000,
})

// request拦截器
service.interceptors.request.use(req => {

    //TODO: 请求拦截 一般用于处理token
    return req
})

// response拦截器
service.interceptors.response.use(res => {
    const {code, data, msg} = res.data
    if (code === 200) {
        return data
    }else if (code === 405) {
        //405 token失效
        ElMessage.error(msg)
        return Promise.reject(msg)
    }else {
        //其他错误
        ElMessage.error(msg)
        return Promise.reject(msg)
    }
})

/**
 * 统一处理请求
 * @param options 请求配置
 * @returns {AxiosPromise}
 */
function request(options) {
    options.method = options.method || 'get'
    if (options.method.toLowerCase() === 'get') {
        options.params = options.data
    }

    if (config.env === 'prod') {
        //开发环境
       service.defaults.baseURL = config.baseURL
    }else {
        //生产环境
        service.defaults.baseURL = config.mock ? config.mockUrl : config.baseURL
    }

    //链式调用
    ['get', 'post', 'put', 'delete', 'head', 'options', 'patch'].forEach(method => {
        request[method] = function (url, data, options) {
            return request({
                method,
                url,
                data,
                ...options
            })
        }
    })

    return service(options)
}

export default request

