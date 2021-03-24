<template>
  <nav class="nav-bar">
    <div class="nav-left">
      <img src="../assets/logo.png" alt="" class="nav-logo">
      <span class="nav-logo-txt">CMS</span>
    </div>
    <div class="nav-right-items">
      <fetch-data
        url="api/modules">
        <template v-slot:data="{ res }">
          <template
            v-for="item of res.data">
            <router-link
              v-if="item.using === 1"
              :to="item.path" class="nav-item">
              {{ item.name }}
            </router-link>    
          </template>
        </template>
      </fetch-data>
      <router-link to="/users" class="nav-item">用户管理</router-link>
      <router-link to="/system" class="nav-item">系统管理</router-link>
      <a target="_blank" href="https://github.com/all-in-js/common-management-system" class="nav-item">Github</a>
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
  margin-left: 25px;
  color: var(--nav-color);
  &.router-link-active {
    font-weight: bold;
    color: var(--nav-active-color);
  }
  &:hover {
    color: var(--nav-active-color);
  }
}
.nav-logo {
  height: 40px;
}
</style>
