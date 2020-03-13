import axios from 'axios';
import message from '../utils/message';
const baseUrl = 'http://192.168.0.183:8083'; 
// const baseUrl = 'http://zhcl.4000750222.com/testdivided'; 
// const CancelToken = axios.CancelToken;
// let cancelRequext;
const error_arr = [1001, 1002, 1003, 1004, 1008, 2002]
const login_arr = [1000, 1005, 1007]
const reg = /(\/login)$/

axios.defaults.timeout = 10000;

// axios.defaults.cancelToken = new CancelToken(function (cancel) {
// 	cancelRequext = cancel	
// })
  
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
axios.defaults.transformRequest = data => JSON.stringify(data);

axios.interceptors.request.use(
  config => {
	if(reg.test(config.url))return config; 
	
	const token = sessionStorage.getItem('token'); 
	if(!token||token===""){
		window.location.href = window.location.origin+"/#/login"
	}
	config.headers.token = token
    return config
  },
  error => {        
      return Promise.error(error);     
  }
);

axios.interceptors.response.use(
  response => {
	if(response.data.code===2){
	  	message.error('未知错误')
	}else if(error_arr.includes(response.data.code)){
		message.error(response.data.msg)
	}else if(login_arr.includes(response.data.code)){
		message.error('登录错误!请重新登录')	
		if(window.location.href.includes('/login')) return response
		setTimeout(()=> {
			window.location.href = window.location.origin+"/#/login"
		}, 1500)
	}else if(response.data.code===1){
		
	}else{
		message.error(response.data.msg)
	}
    return response;
  },
  error => {
	  if (!window.navigator.onLine){
		  message.error('请检查网络连接!')
		  return
	  }
	  message.error('未知错误')
	  return Promise.reject(error.response)
  }
)

export function get(url, params={}){    
    return new Promise((resolve, reject) =>{ 
        axios.get(baseUrl+url, {            
            params: params        
        })        
        .then(res => { 
            if(res.data){
            	resolve(res.data);
            }else{
			  resolve({
				  code: 2,
				  msg: ''
			  })
            }        
        })        
        .catch(err => { 
            reject(err)        
        })    
    });
}

export function post(url, data = {}){
   return new Promise((resolve,reject) => {
     axios.post(baseUrl+url, data)
          .then(response => {
			  if(response.data){
				  resolve(response.data);
			  }else{
				  resolve({
					  code: 2,
					  msg: ''
				  })
			  }
            
          },err => {
            reject(err)
          })
   })
 }


