<template>
  <a-spin :spinning="confirmLoading">
    <a-form ref="formRef" class="antd-modal-form" :labelCol="labelCol" :wrapperCol="wrapperCol">
      <a-row>
        <a-col :span="24">
          <a-form-item label="系统名称" v-bind="validateInfos.name">
            <a-input v-model:value="formData.name" placeholder="请输入系统名称" :disabled="disabled" />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="系统地址" v-bind="validateInfos.ipaddress">
            <a-input v-model:value="formData.ipaddress" placeholder="请输入系统地址" :disabled="disabled" />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="账号类型" v-bind="validateInfos.type">
            <j-dict-select-tag v-model:value="formData.type" dictCode="tyoe" placeholder="请选择账号类型" :disabled="disabled" />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="用户名" v-bind="validateInfos.account">
            <a-input v-model:value="formData.account" placeholder="请输入用户名" :disabled="disabled" />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="密码" v-bind="validateInfos.password">
            <a-input v-model:value="formData.password" type="password" placeholder="请输入密码" :disabled="disabled" />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="账号定位标签" v-bind="validateInfos.accountLable">
            <a-input v-model:value="formData.accountLable" placeholder="请输入账号定位标签" :disabled="disabled" />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="密码定位标签" v-bind="validateInfos.passwordLable">
            <a-input v-model:value="formData.passwordLable" placeholder="请输入密码定位标签" :disabled="disabled" />
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
  </a-spin>
</template>

<script lang="ts" setup>
  import { ref, reactive, defineExpose, nextTick, defineProps, computed, onMounted } from 'vue';
  import { defHttp } from '@/utils/http/axios';
  import { useMessage } from '@/hooks/web/useMessage';
  import JDictSelectTag from '@/components/Form/src/jeecg/components/JDictSelectTag.vue';
  import { getValueType } from '@/utils';
  import { saveOrUpdate } from '../TSPage.api';
  import { Form } from 'ant-design-vue';

  const props = defineProps({
    formDisabled: { type: Boolean, default: false },
    formData: { type: Object, default: () => {} },
    formBpm: { type: Boolean, default: true },
  });
  const formRef = ref();
  const useForm = Form.useForm;
  const emit = defineEmits(['register', 'ok']);
  const formData = reactive<Record<string, any>>({
    id: '',
    name: '',
    ipaddress: '',
    type: '',
    account: '',
    password: '',
  });
  const { createMessage } = useMessage();
  const labelCol = ref<any>({ xs: { span: 24 }, sm: { span: 5 } });
  const wrapperCol = ref<any>({ xs: { span: 24 }, sm: { span: 16 } });
  const confirmLoading = ref<boolean>(false);
  //表单验证
  const validatorRules = {
    name: [{ required: true, message: '请输入系统名称!' }],
    ipaddress: [{ required: true, message: '请输入系统地址!' }],
    type: [{ required: true, message: '请输入账号类型!' }],
    account: [{ required: true, message: '请输入用户名!' }],
    password: [{ required: true, message: '请输入密码!' }],
    passwordLable: [{ required: true, message: '请输入账号定位标签!' }],
    accountLable: [{ required: true, message: '请输入密码定位标签!' }],
  };
  const { resetFields, validate, validateInfos } = useForm(formData, validatorRules, { immediate: true });

  // 表单禁用
  const disabled = computed(() => {
    if (props.formBpm === true) {
      if (props.formData.disabled === false) {
        return false;
      } else {
        return true;
      }
    }
    return props.formDisabled;
  });

  /**
   * 新增
   */
  function add() {
    edit({});
  }

  /**
   * 编辑
   */
  function edit(record) {
    nextTick(() => {
      resetFields();
      //赋值
      Object.assign(formData, record);
    });
  }

  /**
   * 提交数据
   */
  async function submitForm() {
    // 触发表单验证
    await validate();
    confirmLoading.value = true;
    const isUpdate = ref<boolean>(false);
    //时间格式化
    let model = formData;
    if (model.id) {
      isUpdate.value = true;
    }
    //循环数据
    for (let data in model) {
      //如果该数据是数组并且是字符串类型
      if (model[data] instanceof Array) {
        let valueType = getValueType(formRef.value.getProps, data);
        //如果是字符串类型的需要变成以逗号分割的字符串
        if (valueType === 'string') {
          model[data] = model[data].join(',');
        }
      }
    }
    await saveOrUpdate(model, isUpdate.value)
      .then((res) => {
        if (res.success) {
          createMessage.success(res.message);
          emit('ok');
        } else {
          createMessage.warning(res.message);
        }
      })
      .finally(() => {
        confirmLoading.value = false;
      });
  }

  defineExpose({
    add,
    edit,
    submitForm,
  });
</script>

<style lang="less" scoped>
  .antd-modal-form {
    height: 500px !important;
    overflow-y: auto;
    padding: 14px;
  }
</style>
