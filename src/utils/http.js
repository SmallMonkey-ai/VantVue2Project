// 封装axios
import axios from 'axios'
// 导入加载条
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import Vue from 'vue'

import getBaseUrl from './baseUrl'
// 初始化axios 对象
var http = axios.create({
    //以application / x-www-form-urlencoded格式发送数据
    headers: {
        // "content-type": "application/x-www-form-urlencoded",
        "content-type": "application/json",
    },
    //带cookie请求
    withCredentials: true,
    baseURL: getBaseUrl(process.env.NODE_ENV),
    timeout: 10000
})

// 添加请求拦截器
http.interceptors.request.use((config) => {
    NProgress.start()
    return config
}, error => {
    NProgress.done()
    return error
}
)


// 添加响应拦截器
http.interceptors.response.use((response) => {
    NProgress.done()
    if (response.status !== 200 && !isNaN(response.status)) {
        Vue.prototype.$alert('响应错误，' + response.data.data);
    }
    return response
}, error => {
    NProgress.done()
    const data = error.response.data.data;
    Vue.prototype.$alert(data ? data : '请求失败,错误码: ' + error.response.status,);
    return Promise.reject(error)
}
)
// 导出
export default http