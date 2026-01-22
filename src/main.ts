import { createApp } from 'vue'


import App from './App.vue'


import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css'
//@ts-ignore忽略当前文件ts类型的检测否则有红色提示(打包会失败)
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
// import zhCn from 'element-plus/dist/locale/en.mjs'



const app  = createApp(App)

// console.log(import.meta.env)
// app.use(ElementPlus)
app.use(ElementPlus, { locale: zhCn })

//svg插件需要配置代码
// @ts-ignore
import 'virtual:svg-icons-register'

//注册全局svg组件
/*
import SvgIcon from '@/components/SvgIcon/index.vue'
app.component('svg-icon', SvgIcon)
*/

//加载全局样式
import '@/styles/index.scss'
//引入自定义插件对象:注册整个项目全局组件
import gloalComponent from './components/index';

//引入仓库pinia
import pinia from './store'

//引入路由
import router from './router'

app.use(gloalComponent)

//安装仓库
app.use(pinia)
//注册模板路由
app.use(router)

//引入路由鉴权
import './permisstion.ts'

//测试代码  - 测试假的接口
/*
import axios from 'axios'

axios({url:'/api/user/login',method:'post',data:{username:'admin',password:'1112111'}})

*/



app.mount('#app')
