import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { Button, Menu, Breadcrumb, PageHeader } from 'ant-design-vue'
import App from './app.vue'
import Users from './pages/users.vue'
import 'ant-design-vue/dist/antd.css'
import './vars.css'
import './app.scss'

const app = createApp(App)

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/users',
      component: Users
    }
  ]
})

app
.use(router)
.use(Button)
.use(Menu)
.use(Breadcrumb)
.use(PageHeader)

app.mount('#app')
