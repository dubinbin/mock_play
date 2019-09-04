<template>
  <div class="login">
      <h3 class="loginText">登陆</h3>
      <div class="login_content">
        <div class="layui-form-item">
          <label class="layui-form-label">用户名</label>
          <div class="layui-input-block">
            <input type="text"  name="title" required  lay-verify="required" placeholder="请输入用户名" autocomplete="off" class="layui-input" v-model="nickname">
          </div>
        </div>
        <div class="layui-form-item">
          <label class="layui-form-label">密码框</label>
          <div class="layui-input-inline" style="width: 74%; margin-right:0">
            <input type="password" name="password" required lay-verify="required" placeholder="请输入密码" autocomplete="off" class="layui-input" v-model="pwd">
          </div>
        </div>
        <div class="layui-form-item">
          <div class="layui-input-block">
            <button class="layui-btn" lay-submit lay-filter="formDemo" @click="login">登陆</button>
            <button type="reset" class="layui-btn layui-btn-primary">重置</button>
            <div class="toRegister" @click="toRegister">没有账号？点击去注册</div>
          </div>
        </div>
      </div>
  </div>
</template>


<style scoped>
.login {
  padding: 50px;
}
.loginText {
    font-size: 32px;
    font-weight: 300;
    margin-bottom: 15px;
}
.toRegister {
  position: relative;
  margin-top: 25px;
  color: #03b9ff;
}
</style>

<script>
import axios from 'axios'
import { showDialog } from '@/utils/tools.js'
export default {
  data() {
    return {
      nickname: '',
      pwd: ''
    }
  },
  created() {
  },
  methods: {
    toRegister() {
      this.$router.push('/register')
    },
    login() {
      const data = new FormData()
      data.append('nickname', this.nickname)
      data.append('pwd', this.pwd)
      axios.post('/auth/login', data).then((res) => {
        if (res.data.code === 0) {
            const {nickname, _id, token} = res.data.data
             window.localStorage.setItem('Mock/id', _id)
             window.localStorage.setItem('Mock/token', token)
             showDialog('提示', '你已成功登陆')
             setTimeout(() => {
               this.$router.push('/')
             }, 0)
          } else {
             showDialog('提示', res.data.msg)
          }
      })
    }
  }
}
</script>
