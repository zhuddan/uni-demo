import { Request } from './request';
import { transform } from './transform';

export const request = new Request({
  config: {
    timeout: 60e3,
  },
  transform,
  requestOptions: {
    // Interface address, use the default apiUrl if you leave it blank
    baseUrl: __APP_API_URL__,
    // 把 parameters 添加到 url 上面 主要是应对非 git 请求需要使用？传递参数
    joinParamsToUrl: true,
    // 是否需要 转化请求返回的数据 默认 true
    isTransformResponse: true,
    // 返回原生数据 比如你需要返回请求头的时候
    isReturnNativeResponse: false,
    // Error message prompt type
    errorMessageMode: 'mode',
    // git请求加个时间戳
    joinTime: true,
    // 是否需要token
    withToken: true,
    // tokenkey
    tokenKey: 'Authorization',
    // 前缀吧
    authenticationScheme: '',
  },
});