//统一管理用户相关的接口
import request from '@/utils/request'

import type {loginForm,loginResponse,userResponseData} from './types.ts'

//统一管理接口

// @ts-ignore
enum API {
    LOGIN_URL = '/admin/acl/index/login',
    USERINFO_URL = '/admin/acl/index/info',
    LOGOUT_URL = '/admin/acl/index/logout',
}

//暴露请示函数
//登录接口方法
export const reqLogin = (data:loginForm)=>request.post<any,loginResponse>(API.LOGIN_URL,data);

//获取用户信息接口方法
export const reqUserInfo = ()=>request.get<any,userResponseData>(API.USERINFO_URL)

//退出登录
export const reqLogout = () => {
    return request.post<any, any>(API.LOGOUT_URL)
}
