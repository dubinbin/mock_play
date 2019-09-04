// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './utils/Intercept'

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {//beforeEach是router的钩子函数，在进入路由前执行
  if (to.name) {//判断是否有标题
    document.title = to.name
  }
  next()//执行进入路由，如果不写就不会进入目标页
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
