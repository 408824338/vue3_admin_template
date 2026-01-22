<script setup lang="ts">
import {User,Lock} from '@element-plus/icons-vue'
//引入用户相关的小仓库
import useUserStore from '@/store/modules/user'
//引入路由
import {useRouter,useRoute} from 'vue-router'

//引入获取当前登录的时间段
import {getTimeOfDay} from "@/utils/time.ts";

let useStore = useUserStore()

//获取el-from组件
let loginForms = ref(null)

//获取路由
let $router = useRouter()
let $route = useRoute()

import {reactive,ref} from 'vue'
import {ElMessage, ElNotification} from "element-plus";


// 定义变量控制登录按钮的状态
let isLoading = ref(false)

//收集帐号与密码的数据
let loginForm = reactive({username:'admin',password:'111111'})

const validatorUserName = (rule, value, callback) => {
  //rule: 规则对象
  //value: 表单项的值
  //callback: 回调函数，用于指示校验结果
  if (!/^[a-zA-Z]+$/.test(value)) {
    callback(new Error('用户名只能包含字母!'))
  } else if (value.length < 5 || value.length > 10) {
    callback(new Error('用户名长度应为5-10个字符!'))
  } else {
    callback()
  }
}

//定义表单校验需要配置对象
const rules = {
  username: [
    // {required: true, message: '请输入用户名', trigger: ['change']},
    // {min: 5, max: 10, message: '用户名长度应为5-10个字符', trigger: ['blur', 'change']}
      {
  validator: validatorUserName, trigger: ['blur', 'change']
}

  ],
  password: [
    // {required: true, message: '请输入密码', trigger: ['change']},
  // {min: 6, message: '密码长度至少6位', trigger: ['blur', 'change']}
    {validator: (rule, value, callback) => {
    if (value.length < 6) {
      callback(new Error('密码长度至少6位'))
    } else {
      callback()
    }
  }, trigger: ['blur', 'change']}

],
}

//登录按钮回调
const login = async ()=>{
  //保证全部表单校验通过再发请求
   await loginForms.value.validate()

  isLoading.value = true
  try {
    await useStore.userLogin(loginForm)

    //登录成功，跳转到首页
    // $router.push('/')
    let redirect = $route.query.redirect
    $router.push({path:redirect || '/'})

    //判断登录的时候,路由路径当中是否有query参数，如果有就往query参数挑战，没有跳转到首页

    //el弹出成功提示框
    // ElMessage.success('登录成功')
    ElNotification({
      title: '登录成功',
      message: `HI,${getTimeOfDay()}`,
      type: 'success'
    })
  } catch (e) {
    isLoading.value = false
    //el弹出失败提示框
    ElMessage.error('登录失败')
    //跳到404页面
    // $router.push('/404')
  }
}



</script>

<template>
  <div class="login_container">
    <el-row>
<!--      当屏幕小于768px时，xs=0就是隐藏-->
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <el-form class="login_form" :model="loginForm" :rules="rules" ref="loginForms">
          <h1>HELLO</h1>
          <H2>欢迎登录</H2>
          <el-form-item prop="username">
            <el-input placeholder="请输入用户名" :prefix-icon="User" v-model="loginForm.username"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input placeholder="请输入密码" type="password" :prefix-icon="Lock" v-model="loginForm.password" show-password="true"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button :loading="isLoading" type="primary"  class="login_btn" @click="login">登录</el-button>
          </el-form-item>

        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped lang="scss">

.login_container {
  width: 100%;
  height: 100vh;
  background: url('@/assets/images/background.jpg') no-repeat;
  background-size: cover;

  .login_form {
    position: relative;
    top: 30vh;
    width: 80%;
    background: url("@/assets/images/login_form.png") no-repeat;
    background-size: cover;
    padding: 40px;
  }
  h1 {
    color: #fff;
    font-size: 40px;
  }
  h2 {
    color: #fff;
    font-size: 20px;
    margin:20px 0;
  }
  .login_btn {
    width: 100%;
  }
}

</style>