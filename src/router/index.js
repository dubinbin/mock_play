import Vue from 'vue'
import Router from 'vue-router'
import portPaenl from '@/pages/portPanel/index.vue'
import createPanel from '@/pages/createPage/index.vue'
import login from '@/pages/login/login.vue'
import register from '@/pages/register/register.vue'
import editPanel from '@/pages/editPage/index.vue'

Vue.use(Router)


export default new Router({
  routes: [
    {
      path: '/',
      name: '接口面板',
      component: portPaenl
    },
    {
      path: '/createport',
      name: '创建接口',
      component: createPanel
    },
    {
      path: '/editpanel/:id',
      name: '编辑接口',
      component: editPanel
    },
    {
      path: '/login',
      name: '登陆',
      component: login
    },
    {
      path: '/register',
      name: '注册',
      component: register
    },
  ]
})
