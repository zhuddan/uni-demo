import { COLOR_PRIMARY } from './const';

type ActionSheetOptions = UniNamespace.ShowActionSheetOptions;
type ActionSheetOptionsWithoutItemList = Omit<ActionSheetOptions, 'itemList'>;
interface ActionsReturnType {
  tapIndex: number;
  errMsg: string;
}
export function createActionSheet() {
  const defaultOptions: ActionSheetOptionsWithoutItemList = {
    itemColor: COLOR_PRIMARY,
  };
  return (itemList: string[], title = '请选择', options?: ActionSheetOptionsWithoutItemList) => {
    return new Promise<{ result: string; tapIndex: number }>((resolve, reject) => {
      uni.showActionSheet({
        ...defaultOptions,
        title,
        itemList,
        ...options,
        success(result) {
          const res = result as ActionsReturnType;
          resolve({
            result: itemList[res.tapIndex],
            tapIndex: result.tapIndex,
          });
        },
        fail(e) {
          reject(e.errMsg);
        },
      });
    });
  };
}

