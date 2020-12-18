
// import { message } from 'antd';
// import { SocialApi } from './index';

// 导出下载文件
// export const exportExcelFn = (url:string, payload:any, filename:string, cb?:(...arg:any[]) => void) => SocialApi.post(url, payload, {
//   responseType: 'arraybuffer',
//   timeout: 60000,
// }).then((res) => {
//   if (/^2/.test(res.status.toString())) {
//     const a = document.createElement('a');
//     a.href = window.URL.createObjectURL(
//       new Blob([res.data], { type: 'application/vnd.ms-excel' }),
//     );
//     a.download = filename;
//     a.click();
//     cb && cb(true);
//   } else {
//     message.error('导出失败');
//     cb && cb(false);
//   }
// }).catch((e) => console.error(e));

// // 导入文件
// export const importExcelFn = (url:string, formData:FormData, cb?:(...arg:any[]) => void) => SocialApi.post(url, {}, {
//   data: formData,
//   timeout: 20000,
// }).then((res) => {
//   if (/^2/.test(res.status.toString())) {
//     message.error('导入成功');
//     cb && cb(true);
//   } else {
//     message.error('导入失败');
//     cb && cb(false);
//   }
// }).catch((e) => console.error(e));
