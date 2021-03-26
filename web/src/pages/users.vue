<template>
  <content-frame class="users-content">
    <template v-slot:left>
      <search-form
        @reset="reset"
        :back-icon="false"
        :search-form="searchForm"
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
        <template v-slot:data="{ res, loading }">
          <div class="result-head">
            <span>结果列表：共 {{ res.total || 0 }} 条</span>
            <div class="result-ctrls">
              <a-button
                @click="showCreateUser"
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
            <template v-slot:role="{ text }">
              {{ ['', '管理员', '用户'][text] }}
            </template>
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
    <create-user
      ref="createUserRef"></create-user>
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
    const createUserRef = ref();
    const state = reactive({
      datas: [ { "_id": "605d9655fb266956a0c88495", "username": "cscs", "password": "e10adc3949ba59abbe56e057f20f883e", "role": 2, "using": 1, "authList": [ { "__v_isVNode": true, "__v_skip": true, "props": null, "key": null, "ref": null, "scopeId": null, "children": "605078adc00da5298037d3f9", "target": null, "targetAnchor": null, "staticCount": 0, "shapeFlag": 8, "patchFlag": 0, "dynamicProps": null, "dynamicChildren": null, "appContext": null, "dirs": null, "transition": null, "component": null, "suspense": null, "ssContent": null, "ssFallback": null, "el": "[object Text]", "anchor": null } ], "imgColor": "rgb(22,186,227)", "createTime": 1616746069809, "creator": "" } ],
      scrollY,
      searchForm: {
        name: '',
        using: 1
      },
      columns: [
        {
          title: '用户名',
          dataIndex: 'username',
          width: '20%'
        },
        {
          title: '角色',
          dataIndex: 'role',
          slots: {
            customRender: 'role'
          },
          width: '20%'
        },
        {
          title: '权限列表',
          dataIndex: 'authList',
          slots: {
            customRender: 'authList'
          },
          width: '20%'
        },
        {
          title: '状态',
          dataIndex: 'using',
          slots: {
            customRender: 'using'
          },
          width: '20%'
        },
        {
          title: '操作',
          dataIndex: 'operation',
          slots: {
            customRender: 'operation'
          },
          width: '20%'
        }
      ],
      status: '0'
    });

    function getPagination(total) {
      return {
        total,
        pageSize: 30,
        onChange(page, pageSize) {
          state.formState.pageSize = pageSize;
          state.formState.pageNo = page;
          getModules();
        }
      }
    }
    return {
      getUsersRef,
      createUserRef,
      getPagination,
      reset() {
        console.log('reset');
      },
      search() {
        console.log('search');
      },
      showCreateUser() {
        createUserRef.value.toggleNewUser();
      },
      ...toRefs(state)
    }
  }
})
</script>
<style lang="scss" scoped>

</style>
