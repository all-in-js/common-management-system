<template>
  <nav-bar></nav-bar>
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
