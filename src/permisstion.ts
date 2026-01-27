//路由鉴权：鉴权：项目当中路由能不能被访问的权限

import router from '@/router'
// @ts-ignore
import nprogress from 'nprogress'

//进度条的加载圆圈不要
nprogress.configure({showSpinner:false})

//引入进度条样式
import 'nprogress/nprogress.css'


//为什么要引pinia,因为在main>ts引入的时候,是在下面的,等同于permisstion.ts 是在 Vue 组件外部的普通模块中执行的，不是在组件内部
import pinia from "@/store";

//获取用户相关的小仓库内部token数据，去判断用户是否登陆成功
import useUserStore from "@/store/modules/user.ts";

const userStore = useUserStore(pinia)  //和这里为什么要将pinia传递给useUserStore,因为permisstion.ts在main.ts的顺序不对,同上


//全局前置守卫
router.beforeEach(async (to:any, from:any, next:any)=>{
    //访问某一路由之前的守卫
    nprogress.start()

    //获取token，去判断用户登录、还是未登录
    const token = userStore.token

    //获取用户名字
    let username = userStore.username
    // console.log('username',username)
    //用户登录判断
    if(token){
        //登录成功,访问login,指向首页
        if(to.path === '/login'){
            next('/')
        }else{
            //登陆成功访问其余的，放行
            //有用户信息
            if(username){
                //行放
                next()
            }else{
                //如果没有用户信息，在收尾这里发请求获取到了用户信息再放行
                try{
                   //获取用户信息
                    const res = await userStore.userInfo()
                    console.log('bbbbbbbb',res)
                    next()
                }catch (err){
                    //token过期|用户手动处理token
                    //退出登陆->用户相关的数据清空
                    userStore.userLogout()
                    //跳转到登陆页面
                    next({path:'/login',query:{redirect:to.path}})
                }
            }
        }
    }else {
        //用户未登录
        if(to.path === '/login'){
            next()
        }else{
            //未登录访问其余的，跳转到登陆页面
            next({path:'/login',query:{redirect:to.path}})
        }

    }

    next()
})

//全局后置守卫

router.afterEach((to:any, from:any)=>{
    nprogress.done()
})


//第一个问题：任意路由切换实现进度条业务 ----nprogress
//第二个问题：路由鉴权
//全部路由组件 ：登录|404|任意路由|首页|数据大屏|权限管理（三个子路由）|商品管理（4个子路由）

//用户未登录 ：可以访问login 其余都不行
//登陆成功：不可以访问login 其余都可以