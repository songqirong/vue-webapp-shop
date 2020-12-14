import axios from 'axios';
let baseURL = 'http://localhost:8090/api/v1'
const instance = axios.create({
    baseURL,
    timeout:7000,
    headers:{}
})
instance.interceptors.request.use(function(config){
    // token 的作用，是用户鉴权
    config.headers.Authorization = localStorage.getItem('token') || ''
    return config;
},function(error){
    return Promise.reject(error);
})
instance.interceptors.response.use(function(response){
    if(response.status==200){
        if(response.data.msg === 'token invalid'){
            localStorage.removeItem('token');
            location.href="http://localhost:8090/#/login"
            return ;
        }
        if(response.data&&response.data.success){
            return response.data.data;
        }else{
            alert('网络异常，请稍后再试')
        }
    }
},function(error){
    return Promise.reject(error);
})
export default instance;