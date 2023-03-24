import { getToken } from '../cache';
import { isString } from '../is';
import { showToastError } from '../ui';
import type { RequestConfig, RequestOptions, RequestTransform } from './types';
import { RequestMethodEnum, ResultEnum } from './types';

import { joinTimestamp, setParams } from './utils';

function addTokenToConfig(config: RequestConfig, options: RequestOptions) {
  const { withToken, tokenKey, authenticationScheme } = options;
  const token = getToken();
  // 白名单前缀
  const whiteUrlPrefix = `${options.baseUrl}/api/`;
  const isWhiteUrl = config.url.startsWith(whiteUrlPrefix);
  if (withToken && !isWhiteUrl) {
    if (token && tokenKey) {
      config.header = {
        ...config.header, [tokenKey]: authenticationScheme ? `${authenticationScheme} ${token}` : token,
      };
    }
  }
  return config;
}
export const transform: RequestTransform = {
  beforeRequestHook(config, options) {
    const data = config.data;
    const params = config.params;
    const { joinParamsToUrl, joinTime = true, baseUrl } = options;
    // 处理url 和 data
    config.url = baseUrl + config.url;
    // 处理data
    if (config.method === RequestMethodEnum.GET) {
      if (!isString(params)) {
      //  给 get 请求加上时间戳参数，避免从缓存中拿数据。
        config.data = Object.assign(data || {}, params || {}, joinTimestamp(joinTime, false));
      }
      else {
        // 兼容restful风格
        config.url = `${config.url + params}${joinTimestamp(joinTime, true)}`;
        config.params = undefined;
        config.data = undefined;
      }
    }
    else {
      if (params != undefined) {
        if (!isString(params)) {
          config.params = undefined;
          if (joinParamsToUrl)
            config.url = setParams(config.url as string, Object.assign({}, params));
        }
        else {
        // 兼容restful风格
          config.url = config.url + params;
          config.params = undefined;
        }
      }
    }
    // token

    config = addTokenToConfig(config, options);
    return config;
  },
  transformResponseHook: (res, options) => {
    // const { t } = useI18n();
    const { isTransformResponse, isReturnNativeResponse } = options;
    // 是否返回原生响应头 比如：需要获取响应头时使用该属性
    if (isReturnNativeResponse)
      return res;

    // 不进行任何处理，直接返回
    // 用于页面代码可能需要直接获取code，data，message这些信息时开启
    if (!isTransformResponse)
      return res.data;

    // 错误的时候返回

    const { data: nativeData } = res;
    if (!nativeData)
      throw new Error('请求出错，请稍候重试');
    const { code, msg } = nativeData;

    // 这里逻辑可以根据项目进行修改
    const hasSuccess = nativeData
     && Object.prototype.hasOwnProperty.call(nativeData, 'code')
     && code === ResultEnum.SUCCESS;

    if (hasSuccess)
      return nativeData;

    // 在此处根据自己项目的实际情况对不同的code执行不同的操作
    // 如果不希望中断当前请求，请return数据，否则直接抛出异常即可
    let errorMsg = '';
    switch (code) {
      case ResultEnum.TIMEOUT:
        errorMsg = '登录超时,请重新登录!';
        break;
      default:
        if (msg)
          errorMsg = msg;
        else
          errorMsg = '未知错误';
    }

    showToastError(errorMsg);
    throw new Error(errorMsg || '请求出错，请稍候重试');
  },
  requestCatchHook(error) {
    console.log(error.message);
    // const { response, code, message } = error || {};
    // // const errorMessageMode = config?.requestOptions?.errorMessageMode || 'none';
    // const msg: string = response?.data?.error?.message ?? '';
    // const err: string = error?.toString?.() ?? '';
    // let errMessage = '';
    // try {
    //   if (code === 'ECONNABORTED' && message.indexOf('timeout') !== -1)
    //     errMessage = '接口请求超时,请刷新页面重试!';

    //   if (err?.includes('Network Error'))
    //     errMessage = '网络异常，请检查您的网络连接是否正常!';
    //   if (errMessage) {
    //     showToastError?.(errMessage);
    //     return Promise.reject(error);
    //   }
    // }
    // catch (error) {
    //   throw new Error(error as unknown as string);
    // }
    // checkStatus(error?.response?.status, msg).catch(() => {
    //   showToastError?.(error.message);
    // });
    showToastError?.(error.message);

    return Promise.reject(error);
  },
};