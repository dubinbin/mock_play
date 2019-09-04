<template>
  <div class="register">
      <h3 class="registerText">注册</h3>
      <div class="layui-form-item">
        <label class="layui-form-label">用户名</label>
        <div class="layui-input-block">
          <input type="text"  name="title" required  lay-verify="required" placeholder="请输入用户名" autocomplete="off" class="layui-input" v-model="nickname">
        </div>
      </div>
      <div class="layui-form-item">
        <label class="layui-form-label">密码框</label>
        <div class="layui-input-inline" style="width: 74%; margin-right:0">
          <input type="password"  name="password" required lay-verify="required" placeholder="请输入密码" autocomplete="off" class="layui-input" v-model="pwd">
        </div>
        <div class="layui-form-mid layui-word-aux">{{tipsText}}</div>
      </div>
      <div class="layui-form-item">
        <div class="layui-input-block">
          <button class="layui-btn" lay-submit lay-filter="formDemo" @click="register">注册</button>
          <button type="reset" class="layui-btn layui-btn-primary" @click="reset">重置</button>
           <div class="tologin" @click="tologin">已有账号？点击去登陆</div>
        </div>
      </div>
  </div>
</template>


<style scoped>
.register {
  padding: 50px;
}
.registerText {
    font-size: 32px;
    font-weight: 300;
    margin-bottom: 15px;
}
.tologin {
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
      tipsText: '',
      nickname: '',
      pwd: ''
    }
  },
  created() {
  },
  methods: {
    tologin() {
      this.$router.push('/login')
    },
    reset() {
      this.nickname = ''
      this.pwd = ''
    },
    register() {
        const data = new FormData()
        data.append('nickname', this.nickname)
        data.append('pwd', this.pwd)
        axios.post('/auth/register', data).then((res) => {
           if (res.data.code === 0) {
             const {nickname, _id, token} = res.data.data
             window.localStorage.setItem('Mock/id', _id)
             window.localStorage.setItem('Mock/token', token)
             showDialog('提示', '注册成功，正在进入主页')
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
