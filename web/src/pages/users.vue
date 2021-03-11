<template>
  <div class="users-manage">
    <search-form
      title="用户管理"></search-form>
  </div>
</template>
<script>
import { defineComponent } from 'vue'
import SearchForm from '../components/search-form.vue'

export default defineComponent({
  components: {
    SearchForm
  }
})
</script>