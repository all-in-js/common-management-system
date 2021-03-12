<template>
  <nav class="nav-bar">
    <div class="nav-left">
      <img src="../assets/logo.png" alt="" class="nav-logo">
      <span class="nav-logo-txt">CMS</span>
    </div>
    <div class="nav-right-items">
      <div class="nav-item">用户管理</div>
      <div class="nav-item">系统设置</div>
      <div class="nav-item">Github</div>
      <div class="nav-item">En/Zh</div>
    </div>
  </nav>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'

export default defineComponent({
  props: {
  },
  setup: () => {
    const count = ref(0)
    return { count }
  }
})
</script>
<style lang="scss" scoped>
.nav-bar {
  padding: 0 15px;
  height: var(--nav-bar-height);
  line-height: var(--nav-bar-height);
  display: flex;
  background: var(--main-color);
}
.nav-logo-txt {
  line-height: var(--nav-bar-height);
  display: inline-block;
  vertical-align: top;
  font-size: 18px;
  margin-left: 10px;
  color: #fff;
}
.nav-right-items {
  display: flex;
  flex: 1;
  justify-content: flex-end;
}
.nav-item {
  margin-left: 20px;
  color: #fff;
}
.nav-logo {
  height: 40px;
}
</style>
