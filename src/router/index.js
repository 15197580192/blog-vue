import Vue from 'vue'
import Router from 'vue-router'
import FirstPage from '../views/FirstPage'
import BlogEdit from "../views/BlogEdit";
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'FirstPage',
      component: FirstPage
    },
    {
      path: '/admin',
      name: 'FirstPageAdmin',
      component: () => import('@/views/FirstPageAdmin')
    },
    {
      path: '/login',
      name: 'LoginPage',
      component: () => import('@/views/LoginPage')
    },
    {
      path: '/register',
      name: 'RegisterPage',
      component: () => import('@/views/RegisterPage')
    },
    {
      path: '/forget',
      name: 'ForgetPWD',
      component: () => import('@/views/ForgetPWD')
    },
    {
      path: '/myblogs/:userId',
      name: 'MyBlogsPage',
      component: () => import('@/views/MyBlogsPage')
    },
    {
      path: '/self',
      name: 'SelfPage',
      component: () => import('@/views/SelfPage')
    },
    {
      path:'/blog/add',
      name:'BlogAdd',
      component:() => import('@/views/BlogEdit')
    },
    {
      path: '/blogdetails/:blogId',
      name: 'BlogDetails',
      component: () =>import('@/views/BlogDetails')
    },
    {
      path: '/blogdetails/:blogId/blogedit',
      name: 'BlogEdit',
      component: () => import('@/views/BlogEdit')
    },
    {
      path: '/changepwd',
      name: 'ChangePWD',
      component: () =>import('@/views/ChangePWD')
    },
    {
      path: '/userinfo',
      name: 'UserProfile',
      component: () =>import('@/views/UserProfile')
    },
    {
      path: '/accountsetting',
      name: 'AccountSetting',
      component: () =>import('@/views/AccountSetting')
    }
  ]
})
