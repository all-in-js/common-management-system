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
        >
        <template v-slot:using="{ text }">
          <span class="using" v-if="text === 1">启用中</span>
          <span class="forbidden" v-else>禁用中</span>
        </template>  
      </a-table>
    </template>
    <a-modal
      v-model:visible="showCreateNewModule"
      @ok="submit">
      <a-form
        :label-col="{ span: 6 }"
        class="new-module-form">
        <a-form-item
          required 
          label="模块名称">
          <a-input
            v-model:value="formState.name"
            placeholder="请输入模块名称"></a-input>
        </a-form-item>
        <a-form-item
          required 
          label="模块路径">
          <a-input
            v-model:value="formState.path"
            placeholder="请输入模块路径"></a-input>
        </a-form-item>
        <a-form-item
          label="状态">
          <a-radio-group v-model:value="formState.using">
            <a-radio :value="1">启用</a-radio>
            <a-radio :value="2">禁用</a-radio>
          </a-radio-group>
        </a-form-item>
      </a-form>
    </a-modal>
  </content-frame>
</template>
<script>
import { defineComponent, reactive, toRefs, toRaw, getCurrentInstance, watchEffect } from 'vue'
import { useForm } from '@ant-design-vue/use'
import ContentFrame from '../components/content-frame.vue'
import SearchForm from '../components/search-form.vue'

export default defineComponent({
  components: {
    ContentFrame,
    SearchForm
  },
  setup() {
    const { ctx } = getCurrentInstance(); 
    const state = reactive({
      dataSource: [],
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
      ],
      showCreateNewModule: false,
      status: '0',
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
          message: '请输入模块名称'
        }
      ],
      path: [
        {
          required: true,
          message: '请输入模块路径'
        }
      ]
    });
    
    // 获取系统模块
    const getModules = async function() {
      const { code, data, msg } = await ctx.$fetch.post('api/modules');
      if (code === 1000) {
        state.dataSource = data;
      } else {
        ctx.$message.error(msg);
      }
    }

    // 开关闭新建模块弹窗
    const toggleNewModule = function() {
      state.showCreateNewModule = !state.showCreateNewModule;
    }

    // 新建模块表单
    const { resetFields, validate } = useForm(state.formState, rules);

    // 新建模块
    const addModule = async function(data) {
      const { code, msg } = await ctx.$fetch.post('api/addModule', data);
      if (code === 1000) {
        ctx.$message.success(msg);
        getModules();
        resetFields();
        toggleNewModule();
      } else {
        ctx.$message.error(msg);
      }
    }

    // 提交新建模块请求
    const submit = async function() {
      validate()
      .then(() => {
        const formState = toRaw(state.formState);
        addModule(formState);
      })
      .catch((e) => {
        ctx.$message.error('请输入模块名称和路径');
      });
    }

    watchEffect(() => {
      getModules();
    }, []);

    return {
      toggleNewModule,
      reset() {
        console.log('reset');
      },
      search() {
        console.log('search');
      },
      submit,
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
.new-module-form {
  width: 400px;
  margin: 50px auto 0;
  .ant-input {
    width: 270px;
  }
}
.using {
  color: #1eb51e;
}
.forbidden {
  color: #bbbbbb;
}
</style>
