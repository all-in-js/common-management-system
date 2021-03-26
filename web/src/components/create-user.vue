<template>
  <a-modal
    @ok="submit"
    v-model:visible="showCreateUser"
    title="新建用户"
    ok-text="确定"
    cancel-text="取消">
    <a-form
      ref="formRef"
      :model="formState"
      :rules="rules"
      :label-col="{ span: 6 }"
      class="create-user">
      <a-form-item
        name="username"
        label="用户名">
        <a-input
          v-model:value="formState.username"
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
                  :value="item.path">{{ item.name }}</a-checkbox>
              </template>
            </a-checkbox-group>
          </template>  
        </fetch-data>
      </a-form-item>
    </a-form>
  </a-modal>
</template>
<script lang="ts">
import { ComponentInternalInstance, getCurrentInstance, defineComponent, reactive, toRefs, toRaw, ref } from 'vue'

export default defineComponent({
  setup() {
    const instance: ComponentInternalInstance = getCurrentInstance();
    const cxProps = instance.appContext.config.globalProperties;
    const formRef = ref();
    const state = reactive({
      showCreateUser: false,
      formState: {
        username: '',
        role: 2,
        using: 1,
        authList: []
      }
    });

    const rules = {
      username: [
        {
          required: true,
          trigger: 'blur',
          message: '请输入用户名'
        }
      ],
      authList: [
        {
          required: true,
          message: '请选择应用模块'
        }
      ]
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

    const toggleNewUser = function() {
      state.showCreateUser = !state.showCreateUser;
    }

    const addUser = async function(data) {
      const {
        code,
        msg
      } = await cxProps.$fetch.post('api/addUser', data);

      if (code === 1000) {
        cxProps.$message.success(msg);
      } else {
        cxProps.$message.error(msg);
      }
    }

    const submit = function() {
      formRef.value.validate()
      .then(() => {
        const formData = toRaw(state.formState);
        addUser(formData); 
      });
    }
    return {
      roles,
      rules,
      submit,
      formRef,
      toggleNewUser,
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