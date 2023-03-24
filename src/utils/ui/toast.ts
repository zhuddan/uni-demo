type ToastOptions = UniNamespace.ShowToastOptions;
type CreateToastOptions = Omit<ToastOptions, 'icon' | 'title'>;

export function createToast(icon: Required<ToastOptions>['icon']) {
  const defaultOptions: ToastOptions = {
    duration: 2000,
    position: 'top',
    mask: true,
  };
  return (title: string, options?: CreateToastOptions) => {
    // return  prompt
    return new Promise((resolve, reject) => {
      uni.showToast({
        ...defaultOptions,
        title,
        icon,
        ...options,
        success(res) {
          console.log(res);
          resolve(res);
        },
        fail(e) {
          reject(e);
        },
      });
    });
  };
}