import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { Button,  Checkbox, Menu, Breadcrumb, PageHeader, Form, Input, Radio, Table, Modal, message } from 'ant-design-vue'
import Fetch from '@all-in-js/fetch-functions-api'
import App from './app.vue'
import Login from './pages/login.vue'
import Users from './pages/users.vue'
import System from './pages/system.vue'
import 'ant-design-vue/dist/antd.css'
import './vars.css'
import './app.scss'

const $fetch = new Fetch('/api/functions');
const app = createApp(App)

app.config.globalProperties.$fetch = $fetch;
app.config.globalProperties.$message = message;

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      name: 'users',
      path: '/users',
      component: Users
    },
    {
      name: 'system',
      path: '/system',
      component: System
    },
    {
      name: 'login',
      path: '/login',
      component: Login
    }
  ]
})

app
.use(router)
.use(Button)
.use(Checkbox)
.use(Menu)
.use(Form)
.use(Input)
.use(Radio)
.use(Table)
.use(Modal)
.use(Breadcrumb)
.use(PageHeader)

app.mount('#app')
