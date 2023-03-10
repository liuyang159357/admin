import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === 'development') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

// set ElementUI lang to EN
Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)

// 挂载moment
import moment from "moment"
Vue.prototype.$moment = moment;
moment.locale('zh-cn')
//过滤器
Vue.filter('dateFormat', (str, partten = "YYYY-MM-DD HH:mm:ss") => {
  return moment(str).format(partten);
})

// 挂载resize方法
Vue.prototype.$echartsResize = (mycharts)=>{
  window.addEventListener("resize",function(){
    mycharts.resize()
  })
}


Vue.config.productionTip = false

// 把API接口挂载全局
import API from '@/api/index';
Vue.prototype.$API = API
//注册三级联动组件
import CategorySelect from '@/components/CategorySelect'
Vue.component(CategorySelect.name, CategorySelect)
//注册
import HintButton from '@/components/HintButton'
Vue.component('HintButton',HintButton)
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
