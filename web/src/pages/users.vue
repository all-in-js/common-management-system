<template>
  <content-frame class="users-content">
    <template v-slot:left>
      <search-form
        @reset="reset"
        :back-icon="false"
        title="用户管理">
        <a-form
          layout="vertical">
          <a-form-item label="用户名">
            <a-input placeholder="请输入用户名"></a-input>
          </a-form-item>
          <a-form-item label="状态">
            <a-radio-group v-model:value="status">
              <a-radio value="0">全部</a-radio>
              <a-radio value="1">启用</a-radio>
              <a-radio value="2">禁用</a-radio>
            </a-radio-group>
          </a-form-item>
        </a-form>
      </search-form>
    </template>
    <template v-slot:right>
      right
    </template>
  </content-frame>
</template>
<script>
import { defineComponent, reactive, toRefs } from 'vue'
import ContentFrame from '../components/content-frame.vue'
import SearchForm from '../components/search-form.vue'

export default defineComponent({
  components: {
    ContentFrame,
    SearchForm
  },
  setup() {
    const state = reactive({
      status: '0'
    });
    return {
      reset() {
        console.log('reset');
      },
      search() {
        console.log('search');
      },
      ...toRefs(state)
    }
  }
})
</script>
<style lang="scss" scoped>

</style>
