import { request } from '../utils/request';

// 获取验证码
export function getCodeImg() {
  return request.get<ResponseResult<{ img: string; uuid: string }>>(
    {
      url: '/api/sys/type/sys_user_sex',
      params: {
        a: 1,
      },
    },
  );
}