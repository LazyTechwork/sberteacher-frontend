import Vue from 'vue'
import App from './App.vue'
import router from "@/router";
import VueRouter from "vue-router";
Vue.use(VueRouter)
Vue.prototype.getUser = function (){
  return JSON.parse(localStorage.getItem("userModel"))
}
Vue.prototype.globalEmitter = new Vue();
Vue.config.productionTip = false
Vue.prototype.apiServer = "192.168.43.154"

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
