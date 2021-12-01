import axios from "axios";
import {Message} from "element-ui";
import router from '../router'

let base = '';
let innerHttp = axios.create({
  baseURL: '${base}${url}',
  // 请求头部
  headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'},
  // 超时时间
  timeout: 5000,
});
//相应拦截器
innerHttp.interceptors.response.use(success => {
  //业务逻辑错误
  if (success.status && success.status == 200) {
    if (success.data.code == 500 || success.data.code == 401 || success.data.code == 403) {//业务逻辑错误|未登录|权限禁止
      //返回错误信息
      Message.error({message: success.data.message});
      return;
    }
    if (success.data.message) {
      Message.success({message: success.data.message})
    }
  }
  return success.data;
}, error => {
  if (error.response.code == 504 || error.response.code == 404) {//服务器挂机|页面丢失
    Message.error({message: '服务器被吃( ╯□╰ )'});
  } else if (error.response.code == 403) {
    Message.error({message: '权限不足，请联系管理员！'});
  } else if (error.response.code == 401) {
    Message.error({message: '尚未登录，请登录！'});
    router.replace('/login');
  } else {
    if (error.response.data.message) {
      Message.error({message: error.response.data.message});
    } else {
      Message.error({message: '未知错误'})
    }
  }
  return;//错误返回空
})

export default innerHttp
