import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import Vant from 'vant';
import 'vant/lib/index.css';
import 'vant/lib/icon/local.css';//本地
Vue.use(Vant);

import { Notify } from 'vant';
Vue.prototype.Notify = Notify

// 引入水印
import watermark from "@/utils/watermark";
Vue.prototype.$watermark = watermark

// 挂载按需加载的echarts
import echarts from '@/utils/echarts'
// 挂载到vue实例中
Vue.prototype.$echarts = echarts

import mixin from '@/libs/mixin';
Vue.mixin(mixin)

import axios from '@/libs/axios'
Vue.prototype.$api = axios

Vue.config.productionTip = false


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
