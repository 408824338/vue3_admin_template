//封闭本地存储数据和读取数据方法

export function setToken(token: string) {
  localStorage.setItem("token", token);
}

//读取token的方法
export function getToken() {
  return localStorage.getItem("token");
}

//本地存储删除数据方法
export const REMOVE_TOKEN =()=>{
    localStorage.removeItem('token')
}