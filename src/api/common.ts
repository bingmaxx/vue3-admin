import request from '../utils/request';

export async function apiGetCaptcha(): Promise<any> {
  return request({ url: '/common/captcha/get', method: 'get' });
}
