import Vue from "vue"
import VueRouter from "vue-router"
// 파이어베이스 앱 객체 모듈 가져오기
import firebase from "firebase/compat/app"

import Main from "@/components/Main.vue"
import FindStore from "@/components/FindStore.vue"
import KakaoMap from "@/components/KakaoMap.vue"
import Menu from "@/components/Menu.vue"
import MyPage from "@/components/MyPage.vue"
import Login from "@/components/Login.vue"
import Join from "@/components/Join.vue"
import JoinEnd from "@/components/JoinEnd.vue"
import NotFound from "@/components/NotFound.vue";


Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "Main",
    component: Main
  },
  {
    path: "/FindStore",
    name: "FindStore",
    component: FindStore
  },
  {
    path: "/KakaoMap",
    name: "KakaoMap",
    component: KakaoMap
  },
  {
    path: "/Menu",
    name: "Menu",
    component: Menu
  },
  {
    path: "/MyPage",
    name: "MyPage",
    component: MyPage,
    beforeEach: (to, from, next) => {
      const bNeedAuth = to.matched.some(record => record.meta.bAuth)
      const bCheckAuth = firebase.auth().currentUser
      if (bNeedAuth && !bCheckAuth) {
        next("/Login")
      } else {
        next()
      }
    }
  },
  {
    path: "/Login",
    name: "Login",
    component: Login
  },
  {
    path: "/Join",
    name: "Join",
    component: Join
  },
  {
    path: "/JoinEnd",
    name: "JoinEnd",
    component: JoinEnd
  },
  {
    path: "/*",
    name: "Notfound",
    component: NotFound
  }

]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
})

export default router
