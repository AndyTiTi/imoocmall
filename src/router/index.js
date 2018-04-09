import Vue from 'vue'
import Router from 'vue-router'
import GoodsList from '@/views/GoodsList'
import Cart from '@/views/Cart'
import Address from '@/views/Address'
import OrderConfirm from '@/views/OrderConfirm'
import OrderSuccess from '@/views/OrderSuccess'
import AddAddress from '@/views/AddAddressModal'

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: GoodsList
    },{
      path: '/cart',
      component: Cart
    },{
      path: '/address',
      component: Address
    },{
      path: '/orderConfirm',
      component: OrderConfirm
    },{
      path: '/orderSuccess',
      component: OrderSuccess
    },{
      path: '/addAddress',
      component: AddAddress
    },{
      path: '/home',
      component:resolve => require(['@/components/Home.vue'], resolve),
      children: [{
          path: '/',
          component: resolve => require(['@/views/Readme.vue'], resolve)
        }]
    },{
      path: '/admin',
      component: resolve => require(['@/views/Admin.vue'], resolve)
    }
  ]
})
