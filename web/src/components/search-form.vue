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
        <a-button type="link">重置</a-button>
        <a-button type="primary">检索</a-button>
      </div>
    </div>
    <div class="search-fields">
      <slot />
    </div>
  </div>
</template>
<script>
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    title: String
  },
  setup: () => {

  }
})
</script>
