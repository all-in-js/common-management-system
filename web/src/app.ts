import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { Button, Menu, Breadcrumb, PageHeader, Form, Input, Radio, Table, Modal } from 'ant-design-vue'
import App from './app.vue'
import Users from './pages/users.vue'
import System from './pages/system.vue'
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
    },
    {
      path: '/system',
      component: System
    }
  ]
})

app
.use(router)
.use(Button)
.use(Menu)
.use(Form)
.use(Input)
.use(Radio)
.use(Table)
.use(Modal)
.use(Breadcrumb)
.use(PageHeader)

app.mount('#app')
