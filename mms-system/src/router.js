import Vue from 'vue'
import Router from 'vue-router'
import UserData from './views/UserData.vue'
import Login from './views/Login.vue'
import PersonalInfo from './views/PersonalInfo'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: "/userData",
      name: "userData",
      component: UserData,
      beforeEnter: (to, from, next) => {
        let auth = localStorage.getItem("loginNow");
        console.log(auth);
        if(auth){
          next()
        } else {
          next("*")
          alert("請先登錄帳號密碼");
        }
      }
      
    },
    {
      path: "/personalInfo",
      name: "personal-info",
      component: PersonalInfo,
      beforeEnter: (to, from, next) => {
        let auth = localStorage.getItem("loginNow");
        console.log(auth);
        if(auth){
          next()
        } else {
          next("*")
          alert("請先登錄帳號密碼");
        }
      }
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: "*",
      redirect: {name: 'login'}
    }
  ]
})
