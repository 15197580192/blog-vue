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
      path: '/my/blogs/:userId',
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
      path: '/blog/details/:blogId',
      name: 'BlogDetails',
      component: () =>import('@/views/BlogDetails')
    },
    {
      path: '/blog/details/:blogId/edit',
      name: 'BlogEdit',
      component: () => import('@/views/BlogEdit')
    },
    {
      path: '/password',
      name: 'ChangePWD',
      component: () =>import('@/views/ChangePWD')
    },
    {
      path: '/user/info',
      name: 'UserProfile',
      component: () =>import('@/views/UserProfile')
    },
    {
      path: '/account/setting',
      name: 'AccountSetting',
      component: () =>import('@/views/AccountSetting')
    },
    {
      path: '/my/comments/:userId',
      name: 'MyCommentPage',
      component: () =>import('@/views/MyCommentPage')
    },
    {
      path: '/page/self',
      name: '/SelfMainPage',
      component: () => import('@/views/SelfMainPage')
    },
    {
      path: '/page/other',
      name: '/OtherSelfPage',
      component: () => import('@/views/OtherSelfPage')
    },
    {
      path: '/search/:searchvalue',
      name: '/Searchblogpage',
      component: () => import('@/views/Searchblogpage')
    }
  ]
})
