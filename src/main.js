// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import VueLazyLoad from 'vue-lazyload'
import infiniteScroll from 'vue-infinite-scroll'
import {currency} from './util/currency'
import Element from 'element-ui'
import MintUI from 'mint-ui';
import 'mint-ui/lib/style.css';
import 'element-ui/lib/theme-chalk/index.css';
import "babel-polyfill"

Vue.config.productionTip = false;
Vue.use(VueLazyLoad, {
  loading: '/static/loading-svg/loading-bars.svg'
});

Vue.use(MintUI);
Vue.use(Element)
Vue.filter('currency', currency);
Vue.use(infiniteScroll);
Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    nickName: '',
    cartCount: 0
  },
  mutations: {
    updateUserInfo (state, nickName) {
      state.nickName = nickName
    },
    updateCartCount (state, cartCount) {
      state.cartCount += cartCount
    },
    initCartCount (state, cartCount) {
      state.cartCount = cartCount
    }
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: {App},
  template: '<App/>'
})
