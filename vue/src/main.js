import Vue from 'vue'
import Mint from 'mint-ui'
import VueRouter from 'vue-router'
import NavBar from './components/navbar.vue'
import Login from './components/Login.vue'
import Home from './components/Home.vue'
import Register from './components/Register.vue'
import Resource from 'vue-resource'
import Publish from './components/Publish.vue'
import TopicItem from './components/TopicItem.vue'
import TopicDetail from './components/TopicDetail.vue'
import category from './instrument/category.js'
import 'mint-ui/lib/style.css'

Vue.use(Mint)
Vue.use(VueRouter)
Vue.use(Resource)

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    { path: '/',
      component: NavBar,
      children: [
        {
          path: 'register',
          component: Register
        },
        {
          path: 'login',
          component: Login
        },
        {
          path: '',
          component: Home,
          children: [
            {
              path: 'topic',
              component: TopicItem
            },
            {
              path: 'publish',
              component: Publish
            },
            {
              path: 'topicDetail',
              component: TopicDetail
            }
          ]
        }
      ]
    }
  ]
})
/* eslint-disable no-new */
new Vue({
  router: router
}).$mount('#app')
