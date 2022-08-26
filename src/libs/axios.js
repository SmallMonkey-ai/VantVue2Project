import Axios from "axios";
//引入qs库
// import qs from "qs";
import Vue from 'vue';

//判断开发环境是本地还是线上 true是本地 false是线上
//保存url 如果是本地 则url前缀为/api 如果是线上 则url前缀为线上api地址
import baseUrl from '../utils/baseUrl';

let url = process.env.NODE_ENV == "development" ? "/api" : baseUrl;
const axios = Axios.create({
    //以application / x-www-form-urlencoded格式发送数据
    headers: {
        // "content-type": "application/x-www-form-urlencoded",
        "content-type": "application/json",
    },
    //带cookie请求
    withCredentials: true,
});
//给每个url添加默认前缀
axios.defaults.baseURL = url;

//请求拦截
axios.interceptors.request.use((config) => {
    //如果发送的数据本身就是FormData格式的数据 那么就不需要用qs模块进行转换
    // if (typeof config.data == "object" && config.data.__proto__.toString() == "[object FormData]") return config;
    if (config.method == "post") {
        //如果是post请求 使用qs模块转换发送的数据
        // config.data = qs.stringify(config.data);
    }
    return config;
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    const data = response.data;
    const resultCode = +data.result;

    if (resultCode !== 200 && !isNaN(resultCode)) {
        Vue.prototype.Notify({
            message: '响应错误，' + data.data,
            type: 'warning'
        });
    }

    return response.data;
}, function (error) {
    const data = error.response.data.data;
    // 对响应错误做点什么
    Vue.prototype.Notify({
        message: data ? data : '请求失败,错误码: ' + error.response.status,
        type: 'danger'
    });
    return Promise.reject(error);
});
export default axios;
