//进行axios请求二次封装:使用请示与响应拦截器
import axios from 'axios'
import {ElMessage} from "element-plus";
import useUserStore from "@/store/modules/user.ts";


//第一步:利用axios对象的create方法,去创建axios实例对象
let request = axios.create({
    //基础路径
    baseURL:import.meta.env.VITE_APP_BASE_API, //基础路径上会携带/api
    timeout:5000 //请求超时时间
});

//第二步:request实例对象进行请求拦截和响应拦截
request.interceptors.request.use((config)=>{
    const userStore = useUserStore()
    if (userStore.token) {
        config.headers.token = userStore.token
    }
    // config.headers.token = 123  //可以配置请示头携带token
    // console.log(config)
    return config
})

//响应拦截器
request.interceptors.response.use((response)=>{
    return response.data
},(error)=>{
    //处理网络错误
    let msg = ''
    let status =  error.response.status
    switch (status) {
        case 401:
            msg = 'token过期'
            break;
        case 403:
            msg = '无权访问'
            break;
        case 404:
            msg = '请求资源不存在'
            break;
        case 500:
            msg = '服务器出现问题'
            break;
        default:
            msg = '无网络'
            break;
    }
    ElMessage({
        message:msg,
        type:'error'
    })
    return Promise.reject(error)
});

export default request