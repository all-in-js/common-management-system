<template>
  <login v-if="isLogin" />
  <template v-else>
    <nav-bar />
    <div class="main-content">
      <router-view />
    </div>
  </template>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useRoute } from 'vue-router'
import NavBar from './components/nav-bar.vue'
import Login from './pages/login.vue'

export default defineComponent({
  name: 'App',
  components: {
    Login,
    NavBar
  },
  setup() {
    const route = useRoute();
    const isLogin = computed(() => {
      return route.name === 'login'
    })
    return {
      isLogin
    }
  }
})
</script>
