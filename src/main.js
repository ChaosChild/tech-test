import BootstrapVue from 'bootstrap-vue';
import Vue from 'vue';
import VueRouter from 'vue-router';

import App from './App.vue';
import store from './store/index';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

import About from './pages/About.vue';
import Home from './pages/Home.vue';
import Task from './pages/Task.vue';

Vue.config.productionTip = false;

Vue.use(BootstrapVue);
Vue.use(VueRouter);

const routes = [
  { path: '/', redirect: '/home' },

  { path: '/about', component: About },
  { path: '/home', component: Home },
  { path: '/task', component: Task },
];

const router = new VueRouter({
  routes,
});

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
