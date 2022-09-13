import Vue from 'vue';
import App from './App.vue';
import { firstText, seconText } from './data';
import alertText from './function';

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount('#app');

alertText(firstText);
alertText(seconText);
