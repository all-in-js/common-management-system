<template>
  <div class="login-container">
    <div class="login-fields">
      <img src="../assets/logo.svg" />
      <div class="name">Pineapple</div>
      <div class="slogn">一个基于 svg 的图标管理和组件化方案</div>
      <a-form
        class="login-form">
        <a-form-item
          name="username">
          <a-input
            autoComplete="off"
            placeholder="用户名"
            size="large" />
        </a-form-item>
        <a-form-item
          name="password">
          <a-input
            type="password"
            placeholder="密码"
            size="large" />
        </a-form-item>
        <a-form-item name="remember">
          <a-checkbox>记住用户名</a-checkbox>
        </a-form-item>
        <a-form-item>
          <a-button
            type="primary"
            block
            size="large"
            @click="login">
            登 录
          </a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ComponentInternalInstance, getCurrentInstance } from 'vue'

export default defineComponent({
  setup() {
    const instance: ComponentInternalInstance = getCurrentInstance();
    const cxProps = instance.appContext.config.globalProperties;
    return {
      login() {
        cxProps.$login.post('api/login', {
          username: 'test',
          password: '123456'
        });
      }
    }
  }
});
</script>
<style lang="scss" scoped>
.login-container {
  height: 100%;
  background: #fafafa;
  display: flex;
  align-items: center;
  justify-content: center;
  .login-fields {
    width: 400px;
    border: 1px solid #e9e9e9;
    border-radius: 4px;
    background: #ffffff;
    text-align: center;
    padding: 40px 45px 20px;
  }
  .login-form {
    text-align: left;
    margin-top: 30px;
    .ant-row {
      display: block;
    }
  }
  img {
    width: 52px;
  }
  .name {
    font-size: 30px;
    font-weight: 500;
    margin: 15px auto 10px;
    color: #262626;
  }
  .slogn {
    color: #595959;
    font-size: 15px;
  }
}
</style>