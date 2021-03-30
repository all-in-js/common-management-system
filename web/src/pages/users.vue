<template>
  <content-frame class="users-content">
    <template v-slot:left>
      <search-form
        @reset="reset"
        @search="search"
        :back-icon="false"
        :search-form="searchForm"
        title="用户管理">
        <a-form
          layout="vertical">
          <a-form-item
            name="username"
            label="用户名">
            <a-input
              v-model:value="searchForm.username"
              placeholder="请输入用户名"
              autocomplete="off"></a-input>
          </a-form-item>
          <a-form-item
            name="role"
            label="角色">
            <a-radio-group v-model:value="searchForm.role">
              <a-radio :value="0">全部</a-radio>
              <a-radio :value="1">管理员</a-radio>
              <a-radio :value="2">用户</a-radio>
            </a-radio-group>
          </a-form-item>
          <a-form-item
            name="using"
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
        ref="getUsersRef"
        url="api/userList"
        :params="searchForm">
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
            <template v-slot:authList="{ record }">
              {{ record.authList.map((item) => item.name).join('，') }}
            </template>
            <template v-slot:operation="{ record }">
              <div>
                <a-button
                  @click="() => showEditUser(record)"
                  type="link">编辑</a-button>
                <a-popconfirm
                  title="确认删除该模块吗？"
                  ok-text="确定"
                  cancel-text="取消"
                  @confirm="() => deleteUser(record._id)">
                  <a-button type="link">删除</a-button>
                </a-popconfirm>
              </div>
            </template>
          </a-table>
        </template>
      </fetch-data>
    </template>
    <create-user
      ref="createUserRef"
      :data="editData"
      @postAddUser="postAddUser"></create-user>
  </content-frame>
</template>
<script lang="ts">
import { ComponentInternalInstance, getCurrentInstance, defineComponent, reactive, toRefs, ref } from 'vue'
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
    const instance: ComponentInternalInstance = getCurrentInstance();
    const cxProps = instance.appContext.config.globalProperties;
    const scrollY = window.innerHeight - 240;
    const getUsersRef = ref();
    const createUserRef = ref();
    const state = reactive({
      datas: [],
      editData: null,
      scrollY,
      searchForm: {
        username: '',
        role: 0,
        using: 0
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
      ]
    });

    function getPagination(total) {
      return {
        total,
        pageSize: 30,
        onChange(page, pageSize) {
          // state.formState.pageSize = pageSize;
          // state.formState.pageNo = page;
          // getUsers();
        }
      }
    }

    function getUsers() {
      getUsersRef.value.getData();
    }

    async function deleteUser(id) {
      const {
        code,
        msg
      } = await cxProps.$fetch.post('api/deleteUser', {
        id
      });

      if (code === 1000) {
        cxProps.$message.success(msg);
        getUsers();
      } else {
        cxProps.$message.error(msg);
      }
    }

    function showEditUser(record) {
      const row = JSON.parse(JSON.stringify(record));
      row.authList = row.authList.map((item) => item.path);
      state.editData = row;
      state.editData.id = row._id;
      createUserRef.value.toggleNewUser();
    }

    return {
      getUsersRef,
      createUserRef,
      getPagination,
      deleteUser,
      showEditUser,
      postAddUser: getUsers,
      reset() {
        console.log('reset');
      },
      search() {
        getUsers();
      },
      showCreateUser() {
        state.editData = null;
        createUserRef.value.toggleNewUser();
      },
      ...toRefs(state)
    }
  }
})
</script>
<style lang="scss" scoped>

</style>
