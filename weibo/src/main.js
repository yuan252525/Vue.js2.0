// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'font-awesome/css/font-awesome.min.css'
import 'element-ui/lib/theme-default/index.css'
import 'animate.css/animate.css'
Vue.use(ElementUI)

Vue.config.debug = true
window.log = console.log
Vue.config.productionTip = false

// Vue.prototype.post = function (url,params,fn) {
//   var xhr = new XMLHttpRequest()
//   xhr.open("POST", url, true)
//   xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
//   xhr.onreadystatechange = function () {
//     var XMLHttpReq = xhr;
//     if (XMLHttpReq.readyState == 4) {
//       if (XMLHttpReq.status == 200) {
//         var text = XMLHttpReq.responseText
//         var res = JSON.parse(text)
//         fn(res)
//       }
//     }
//   }
//   xhr.send(params)
// }
Vue.prototype.eventBus = new Vue;
new Vue({
  router,
  store,
  components: { App },
  template: '<App/>',
}).$mount('#app');
