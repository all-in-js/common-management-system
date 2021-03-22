<template>
  <slot
    v-if="useLoading && loading"
    name="loading">loading...</slot>
  <slot
    v-if="error"
    name="error">some err...</slot>
  <template v-else>
    <slot></slot>
    <slot
      name="data"
      :error="error"
      :loading="loading"
      :res="res"></slot>
  </template>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted } from 'vue';

const DataContainer = defineComponent({
  name: 'data-container',
  props: {
    /**
     * 是否使用内置的loading
     */
    useLoading: {
      type: Boolean,
      default: true
    },
    method: String,
    url: String,
    params: Object,
    options: Object,
    cached: Boolean,
    noCached: Boolean
  },
  setup({
    useLoading,
    method = 'post',
    url,
    params,
    options
  }) {
    const state = reactive({
      loading: false,
      error: null,
      res: {}
    });
    const getData = async function() {
      state.loading = true;
      
      let res;
      try {
        const opts = Object.assign(DataContainer.headers, options);
        res = await DataContainer.serviceHandler(method, url, params, opts) || {};
        const {
          error,
          data
        } = res;
        if (error) {
          state.error = error;
        } else {
          state.res = data;
        }
      } catch(e) {
        state.error = e;
      }

      state.loading = false;
    }

    onMounted(() => {
      console.log('rendered data container.');
      getData();
    });

    return {
      getData,
      ...toRefs(state)
    }
  }
});

export default DataContainer;

DataContainer.create = function(options) {
  const {
    serviceHandler,
    headers = {}
  } = options;
  if (typeof serviceHandler === 'function') {
    DataContainer.serviceHandler = serviceHandler;
  } else {
    throw new Error(`'serviceHandler' expected a function.`);
  }
  if (typeof headers === 'object') {
    DataContainer.headers = headers;
  }
  return DataContainer;
};
</script>