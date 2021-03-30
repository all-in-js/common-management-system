<template>
  <a-modal
    v-model:visible="showCreateNewModule"
    @cancel="closeCreateNewModule"
    @ok="submit"
    :title="`${data ? '编辑' : '新建'}模块`"
    ok-text="确定"
    cancel-text="取消">
    <a-form
      ref="formRef"
      :model="formState"
      :rules="rules"
      :label-col="{ span: 6 }"
      class="new-module-form">
      <a-form-item
        name="name"
        label="模块名称">
        <a-input
          v-model:value="formState.name"
          placeholder="请输入模块名称"
          autocomplete="off"></a-input>
      </a-form-item>
      <a-form-item
        name="path"
        label="模块路径">
        <a-input
          v-model:value="formState.path"
          placeholder="请输入模块路径"
          autocomplete="off"></a-input>
      </a-form-item>
      <a-form-item
        using="using"
        label="状态">
        <a-radio-group v-model:value="formState.using">
          <a-radio :value="1">启用</a-radio>
          <a-radio :value="2">禁用</a-radio>
        </a-radio-group>
      </a-form-item>
    </a-form>
  </a-modal>
</template>
<script lang="ts">
import { ComponentInternalInstance, getCurrentInstance, defineComponent, reactive, toRefs, toRaw, watch, ref } from 'vue';

export default defineComponent({
  props: {
    data: Object
  },
  setup(props, cx) {
    const instance: ComponentInternalInstance = getCurrentInstance();
    const cxProps = instance.appContext.config.globalProperties;
    const formRef = ref();
    const state = reactive({
      showCreateNewModule: false,
      formState: {
        id: '',
        name: '',
        path: '',
        using: 1
      }
    });

    watch(() => props.data, (v) => {
      if (v) {
        state.formState = v as any;
      } else {
        state.formState = {
          id: '',
          name: '',
          path: '',
          using: 1
        };
      }
    });

    const rules = {
      name: [
        {
          required: true,
          trigger: 'blur',
          message: '请输入模块名称'
        }
      ],
      path: [
        {
          required: true,
          trigger: 'blur',
          message: '请输入模块路径'
        }
      ]
    };

    const closeCreateNewModule = function() {
      resetFields();
    }

    // 开关闭新建模块弹窗
    const toggleNewModule = function() {
      state.showCreateNewModule = !state.showCreateNewModule;
    }

    // 新建模块
    const addModule = async function(data) {
      const { code, msg } = await cxProps.$fetch.post('api/addModule', data);
      if (code === 1000) {
        resetFields();
        cxProps.$message.success(msg);
        toggleNewModule();
        cx.emit('postNewModule');
      } else {
        cxProps.$message.error(msg);
      }
    }

    // 提交新建模块请求
    async function submit() {
      formRef.value.validate()
      .then(() => {
        const formState = toRaw(state.formState);
        addModule(formState);
      });
    }

    function resetFields() {
      formRef.value.resetFields();
    };

    return {
      submit,
      formRef,
      closeCreateNewModule,
      toggleNewModule,
      rules,
      ...toRefs(state)
    }
  }
});
</script>
<style lang="scss" scoped>
.new-module-form {
  width: 400px;
  margin: 20px auto 0;
  .ant-input {
    width: 270px;
  }
}
</style>