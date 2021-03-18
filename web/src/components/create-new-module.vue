<template>
  <a-modal
    v-model:visible="showCreateNewModule"
    @cancel="closeCreateNewModule"
    @ok="submit">
    <a-form
      :label-col="{ span: 6 }"
      class="new-module-form">
      <a-form-item
        v-bind="validateInfos.name"
        label="模块名称">
        <a-input
          v-model:value="formState.name"
          placeholder="请输入模块名称"></a-input>
      </a-form-item>
      <a-form-item
        v-bind="validateInfos.path"
        label="模块路径">
        <a-input
          v-model:value="formState.path"
          placeholder="请输入模块路径"></a-input>
      </a-form-item>
      <a-form-item
        v-bind="validateInfos.using"
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
import { ComponentInternalInstance, getCurrentInstance, defineComponent, reactive, toRefs, toRaw } from 'vue';
import { useForm } from '@ant-design-vue/use';

export default defineComponent({
  setup(props, cx) {
    const instance: ComponentInternalInstance = getCurrentInstance();
    const cxProps = instance.appContext.config.globalProperties;
    const state = reactive({
      showCreateNewModule: false,
      formState: {
        name: '',
        path: '',
        using: 1
      }
    });

    const rules = reactive({
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
    });

    // 新建模块表单
    const { resetFields, validate, validateInfos } = useForm(state.formState, rules);

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
        cxProps.$message.success(msg);
        toggleNewModule();
        cx.emit('postAddModule');
      } else {
        cxProps.$message.error(msg);
      }
    }

    // 提交新建模块请求
    const submit = async function() {
      validate()
      .then(() => {
        const formState = toRaw(state.formState);
        addModule(formState);
      });
    }

    return {
      submit,
      validateInfos,
      closeCreateNewModule,
      toggleNewModule,
      ...toRefs(state)
    }
  }
});
</script>
<style lang="scss" scoped>
.new-module-form {
  width: 400px;
  margin: 50px auto 0;
  .ant-input {
    width: 270px;
  }
}
</style>