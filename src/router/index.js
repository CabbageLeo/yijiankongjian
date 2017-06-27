import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import order_center from '@/components/order_center.vue'
import create_new_order from '@/components/create_new_order.vue'
import account_edit from "@/components/account_edit.vue"
import mat_manage from "@/components/mat_manage.vue"
import order_detail from "@/components/order_detail.vue"
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'order_center',
      component: order_center
    },
    {
      path:'/order_center',
      name:'order_center',
      component:order_center
    },
    {
      path:'/order_center/create_new_order',
      name:"create_new_order",
      component:order_center,
      children:[
        {
          path:'/order_center/create_new_order',
          component:create_new_order
        },
        {
          path:"/order_center/order_detail",
          component:order_detail
        }
      ]
    },
    {
      path:"/account_edit",
      component:account_edit
    },
    {
      path:"/mat_manage",
      component:mat_manage
    }
  ]
})
