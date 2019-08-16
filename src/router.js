import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login.vue'
import Home from './views/Home.vue'
import Logout from './views/Logout.vue'
import AddUser from './views/AddUser.vue'
import Config from './views/Config.vue'
import UserList from './views/UserList.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login,
      meta: {
        requiresVisitor: true
      }
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/logout',
      name: 'logout',
      component: Logout,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/user/add',
      name: 'addUser',
      component: AddUser,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/config',
      name: 'config',
      component: Config,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/users',
      name: 'user',
      component: UserList,
      meta: {
        requiresAuth: true
      }
    },
  ]
})
