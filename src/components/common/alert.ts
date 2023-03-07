import { ElMessageBox } from 'element-plus';

function alertConfirm(
  title: string,
  message: string,
  callback: () => void
): void {
  ElMessageBox.alert(message, title, {
    confirmButtonText: '확인',
    callback: callback,
  });
}

function alertYesNo(
  title: string,
  message: string,
  callback: () => void,
  errorCallback: null | (() => void)
): void {
  ElMessageBox.confirm(message, title, {
    confirmButtonText: '예',
    cancelButtonText: '아니오',
  })
    .then(() => {
      if (typeof callback === 'function') {
        callback();
      }
    })
    .catch(() => {
      if (typeof errorCallback === 'function') {
        errorCallback();
      }
    });
}

export { alertConfirm, alertYesNo };
