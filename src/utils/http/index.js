import axios from "axios";
// import QS from 'qs';
// import { Toast } from "vant";
import store from "@/store";
import router from "@/router";

var ConfigBaseURL = ""; //默认路径，这里也可以使用env来判断环境
// 请求列表(防重复提交)
// 用于存储目前状态为pending的请求标识信息
let pendingRequest = [];

// 环境的切换
if (process.env.NODE_ENV == "development") {
  ConfigBaseURL = "http://localhost:3000";
} else if (process.env.NODE_ENV == "production") {
  ConfigBaseURL = "http://localhost:8080";
}

const Service = axios.create({
  timeout: 7000, // 请求超时时间
  baseURL: ConfigBaseURL,
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
  },
});

// 添加请求拦截器
Service.interceptors.request.use(
  (config) => {
    // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
    // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
    // const token = store.state.user.token;
    const token = '';
    token && (config.headers.Authorization = `Bearer ${token}`);
    //防止重复提交（如果本次是重复操作，则取消，否则将该操作标记到requestList中）
    const requestMark =
      JSON.stringify(config.url) +
      "&" +
      JSON.stringify(config.data) +
      "&" +
      JSON.stringify(config.params) +
      "&" +
      config.method;
    // 找当前请求的标识是否存在pendingRequest中，即是否重复请求了
    const markIndex = pendingRequest.findIndex((item) => {
      return item.name === requestMark;
    });
    // 存在，即重复了
    if (markIndex > -1) {
      // 取消上个重复的请求
      pendingRequest[markIndex].cancel();
      // 删掉在pendingRequest中的请求标识
      pendingRequest.splice(markIndex, 1);
    }
    // （重新）新建针对这次请求的axios的cancelToken标识
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    config.cancelToken = source.token;
    // 设置自定义配置requestMark项，主要用于响应拦截中
    config.requestMark = requestMark;
    // 记录本次请求的标识
    pendingRequest.push({
      name: requestMark,
      cancel: source.cancel,
      routeChangeCancel: config.routeChangeCancel, // 可能会有优先级高于默认设置的routeChangeCancel项值
    });
    return config;
  },
  (error) => {
    return Promise.error(error);
  }
);

// 添加响应拦截器
const handleResponseIntercept = (config) => {
  // 根据请求拦截里设置的requestMark配置来寻找对应pendingRequest里对应的请求标识
  let markIndex = pendingRequest.findIndex((item) => {
    return item.name === config.requestMark;
  });
  // 找到了就删除该标识
  markIndex > -1 && pendingRequest.splice(markIndex, 1);
};
Service.interceptors.response.use(
  (response) => {
    // 根据请求拦截里设置的requestMark配置来寻找对应pendingRequest里对应的请求标识
    handleResponseIntercept(response.config);
    // 刷新token
    let newAuth = response.headers.Authorization;
    if (newAuth) {
      let token = newAuth.slice(7);
      store.commit("auth/setToken", token);
    }
    return Promise.resolve(response);
  },
  //
  (error) => {
    // 隐藏loading,防止出错一直loading
    // store.commit("common/setLoadingState", false);
    let errorFormat = {};
    const response = error.response;
    // 请求已发出，但服务器响应的状态码不在 2xx 范围内
    if (response) {
      handleResponseIntercept(response.config);
      // 设置返回的错误对象格式（按照自己项目实际需求）
      errorFormat = {
        status: response.status,
        data: response.data,
      };
    }
    // 如果是主动取消了请求，做个标识
    if (axios.isCancel(error)) {
      errorFormat.selfCancel = true;
      return Promise.reject(errorFormat);
    }

    //网络超时
    if (
      error.code == "ECONNABORTED" ||
      error.message == "Network Error" ||
      (error.message && error.message.includes("timeout"))
    ) {
      // Toast("网络超时");
      return Promise.reject({ isTimeout: true });
    }
    if (error.response && error.response.status) {
      let rName = router.app ? router.app._route.name : null;
      switch (error.response.status) {
        /**
         *  401: 未登录;
         *  504: 网关超时;
         */
        // 未登录则跳转登录页面，并携带当前页面的路径
        // 在登录成功后返回当前页面，这一步需要在登录页操作。
        case 401:
          // Toast("请重新登录");
          // 防止多次重定向到登陆页面
          if (!rName || (rName && rName.indexOf("auth") == -1)) {
            router.replace({
              path: "/auth",
              query: { redirect: router.currentRoute.fullPath, loginPage: 1 }, // 将跳转的路由path作为参数，登录成功后跳转到该路由
            });
          }
          break;
        case 504:
          break;
        default:
          break;
      }
    }
    return Promise.reject(error);
  }
);

/**
 * @param {String} url [请求的url地址]
 * @param {String} method [get,post]
 * @param {Object} params [请求时携带的参数]
 */
export default function request(
  { url, method = "get", params },
  myConfig = {}
) {

  let config = {
    method: method,
    url: url,
  };
  if (method.toLowerCase() == "get") {
    config.params = Object.assign({}, params);
  } else if (method.toLowerCase() == "post") {
    config.data = Object.assign({}, params);
  }
  config = Object.assign({}, config, myConfig);
  return new Promise((resolve, reject) => {
    Service(config)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export { pendingRequest };
