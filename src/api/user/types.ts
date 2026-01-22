//登录接口需要携带参数
export interface loginForm{
    username:string,
    password:string
}

interface dataType{
    token?:string,
    message?:string
}

//登录接口返回数据类型
export interface loginResponse {
    code: number,
    data: dataType
}


//返回用户信息返回数据类型

interface  userInfo{
    userId:string,
    avatar:string,
    username:string,
    password:string,
    desc:string,
    roles:string[],
    buttons:string[],
    routes:string[],
    token:string,
}

interface user{
    checkUser:userInfo
}
export interface userResponseData{
    code:number,
    data:user
}