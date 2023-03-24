import { ref } from 'vue';
import { onLoad } from '@dcloudio/uni-app';

export function useQuery<T extends AnyObject = AnyObject>(defaultValue?: T) {
  const query = ref<T>(defaultValue || {} as T);
  onLoad((_query) => {
    query.value = _query || {};
  });
  return {
    query,
  };
}