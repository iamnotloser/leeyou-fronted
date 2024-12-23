import axios from "axios";

const isDev = process.env.NODE_ENV === 'development';

const myaxios = axios.create({
    baseURL: isDev ? 'http://localhost:8080/api' : 'https://119.91.48.253:8080/api',
    withCredentials:true

});


// 向给定ID的用户发起请求
// 添加请求拦截器
myaxios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    console.log("请求正在发送...",config);
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
myaxios.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    console.log("请求已经返回...",response);
    if(response?.data.code === 40100){
        //未登录
        //跳转登录页面
        const redirectUrl = window.location;
        window.location.href = `/user/login?redirect=${redirectUrl}`;
    }
    return response.data;
}, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
});
export default myaxios;