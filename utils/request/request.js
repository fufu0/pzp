import axios from 'axios'
import settle from "axios/lib/core/settle"
import buildURL from "axios/lib/helpers/buildURL"

// create an axios instance
const service = axios.create({
	baseURL: 'https://api-ugo-web.itheima.net', // url = base url + request url
	//withCredentials: true, // send cookies when cross-domain requests 注意：withCredentials和后端配置的cross跨域不可同时使用
	timeout: 6000, // request timeout
	crossDomain: true
})

// request拦截器,在请求之前做一些处理
service.interceptors.request.use(
    config => {
        // if (store.state.token) {
        //     // 给请求头添加user-token
        //     config.headers["user-token"] = store.state.token;
        // }
        console.log('请求拦截成功')
        return config;
    },
    error => {
        console.log(error); // for debug
        return Promise.reject(error);
    }
); 

//配置成功后的拦截器
service.interceptors.response.use(res => {
    // console.log(res);
    if (res.data.meta.status == 200) {
        // console.log(res);
        return res.data.message
    } else {
        // return Promise.reject(res.data.msg);
        uni.showToast({
          title:res.data.meta.msg,
          duration: 1500,
          icon:'none'
        })
        // return [];
    }
}, error => {
	// if (error.response.status) {
		// switch (error.response.status) {
		// 	case 401:
		// 		break;
		// 	default:
		// 		break;
		// }
	// }
    Promise.reject(error).catch((reason) => {
        console.log(reason);
    })
})


// 在main.js中放入这段自定义适配器的代码，就可以实现uniapp的app和小程序开发中能使用axios进行跨域网络请求，并支持携带cookie
axios.defaults.adapter = function(config) { 
    return new Promise((resolve, reject) => {
        console.log(config)
        // var settle = require('../../node_modules/axios/lib/core/settle');
        // var buildURL = require('../../node_modules/axios/lib/helpers/buildURL');
        uni.request({
            method: config.method.toUpperCase(),
            url: config.baseURL + buildURL(config.url, config.params, config.paramsSerializer),
            header: config.headers,
            data: config.data,
            dataType: config.dataType,
            responseType: config.responseType,
            sslVerify: config.sslVerify,
            complete: function complete(response) {
                console.log("执行完成：",response)
                response = {
                    data: response.data,
                    status: response.statusCode,
                    errMsg: response.errMsg,
                    header: response.header,
                    config: config
                };

                settle(resolve, reject, response);
            }
        })
    })
}

export default service