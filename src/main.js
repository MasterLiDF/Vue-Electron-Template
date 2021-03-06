import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 引入Vant
import './components/vant'
// vant桌面端适配
import '@vant/touch-emulator'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

// function responsive(){
//   console.log(window.innerWidth)
//   document.getElementsByTagName('html')[0].style.fontSize = 100 * window.innerWidth / 750 + 'px';
//   console.log("resize");
// };
// responsive();
// window.onresize = responsive;
