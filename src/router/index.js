import Vue from 'vue'
import Router from 'vue-router'
import login from '../components/login'
import loginManager from '../components/loginManager'
import welcome from '../components/welcome'
import register from '../components/register'
import manager1 from '../components/manager1'
import userDetail from '../components/userDetail'
import orderDetail from '../components/orderDetail'
import manager from '../components/manager'
import ManagerOrder from '../components/ManagerOrder'
import ManagerOrder1 from '../components/ManagerOrder1'
import book from '../components/book'
import book1 from '../components/book1'
import home from '../components/useIndex'
import bookdetail from "../components/bookdetail"
import bookdetail2 from "../components/bookdetail2"
import bookdetail3 from "../components/bookdetail3"
import apply from "../components/apply"
import cancel from "../components/cancel"
import borrow from "../components/borrow"
import return1 from "../components/return"
import add from "../components/addmanager"
import addbook from '../components/addbook'
import addbook1 from '../components/addbook1'
Vue.use(Router)

export default new Router({
  // mode: 'hash',
  routes :[
    {
      path:'/',
      redirect:'/welcome'
    },
    {
      path:'/register',
      component :register
    },
    {
      path :'/welcome',
      component : welcome
    },
    {
      path:'/loginManager',
      component : loginManager
    },
    {
      path:'/login',
      component : login
    },
    {
      path :'/user',
      component : userDetail
    },
    {
      path :'/order',
      component : orderDetail,
      name:orderDetail,
      children:[
        {
          path : "/order/apply",
          component : apply
        },
        {
          path : "/order/cancel",
          component : cancel
        },
        {
          path : "/order/borrow",
          component : borrow
        },
        {
          path : "/order/return",
          component : return1
        },
      ]
    },
    {
      path : '/manager',
      component : manager,
      children:[
       {
        path:'/manager/add',
        component :add,
       }
      ]
    },
    {
      path : '/ManagerOrder',
      component :ManagerOrder
    },
    {
      path : '/ManagerOrder1',
      component :ManagerOrder1
    },
    {
      path : '/book',
      component :book
    },
    {
      path : '/book1',
      component :book1
    },
    {
      path :'/manager1',
      component : manager1
    },
    {
      path :'/home',
      component :home
    },
    {
      path :'/bookdetail',
      component : bookdetail
    },
    {
      path :'/book/addbook',
      component:addbook
    },
    {
      path :'/book1/addbook1',
      component:addbook1
    },
    {
      path :'/bookdetail2',
      component : bookdetail2
    },
    {
      path :'/bookdetail3',
      component : bookdetail3
    },
  ]
})
