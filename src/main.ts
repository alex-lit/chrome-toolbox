import '@/plugins/css-has-pseudo';
import '@/plugins/element-ui';
import '@/plugins/bowser';
import '@/plugins/vue-component-source';
import '@/assets/styles/index.pcss';

import Vue from 'vue';

import App from '@/components/app';

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app');
