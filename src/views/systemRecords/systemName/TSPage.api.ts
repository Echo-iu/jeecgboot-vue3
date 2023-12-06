import { defHttp } from '@/utils/http/axios';
import { useMessage } from '@/hooks/web/useMessage';

const { createConfirm } = useMessage();

enum Api {
  list = '/systemRecords/tSPage/list',
  save = '/systemRecords/tSPage/add',
  edit = '/systemRecords/tSPage/edit',
  deleteOne = '/systemRecords/tSPage/delete',
  deleteBatch = '/systemRecords/tSPage/deleteBatch',
  importExcel = '/systemRecords/tSPage/importExcel',
  exportXls = '/systemRecords/tSPage/exportXls',
  systemName = '/systemRecords/tSPage/systemName',
}

/**
 * 导出api
 * @param params
 */
export const getExportUrl = Api.exportXls;

/**
 * 导入api
 */
export const getImportUrl = Api.importExcel;

/**
 * 列表接口
 * @param params
 */
export const list = (params) => defHttp.get({ url: Api.list, params });

/**
 * 前往目标网页
 */
// export const getSystemName = (params) => defHttp.put({ url: Api.systemName, params });
export const getSystemName = (params, handleSuccess) => {
  return defHttp.put({ url: Api.systemName, params }).then(() => {
    handleSuccess();
  });
};
/**
 * 删除单个
 * @param params
 * @param handleSuccess
 */
export const deleteOne = (params) => {
  return defHttp.delete({ url: Api.deleteOne, params }, { joinParamsToUrl: true }).then(() => {});
};

/**
 * 批量删除
 * @param params
 * @param handleSuccess
 */
export const batchDelete = (params, handleSuccess) => {
  createConfirm({
    iconType: 'warning',
    title: '确认删除',
    content: '是否删除选中数据',
    okText: '确认',
    cancelText: '取消',
    onOk: () => {
      return defHttp.delete({ url: Api.deleteBatch, data: params }, { joinParamsToUrl: true }).then(() => {
        handleSuccess();
      });
    },
  });
};

/**
 * 保存或者更新
 * @param params
 * @param isUpdate
 */
export const saveOrUpdate = (params, isUpdate) => {
  const url = isUpdate ? Api.edit : Api.save;
  return defHttp.post({ url: url, params }, { isTransformResponse: false });
};
