import axios from 'axios';
import store from '@/store';

const request = axios.create({
    baseURL:"/api",
    timeout:20000
})

const CancelToken = axios.CancelToken;

request.interceptors.request.use((config)=>{
    let cb;

    config.cancelToken = new CancelToken((callback)=>{
        // 该回调函数会被同步执行,形参callback是一个函数,调用callback就会取消当前请求
        cb = callback;
    })

    store.commit('ADD_FN',{
        url:config.url,
        cb
    })
    return config
})

request.interceptors.response.use((response)=>{
    // console.log(response)
    const url = response.config.url;
    store.commit('REMOVE_FN',url)
    return response.data;
})

export default request