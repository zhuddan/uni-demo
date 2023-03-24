import { createActionSheet } from './action';
import { createLoading } from './loading';
import { createModal } from './modal';
import { createToast } from './toast';

// toast
export const showToast = createToast('none');
export const showToastSuccess = createToast('success');
export const showToastError = createToast('error');
// loading
export const showLoading = createLoading();
export const hideLoading = uni.hideLoading;
// modal
export const showModal = createModal();
export const showAlert = createModal({ showCancel: false });
// actions
export const showActions = createActionSheet();
