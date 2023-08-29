import axios, { type AxiosPromise, type AxiosRequestConfig, type AxiosResponse } from 'axios';
// import { ElNotification, ElMessage } from 'element-plus';
import router from '@/router/index';
import { noVerifyUrl } from '@/router/index';
import { SSKey, LSKey } from '@/utils/public';
import { setSS, getToken, setToken } from '@/utils/func';

export interface ResponseData {
  code?: number;
  data?: any;
  msg?: string;
  token?: string;
  count?: number;
}

const customCodeMessage: { [key: number]: string } = {
  4001: '当前用户登入信息已失效，请重新登入再操作',
};

const serverCodeMessage: { [key: number]: string } = {
  200: '服务器成功返回请求的数据',
  400: 'Bad Request',
  401: 'Unauthorized',
  403: 'Forbidden',
  404: 'Not Found',
  500: '服务器发生错误，请检查服务器(Internal Server Error)',
  502: '网关错误(Bad Gateway)',
  503: '服务不可用，服务器暂时过载或维护(Service Unavailable)',
  504: '网关超时(Gateway Timeout)',
};

/**
 * 异常处理程序
 */
const errorHandler = (error: any) => {
  const { response, message } = error;
  if (message === 'CustomError') {
    // 自定义错误
    const { config, data } = response;
    const { url, baseURL } = config;
    console.log(config);

    const { code, msg } = data;
    const reqUrl = url.split("?")[0].replace(baseURL, '');
    const noVerifyBool = noVerifyUrl.includes(reqUrl);
    if (!noVerifyBool) {
      console.log('[LOG] ', customCodeMessage[code] || msg || 'Error');
      if (code === 4001) {
        router.replace('/user/login');
      }
    }
  } else if (message === 'CancelToken') {
    console.log(message);
  } else if (response && response.status) {
    const errorText = serverCodeMessage[response.status] || response.statusText;
    const { status, request } = response;
    console.log('[LOG] ', status, request, errorText);

  } else if (!response) {
    console.log('[LOG] ', '网络异常');
  }

  return Promise.reject(error);
}

/**
 * 配置request请求时的默认参数
 */
const request = axios.create({
  withCredentials: true, // 当跨域请求时发送cookie
  timeout: 0 // 请求超时时间,5000(单位毫秒) / 0 不做限制
});

/**
 * 请求后 - 响应拦截器
 */
request.interceptors.response.use(
  async (response: AxiosResponse) => {
    const res: ResponseData = response.data;

    const { key } = response.headers;
    if (key) {
      setSS(SSKey.key, key);
    }

    // 自定义状态码验证
    const { code } = res;
    if (typeof code === 'number' && code !== 1) {
      return Promise.reject({
        response,
        message: 'CustomError',
      });
    }

    // 重置刷新token
    const { token } = res?.data || {};
    if (token) {
      await setToken(token);
    }

    return response;
  },
);

export default function (config: AxiosRequestConfig): AxiosPromise<any> {
  return request(config).then((response: AxiosResponse) => response.data).catch(error => errorHandler(error));
}
