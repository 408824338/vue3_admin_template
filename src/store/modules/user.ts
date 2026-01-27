//创建用户相关的小仓库
import {defineStore} from 'pinia'

//引入user接口方法
import {reqLogin,reqUserInfo} from '@/api/user'

//引入user接口types类型
import type {loginForm, loginResponse} from '@/api/user/types'

//引入数据类型
import type {UserState} from './types/types'

//引入操作本地存储的工具
import {getToken, REMOVE_TOKEN, setToken} from '@/utils/token.ts'


//引入路由(常量路由)
import {constantRoute} from "@/router/routes.ts";

//创建用户小仓库
let useUserStore = defineStore('user', {
    state: (): UserState => {
        return {
            // token: localStorage.getItem('TOKEN'),
            token: getToken(),
            menuRoutes: constantRoute,// 仓库存储生成菜单需要数组(路由)
            username:'',
            avatar:''
        }
    },
    actions: {
        async userLogin(data: loginForm) {
            let res: loginResponse = await reqLogin(data)
            if (res.code === 200) {

                // 检查响应数据是否存在
                if (!res.data) {
                    return Promise.reject(new Error('登录响应数据无效，缺少token'))
                }

                this.token = res.data

                // this.username =  res.data

                //持久化本地存储token
                // localStorage.setItem('TOKEN',res.data.token)
                setToken(res.data)

                // console.log('token',getToken())
                //能保证当前async函数返回一个成功的promise
                return 'ok'
            } else {

                return Promise.reject(new Error(res.message || '登录失败'))
            }
        },
        userLogout() {
            //获取用户信息方法
            //本地数据清空
            this.token = ''
            this.username = ''
            this.avatar = ''
            REMOVE_TOKEN()
        },
        //获取用户信息方法
        async userInfo(){
            let result = await reqUserInfo()
            if (result.code === 200) {
                this.username = result.data.name
                this.avatar = result.data.avatar
            }

        }
    }
})

//对外暴露
export default useUserStore

