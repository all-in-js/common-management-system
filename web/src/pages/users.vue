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
      <fetch-data
        ref="getUsersRef"
        url="api/userList">
        <template #data="{ res, loading }">
          <div class="result-head">
            <span>结果列表：共 {{ res.total || 0 }} 条</span>
            <div class="result-ctrls">
              <a-button
                type="primary">新建用户</a-button>
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
                  type="link">编辑</a-button>
                <a-popconfirm
                  title="确认删除该模块吗？"
                  ok-text="确定"
                  cancel-text="取消">
                  <a-button type="link">删除</a-button>
                </a-popconfirm>
              </div>
            </template>
          </a-table>
        </template>
      </fetch-data>
    </template>
    <create-user></create-user>
  </content-frame>
</template>
<script>
import { defineComponent, reactive, toRefs, ref } from 'vue'
import ContentFrame from '../components/content-frame.vue'
import SearchForm from '../components/search-form.vue'
import CreateUser from '../components/create-user.vue'

export default defineComponent({
  components: {
    ContentFrame,
    CreateUser,
    SearchForm
  },
  setup() {
    const scrollY = window.innerHeight - 240;
    const getUsersRef = ref();
    const state = reactive({
      scrollY,
      columns: [
        {
          title: '用户名',
          dataIndex: 'name',
          width: '20%'
        },
        {
          title: '角色',
          dataIndex: 'role',
          width: '20%'
        },
        {
          title: '权限列表',
          dataIndex: 'authList',
          width: '20%'
        },
        {
          title: '状态',
          dataIndex: 'status',
          width: '20%'
        },
        {
          title: '操作',
          dataIndex: 'operation',
          width: '20%'
        }
      ],
      showCreateUser: false,
      status: '0'
    });

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
    return {
      getUsersRef,
      getPagination,
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
