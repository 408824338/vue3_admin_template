//自定义插件入口

// @ts-ignore
import SvgIcon from './svgIcon/index.vue';

//引入element-plus提供全部图标组件
import * as ElementPlusIcons from '@element-plus/icons-vue'

//全局对象
const allGlobalComponent = {
    SvgIcon
}


//对外暴露插件对象
export default {
    install(app:any) {
        Object.keys(allGlobalComponent).forEach(key => {
           // @ts-ignore
            app.component(key, allGlobalComponent[key])
        })

        //将element-plus提供图标注册为全局组件
        for (const [key,component] of Object.entries(ElementPlusIcons)){
            app.component(key,component)
        }
    }
}