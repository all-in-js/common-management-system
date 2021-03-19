<template>
  <content-frame class="system-content">
    <template v-slot:left>
      <search-form
        @search="search"
        :back-icon="false"
        :search-form="searchForm"
        title="系统管理">
        <a-form
          layout="vertical">
          <a-form-item
            label="模块名">
            <a-input
              v-model:value="searchForm.name"
              placeholder="请输入模块名"></a-input>
          </a-form-item>
          <a-form-item
            label="状态">
            <a-radio-group v-model:value="searchForm.using">
              <a-radio :value="0">全部</a-radio>
              <a-radio :value="1">启用</a-radio>
              <a-radio :value="2">禁用</a-radio>
            </a-radio-group>
          </a-form-item>
        </a-form>
      </search-form>
    </template>
    <template v-slot:right>
      <fetch-data
        ref="getModulesRef"
        url="api/modules"
        :params="searchForm">
        <template #data="{ res }">
          <div class="result-head">
            <span>结果列表：共 {{ res.total }} 条</span>
            <div class="result-ctrls">
              <a-button
                @click="toggleNewModule"
                type="primary">新建模块</a-button>
            </div>
          </div>
          <a-table
            row-key="_id"
            :data-source="res.data"
            :columns="columns">
            <template v-slot:using="{ text }">
              <span class="using" v-if="text === 1">启用中</span>
              <span class="forbidden" v-else>禁用中</span>
            </template>  
          </a-table>
        </template>
      </fetch-data>
    </template>
    <create-new-module
      ref="newModuleRef"
      @postNewModule="postNewModule" />
  </content-frame>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, ref } from 'vue'
import ContentFrame from '../components/content-frame.vue'
import SearchForm from '../components/search-form.vue'
import CreateNewModule from '../components/create-new-module.vue'

const columns = [
  {
    title: '模块名',
    dataIndex: 'name',
    width: '25%'
  },
  {
    title: '路径',
    dataIndex: 'path',
    width: '25%'
  },
  {
    title: '状态',
    dataIndex: 'using',
    slots: {
      customRender: 'using'
    },
    width: '25%'
  },
  {
    title: '操作',
    dataIndex: 'operation',
    width: '25%'
  }
];

export default defineComponent({
  components: {
    ContentFrame,
    SearchForm,
    CreateNewModule
  },
  setup() {
    const newModuleRef = ref(null);
    const getModulesRef = ref(null);
    const state = reactive({
      dataSource: [],
      columns,
      searchForm: {
        name: '',
        using: 0,
        pageSize: 10,
        pageNo: 1
      }
    });

    function getModules() {
      getModulesRef.value.getData();
    }

    return {
      newModuleRef,
      getModulesRef,
      postNewModule: getModules,
      search: getModules,
      toggleNewModule() {
        newModuleRef.value.toggleNewModule();
      },
      ...toRefs(state)
    }
  }
})
</script>
<style lang="scss" scoped>
.result-head {
  padding-right: 20px;
  line-height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.using {
  color: #1eb51e;
}
.forbidden {
  color: #bbbbbb;
}
</style>
