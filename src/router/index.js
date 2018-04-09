import Vue from 'vue'
import Router from 'vue-router'
import GoodsList from '@/views/GoodsList'
import Cart from '@/views/Cart'
import Address from '@/views/Address'
import Admin from '@/views/Admin'
import OrderConfirm from '@/views/OrderConfirm'
import OrderSuccess from '@/views/OrderSuccess'
import Home from '@/components/Home'

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name:'GoodsList',
      component: GoodsList
    },{
      path: '/cart',
      name:'Cart',
      component: Cart
    },{
      path: '/address',
      name:'Address',
      component: Address
    },{
      path: '/orderConfirm',
      name:'OrderConfirm',
      component: OrderConfirm
    },{
      path: '/orderSuccess',
      name:'OrderSuccess',
      component: OrderSuccess
    },{
      path: '/home',
      name:'Home',
      component:resolve => require(['@/components/Home.vue'], resolve),
      children: [{
          path: '/',
          component: resolve => require(['@/views/Readme.vue'], resolve)
        }]
    },{
      path: '/admin',
      name:'Admin',
      component: resolve => require(['@/views/Admin.vue'], resolve)
    }
  ]
})
