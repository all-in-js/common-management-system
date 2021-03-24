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
        <template #data="{ res, loading }">
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
            :loading="loading"
            :data-source="res.data"
            :columns="columns"
            :scroll="{y: scrollY}"
            :pagination="getPagination(res.total)">
            <template v-slot:using="{ text }">
              <span class="using" v-if="text === 1">启用中</span>
              <span class="forbidden" v-else>禁用中</span>
            </template>
            <template v-slot:operation="{ record }">
              <div>
                <a-button
                  type="link"
                  @click="() => showEditModule(record)">编辑</a-button>
                <a-popconfirm
                  title="确认删除该模块吗？"
                  ok-text="确定"
                  cancel-text="取消"
                  @confirm="() => deleteModule(record._id)">
                  <a-button type="link">删除</a-button>
                </a-popconfirm>
              </div>
            </template>
          </a-table>
        </template>
      </fetch-data>
    </template>
    <create-new-module
      ref="newModuleRef"
      :data="editData"
      @postNewModule="postNewModule" />
  </content-frame>
</template>
<script lang="ts">
import { ComponentInternalInstance, getCurrentInstance, defineComponent, reactive, toRefs, ref } from 'vue'
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
    slots: {
      customRender: 'operation'
    },
    align: 'center',
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
    const instance: ComponentInternalInstance = getCurrentInstance();
    const cxProps = instance.appContext.config.globalProperties;
    const newModuleRef = ref(null);
    const getModulesRef = ref(null);
    const scrollY = window.innerHeight - 240;
    const state = reactive({
      scrollY,
      editData: null,
      dataSource: [],
      columns,
      searchForm: {
        name: '',
        using: 0,
        pageSize: 30,
        pageNo: 1
      }
    });

    function getModules() {
      getModulesRef.value.getData();
    }

    function getPagination(total) {
      return {
        total,
        pageSize: 30,
        onChange(page, pageSize) {
          state.searchForm.pageSize = pageSize;
          state.searchForm.pageNo = page;
          getModules();
        }
      }
    }

    async function deleteModule(id) {
      const {
        code,
        msg
      } = await cxProps.$fetch.post('api/deleteModule', { id });
      if (code === 1000) {
        cxProps.$message.success(msg);
        getModules();
      } else {
        cxProps.$message.error(msg);
      }
    }

    async function showEditModule(row) {
      state.editData = {
        id: row._id,
        name: row.name,
        path: row.path,
        using: row.using
      };
      newModuleRef.value.toggleNewModule();
    }

    return {
      newModuleRef,
      getModulesRef,
      getPagination,
      postNewModule: getModules,
      search: getModules,
      deleteModule,
      showEditModule,
      toggleNewModule() {
        state.editData = null;
        newModuleRef.value.toggleNewModule();
      },
      ...toRefs(state)
    }
  }
})
</script>
<style lang="scss" scoped>

</style>
