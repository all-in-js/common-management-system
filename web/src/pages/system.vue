<template>
  <content-frame class="system-content">
    <template v-slot:left>
      <search-form
        @reset="reset"
        :back-icon="false"
        title="系统管理">
        <a-form
          layout="vertical">
          <a-form-item label="模块名">
            <a-input placeholder="请输入模块名"></a-input>
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
      <div class="result-head">
        <span>结果列表：共 5 条</span>
        <div class="result-ctrls">
          <a-button
            @click="toggleNewModule"
            type="primary">新建模块</a-button>
        </div>
      </div>
      <a-table
        row-key="_id"
        :data-source="dataSource"
        :columns="columns"
        ></a-table>
    </template>
    <a-modal
      v-model:visible="showCreateNewModule">
      <a-form>
        <a-form-item label="模块名称">
          <a-input placeholder="请输入模块名称"></a-input>
        </a-form-item>
        <a-form-item label="模块路径">
          <a-input placeholder="请输入模块路径"></a-input>
        </a-form-item>
      </a-form>
    </a-modal>
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
      dataSource: [
        {
          _id: 1,
          name: '12311',
          path: 'qwqwqw',
          status: 1
        },
        {
          _id: 2,
          name: 'ssaasssa',
          path: 'qwqwqw',
          status: 1
        },
        {
          _id: 3,
          name: 'assas',
          path: 'qwqwqw',
          status: 1
        }
      ],
      columns: [
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
          dataIndex: 'status',
          width: '25%'
        },
        {
          title: '操作',
          dataIndex: 'operation',
          width: '25%'
        }
      ],
      showCreateNewModule: false,
      status: '0'
    });
    return {
      toggleNewModule() {
        state.showCreateNewModule = !state.showCreateNewModule;
      },
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
.result-head {
  padding-right: 20px;
  line-height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
