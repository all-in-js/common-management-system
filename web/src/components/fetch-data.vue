<template>
  <slot></slot>
  <slot
    name="data"
    :res="res"></slot>
  <a-spin v-if="loading">
    <slot name="loading">loading</slot>
  </a-spin>
  <slot
    v-if="error"
    name="error">some err...</slot>
</template>
<script lang="ts">
import { Spin } from 'ant-design-vue';
import Fetch from '@all-in-js/fetch-functions-api';
import { defineComponent, reactive, toRefs, onMounted } from 'vue';

const $fetch = new Fetch('/api/functions');

const FetchData = defineComponent({
  props: {
    method: String,
    url: String,
    params: Object,
    cached: Boolean,
    noCached: Boolean
  },
  components: {
    [Spin.name]: Spin
  },
  setup({
    method = 'post',
    url,
    params
  }) {
    const state = reactive({
      loading: false,
      error: null,
      res: {}
    });
    const getData = async function() {
      state.loading = true;
      const res = await $fetch[method](url, params);
      const {
        code,
        data,
        msg
      } = res;
      
      state.res = res;

      if (code === 1000) {
        //
      } else {
        state.error = msg;
      }
      state.loading = false;
    }

    onMounted(() => {
      getData();
    });

    return {
      getData,
      ...toRefs(state)
    }
  }
});

export default FetchData;
</script>