import type { DictBaseOptions, LoadDict, OriginDictData } from '@/utils/dict/typings';
import { computed, toRefs, unref } from 'vue';
import { request } from '@/utils/request';
import { Dict } from '@/utils/dict';
export type DictTypes =
| 'sys_user_sex'
| 'sys_normal_disable'
| 'sys_notice_type';

const getDicts: LoadDict<DictTypes> = (dictType) => {
  return new Promise<OriginDictData[]>((resolve, reject) => {
    request
      .get<ResponseData<OriginDictData[]>>({
        url: `/api/sys/type/${dictType}`,
      })
      .then((res) => {
        if (!res.data) {
          reject(
            `[Dictionary error] Get dictionary data \`${dictType}\` with null.Please check your dictionary key with \`${dictType}\`.`,
          );
        }
        else {
          resolve(res.data);
        }
      }).catch((e) => {
        reject(e);
      });
  });
};

export function useDicts<DT extends DictTypes = DictTypes>(dts: DT[], options: Partial<DictBaseOptions> = {}) {
  const dict = new Dict<DT>(dts, getDicts, options);
  // debug
  // Dict.debug = true;
  const format = dict.format.bind(dict);
  const load = dict.load.bind(dict);
  const dicts = computed (() => dict.data.value);
  const dictsLoading = computed (() => dict.loading.value);

  return {
    format,
    load,
    dicts,
    dictsLoading,
    ...toRefs(unref(dict.data)),
    ...toRefs(unref(dict.loading)),
  };
}

