import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VCalendar from 'v-calendar'
import VeeValidate from 'vee-validate';

axios.defaults.baseURL = "https://5cdab7b5eb39f80014a75933.mockapi.io/users";
Vue.use(VCalendar);
Vue.use(VeeValidate);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');