import { BasicColumn } from '@/components/Table';
import { FormSchema } from '@/components/Table';
//列表数据
// @ts-ignore
export const columns: BasicColumn[] = [
  {
    title: '系统名称',
    align: 'center',
    dataIndex: 'name',
    width: 150,
  },
  {
    title: '系统地址',
    align: 'center',
    dataIndex: 'ipaddress',
    width: 280,
  },
  {
    title: '账号类型',
    align: 'center',
    dataIndex: 'type_dictText',
    width: 120,
  },
  {
    title: '用户名',
    align: 'center',
    dataIndex: 'account',
    width: 150,
  },
];

//查询数据
export const searchFormSchema: FormSchema[] = [
  {
    label: '系统名称',
    field: 'name',
    component: 'Input',
    // colProps: { span: 6 },
  },
  {
    label: '系统地址',
    field: 'ipaddress',
    component: 'Input',
    // colProps: { span: 6 },
  },
  {
    label: '账号类型',
    field: 'type',
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: 'tyoe',
    },
    //colProps: {span: 6},
  },
];

//表单数据
export const formSchema: FormSchema[] = [
  {
    label: '系统名称',
    field: 'name',
    component: 'Input',
    dynamicRules: ({}) => {
      return [{ required: true, message: '请输入系统名称!' }];
    },
  },
  {
    label: '系统地址',
    field: 'ipaddress',
    component: 'Input',
    dynamicRules: ({}) => {
      return [{ required: true, message: '请输入系统地址!' }];
    },
  },
  {
    label: '账号类型',
    field: 'type',
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: 'tyoe',
    },
    dynamicRules: ({}) => {
      return [{ required: true, message: '请输入账号类型!' }];
    },
  },
  {
    label: '用户名',
    field: 'account',
    component: 'Input',
    dynamicRules: ({}) => {
      return [{ required: true, message: '请输入用户名!' }];
    },
  },
  {
    label: '密码',
    field: 'password',
    component: 'InputPassword',
    dynamicRules: ({}) => {
      return [{ required: true, message: '请输入密码!' }];
    },
  },
  {
    label: '账号定位标签',
    field: 'accountLable',
    component: 'Input',
    dynamicRules: ({}) => {
      return [{ required: true, message: '请输入账号定位标签!' }];
    },
  },
  {
    label: '密码定位标签',
    field: 'paawordLable',
    component: 'Input',
    dynamicRules: ({}) => {
      return [{ required: true, message: '请输入账号定位标签!' }];
    },
  },
  // TODO 主键隐藏字段，目前写死为ID
  {
    label: '',
    field: 'id',
    component: 'Input',
    show: false,
  },
];
