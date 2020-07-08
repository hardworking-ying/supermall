import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import FastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'

import toast from 'components/common/toast'


Vue.config.productionTip = false;

//添加事件总线对象
Vue.prototype.$bus = new Vue();

//安装toast插件
Vue.use(toast);

//解决移动端300ms延迟
FastClick.attach(document.body)

//使用vue-lazyload实现图片懒加载，当图片需要显示在屏幕上再加载
Vue.use(VueLazyLoad, {
  loading: require('assets/img/common/placeholder.png'),
})

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
