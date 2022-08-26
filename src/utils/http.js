// 封装axios
import axios from 'axios'
// 导入加载条
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

// 引入自定义弹窗 确保钉钉环境正常显示
import { alert } from "./alert";
import getBaseUrl from './baseUrl'
// 初始化axios 对象
var instance = axios.create({
    baseURL: getBaseUrl(process.env.NODE_ENV),
    timeout: 10000
})

// 添加请求拦截器
instance.interceptors.request.use((config) => {
    // 请求头携带token
    var token = localStorage.getItem('token') || ''
    config.headers.Authorization = token
    NProgress.start()
    return config
},
    function (error) {
        NProgress.done()
        return error
    }
)
// 添加响应拦截器
instance.interceptors.response.use(
    function (response) {
        NProgress.done()
        return response
    },
    function (error) {
        NProgress.done()
        return error
    }
)

let post = function (url, params) {
    instance.get(url, { params }).then(
        (response) => {
            return response.data
        }).catch(function (error) {
            if (url.indexOf('promotion') > -1) {
                alert("月底数据量大,系统正在拼命计算中,请耐心等待30秒后再重新查看,无需报修。")
            } else if (url.indexOf('prompt-by-type') > -1) {
                alert("月底数据量大,系统正在拼命计算中,请耐心等待30秒后再重新查看,无需报修。")
            } else if (url.indexOf('prompt-by-category') > -1) {
                alert("月底数据量大,系统正在拼命计算中,请耐心等待30秒后再重新查看,无需报修。")
            } else if (url.indexOf('promotion-resouces') > -1) {
                alert("月底数据量大,系统正在拼命计算中,请耐心等待30秒后再重新查看,无需报修。")
            } else {
                alert("系统正在计算,请稍候再试")
            }
            return error
        })

}

let get = async function (url, params) {
    let { data } = await instance.get(url, params)
    return data
}

// 导出
export {
    get,
    post
}