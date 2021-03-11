<template>
  <div>
    <nav-bar />
    <div class="main-content">
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import NavBar from './components/nav-bar.vue'

export default defineComponent({
  name: 'App',
  components: {
    NavBar
  }
})
</script>
<style lang="scss" scoped>
.main-content {
  display: flex;
}
</style>