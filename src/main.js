import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
// import { firstText, seconText } from './data';
// import alertText from './function';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');

// alertText(firstText);
// alertText(seconText);
