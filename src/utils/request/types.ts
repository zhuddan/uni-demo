export type RequestData = string | AnyObject | ArrayBuffer;

export type RequestMethod = Required<UniNamespace.RequestOptions>['method'];
export enum RequestMethodEnum {
  OPTIONS = 'OPTIONS',
  GET = 'GET',
  HEAD = 'HEAD',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
  TRACE = 'TRACE',
  CONNECT = 'CONNECT',
}

export interface RequestConfig<T extends RequestData = RequestData> extends UniNamespace.RequestOptions {
  data?: T;
  params?: T;
}
export type RequestConfigWithoutMethod = Omit<RequestConfig, 'method'>;
export type RequestConfigWithoutUrl = Omit<RequestConfig, 'url'>;
export type ErrorMessageMode = 'mode' | 'message';
export enum ResultEnum {
  SUCCESS = 200,
  ERROR = 500,
  TIMEOUT = 401,
}
export interface Result<T = any> {
  code: number;
  msg: string;
  data: T;
}
export interface ResquestNativeResponse<T extends RequestData = RequestData> extends UniApp.RequestSuccessCallbackResult {
  data: T;
}

export interface RequestOptions {
  // Interface address, use the default apiUrl if you leave it blank
  baseUrl?: string;
  // 把 parameters 添加到 url 上面 主要是应对非 git 请求需要使用？传递参数
  joinParamsToUrl?: boolean;
  // 是否需要 转化请求返回的数据 默认 true
  isTransformResponse?: boolean;
  // 返回原生数据 比如你需要返回请求头的时候
  isReturnNativeResponse?: boolean;
  // Error message prompt type
  errorMessageMode?: ErrorMessageMode;
  // git请求加个时间戳
  joinTime?: boolean;
  // 是否需要token
  withToken?: boolean;
  // tokenkey
  tokenKey?: string;

  authenticationScheme?: string;
}

export interface RequestTransform {
  /**
   * @description: Process configuration before request
   */
  beforeRequestHook?: (config: RequestConfig, options: RequestOptions) => RequestConfig;
  /**
   * @description: Request successfully processed
   */
  transformResponseHook?: (res: ResquestNativeResponse<Result>, options: RequestOptions) => any;
  /**
   * @description: 请求失败处理
   */
  requestCatchHook?: (e: Error, options: RequestOptions) => Promise<any>;
}
export interface RequestConstructorOptions {
  config?: RequestConfigWithoutUrl;
  requestOptions?: RequestOptions;
  transform?: RequestTransform;
}
