import { ref } from 'vue';
import type { Ref } from 'vue';
import { DictBase } from './DictBase';
import type { DictBaseOptions, DictData, LoadDict, OriginDictData } from './typings';

export class DictMeta<DT extends string = string> extends DictBase {
  dictType: DT;
  data: Ref<DictData[]> = ref([]);
  loading = ref(false);
  loadDict: LoadDict<DT>;

  constructor(dictType: DT, loadDict: LoadDict<DT>, options: Partial<DictBaseOptions> = {}) {
    super(options);
    this.dictType = dictType;
    this.loadDict = loadDict;
    this.init();
  }

  init() {
    if (!this.options.isLazy) this.load();
  }

  async load() {
    return this.data.value = await this.requestDicts();
  }

  private requestDicts(): Promise<DictData[]> {
    return new Promise(async (resolve, reject) => {
      try {
        this.loading.value = true;
        const res = await this.loadDict(this.dictType);
        this.loading.value = false;
        const dictData = this.compileDict(res);
        resolve(dictData);
      }
      catch (e) {
        reject(e);
      }
    });
  }

  compileDict(list: OriginDictData[]): DictData[] {
    return list.map((data) => {
      const res = { raw: data } as unknown as DictData;
      const labelField = this.getField(data, ...this.labelFields);
      const valueField = this.getField(data, ...this.valueFields);
      res.label = data[labelField] as string;
      res.value = data[valueField] as string;
      return res;
    });
  }
}
