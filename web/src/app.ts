import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { Button,  Checkbox, Menu, Breadcrumb, Popconfirm, PageHeader, Form, Input, Radio, Table, Modal, message } from 'ant-design-vue'
import Fetch from '@all-in-js/fetch-functions-api'
import App from './app.vue'
import Login from './pages/login.vue'
import Users from './pages/users.vue'
import System from './pages/system.vue'
import fetchDataContainer from 'vue3-data-container'
import 'ant-design-vue/dist/antd.css'
import './vars.css'
import './app.scss'

const $fetch = new Fetch('/api/functions', {
  debugApi: true
});
const $login = new Fetch('/api/login');
const app = createApp(App)

app.config.globalProperties.$fetch = $fetch;
app.config.globalProperties.$login = $login;
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
.use(Popconfirm)

app.component('fetch-data', fetchDataContainer.create({
  async serviceHandler(method: string, url: string, params?: object) {
    let error, data;
    try {
      const res = await $fetch[method](url, params);
      const {
        code,
        msg,
        ...rest
      } = res;
      if (code === 1000) {
        data = {
          msg,
          ...rest
        };
      } else {
        error = msg;
      }
    } catch(e) {
      error = e;
    }
    return {
      error,
      data
    };
  }
}));

app.mount('#app')
