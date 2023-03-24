import { isFunction } from '../is';
import type {
  RequestConfig,
  RequestConfigWithoutMethod,
  RequestConstructorOptions,
  RequestOptions,
  ResquestNativeResponse,
  Result,
} from './types';

export class Request {
  options: RequestConstructorOptions;
  constructor(options: RequestConstructorOptions) {
    this.options = options;
  }

  // get 允许使用 data  只能使用 params
  // get 请求会自带一个时间戳
  get<T = any>(config: Omit<RequestConfigWithoutMethod, 'data'>, options?: RequestOptions) {
    return this.request<T>({ ...config, method: 'GET' }, options);
  }

  // post,put,delete  可以是同 data 和 params
  // params 的参数会被拼接到url上
  post<T = any>(config: RequestConfigWithoutMethod, options?: RequestOptions) {
    return this.request<T>({ ...config, method: 'POST' }, options);
  }

  put<T = any>(config: RequestConfigWithoutMethod, options?: RequestOptions) {
    return this.request<T>({ ...config, method: 'PUT' }, options);
  }

  delete<T = any>(config: RequestConfigWithoutMethod, options?: RequestOptions) {
    return this.request<T>({ ...config, method: 'DELETE' }, options);
  }

  crateRequestConfig(config: RequestConfig, options: RequestOptions = {}) {
    let conf = { ...config };
    const { beforeRequestHook } = this.options.transform || {};
    const { requestOptions } = this.options;
    const mergeRequestOptions = { ...requestOptions, ...options };
    if (isFunction(beforeRequestHook))
      conf = beforeRequestHook(config, mergeRequestOptions);

    return conf;
  }

  request<T=any>(config: RequestConfig, options?: RequestOptions) {
    return new Promise<T>((resolve, reject) => {
      const { requestOptions } = this.options;
      const mergeRequestOptions = { ...requestOptions, ...options };
      const mergeConfig = { ...this.options.config, ...config };
      const { beforeRequestHook, requestCatchHook, transformResponseHook } = this.options.transform || {};
      let conf = { ...mergeConfig };
      if (isFunction(beforeRequestHook))
        conf = beforeRequestHook(conf, mergeRequestOptions);

      uni.request({
        ...conf,
        success(result) {
          if (transformResponseHook && isFunction(transformResponseHook)) {
            try {
              const ret = transformResponseHook(result as ResquestNativeResponse<Result<T>>, mergeRequestOptions);
              resolve(ret);
            }
            catch (err) {
              reject(err || new Error('request error!'));
            }
          }
          else {
            resolve(result as unknown as Promise<T>);
          }
        },
        fail(e) {
          requestCatchHook?.(new Error(e.errMsg), mergeRequestOptions);
        },
      });
    });
  }
}