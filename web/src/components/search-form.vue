<template>
  <div class="search-form">
    <a-page-header
      :back-icon="backIcon"
      :title="title"
      :sub-title="subtitle"
      @back="() => null"
    />
    <div class="search-ctrls">
      <span>检索条件</span>
      <div class="search-btns">
        <a-button
          @click="resetFields"
          type="link">重置</a-button>
        <a-button
          @click="search"
          type="primary">检索</a-button>
      </div>
    </div>
    <div class="search-fields">
      <slot />
    </div>
  </div>
</template>
<script>
import { defineComponent, reactive } from 'vue'
import { useForm } from '@ant-design-vue/use'

export default defineComponent({
  props: {
    backIcon: Boolean,
    title: String,
    subtitle: String,
    searchForm: Object
  },
  setup: (props, cx) => {
    const {
      resetFields
    } = useForm(props.searchForm, reactive({}));
    return {
      resetFields() {
        resetFields();
        cx.emit('search');
      },
      search() {
        cx.emit('search');
      }
    }
  }
})
</script>
<style lang="scss" scoped>
.search-form {
  display: flex;
  flex-direction: column;
  flex: 1;
  :deep .ant-page-header-heading-title {
    font-size: 16px;
  }
  :deep .ant-page-header-ghost {
    padding: 14px 20px;
    background: #efefef;
  }
  :deep .ant-page-header-back {
    font-size: 15px;
  }
  .search-ctrls {
    margin: 0 20px;
    padding: 12px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #eee;
    >span {
      font-weight: bold;
    }
  }
  .search-fields {
    overflow: auto;
  }
  :deep .ant-form {
    margin: 20px 20px 10px;
  }
  :deep .ant-form-item {
    margin-bottom: 14px;
  }
}
</style>
