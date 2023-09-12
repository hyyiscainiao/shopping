import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/layout/home'
import Layout from '@/views/layout'
import User from '@/views/layout/user'
import Cart from '@/views/layout/cart'
import Category from '@/views/layout/category'
import store from '@/store'

const Pay = () => import('@/views/pay')
const Prodetail = () => import('@/views/prodetail')
const Myorder = () => import('@/views/myorder')
const Search = () => import('@/views/search')
const SearchList = () => import('@/views/search/list')
const Login = () => import('@/views/login')
const Address = () => import('@/views/pay/address')

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/login', component: Login },
    {
      path: '/',
      component: Layout,
      redirect: '/home',
      children: [
        { path: '/home', component: Home },
        { path: '/cart', component: Cart },
        { path: '/user', component: User },
        { path: '/Category', component: Category }
      ]
    },
    { path: '/myorder', component: Myorder },
    { path: '/pay', component: Pay },
    { path: '/search', component: Search },
    { path: '/searchlist', component: SearchList },
    { path: '/address', component: Address },
    { path: '/prodetail/:id', component: Prodetail },
    { path: '*', component: Layout }
  ]
})
// 1. to 往哪里去， 到哪去的路由信息对象
// 2. from 从哪里来， 从哪来的路由信息对象
// 3. next() 是否放行
// 如果next()调用，就是放行
// next(路径) 拦截到某个路径页面
const authUrl = ['/myorder', '/pay']

router.beforeEach((to, from, next) => {
  if (!authUrl.includes(to.path)) {
    next()
    return
  }
  const token = store.getters.getToken
  // console.log(token)
  if (token) {
    next()
  } else {
    next('/login')
  }
})
export default router
