<template>
  <a-modal
    v-model:visible="showCreateUser"
    title="新建用户"
    ok-text="确定"
    cancel-text="取消">
    <a-form
      :model="formState"
      :rules="rules"
      :label-col="{ span: 6 }"
      class="create-user">
      <a-form-item
        name="name"
        label="用户名">
        <a-input
          v-model:value="formState.name"
          placeholder="请输入用户名"
          autocomplete="off"></a-input>
      </a-form-item>
      <a-form-item
        name="role"
        label="角色">
        <a-radio-group
          v-model:value="formState.role">
          <a-radio :value="1">管理员</a-radio>
          <a-radio :value="2">用户</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item
        name="using"
        label="状态">
        <a-radio-group v-model:value="formState.using">
          <a-radio :value="1">启用</a-radio>
          <a-radio :value="2">禁用</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item
        name="authList"
        label="模块列表">
        <fetch-data
          url="api/modules">
          <template v-slot:data="{ res }">
            <a-checkbox-group
              v-model:value="formState.authList">
              <template v-for="item of res.data">
                <a-checkbox
                  v-if="item.using === 1"
                  :value="item._id">{{ item.name }}</a-checkbox>
              </template>
            </a-checkbox-group>
          </template>  
        </fetch-data>
      </a-form-item>
    </a-form>
  </a-modal>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'

export default defineComponent({
  setup() {
    const state = reactive({
      showCreateUser: true,
      formState: {
        name: '',
        role: 2,
        using: 1
      }
    });

    const rules = {

    };

    const roles = [
      {
        label: '管理员',
        value: 1
      },
      {
        label: '用户',
        value: 2
      }
    ];

    return {
      roles,
      ...toRefs(state)
    }
  },
})
</script>
<style lang="scss">
.create-user {
  width: 400px;
  margin: 20px auto 0;
  .ant-input {
    width: 270px;
  }
}
</style>