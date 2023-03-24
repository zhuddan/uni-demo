import { computed, reactive, unref } from 'vue';
import { DictBase } from './DictBase';
import { DictMeta } from './DictMeta';
import type { DictDataLike as DL, DictValue as DV, DictBaseOptions, DictData, DictDataListRecord, DictDataLoadingRecord, FormatOptions, LoadDict } from './typings';
import { defaultFormatDictOptions } from './config';
import { format } from './format';
export class Dict<DT extends string = string> extends DictBase {
  dictTypes: DT[];
  dictMeta = {} as Record<DT, DictMeta<DT>>;
  static debug = false;
  loadDict: LoadDict<DT>;

  constructor(dictTypes: DT[], loadDict: LoadDict<DT>, options: Partial<DictBaseOptions> = {}) {
    super(options);
    this.dictTypes = dictTypes;
    this.loadDict = loadDict;
    this.init();
  }

  private _data = reactive<DictDataListRecord<DT>>({} as DictDataListRecord<DT>);

  get data() {
    return computed(() => {
      for (const key in this.dictMeta) {
        if (Object.prototype.hasOwnProperty.call(this.dictMeta, key))
          this._data[key] = this.dictMeta[key].data as any;
      }
      return this._data as DictDataListRecord<DT>;
    });
  }

  private _loading = reactive<DictDataLoadingRecord<DT>>({} as DictDataLoadingRecord<DT>);

  get loading() {
    return computed(() => {
      for (const _key in this.dictMeta) {
        const key = _key as DT;
        if (Object.prototype.hasOwnProperty.call(this.dictMeta, key))
          this._loading[`${key}_loading`] = this.dictMeta[key].loading as any;
      }
      return this._loading as DictDataLoadingRecord<DT>;
    });
  }

  init() {
    this.dictTypes.forEach((dt) => {
      this.dictMeta[dt] = new DictMeta<DT>(dt, this.loadDict, this.options);
    });
  }

  load(): void;
  load(...args: DT[]): void;
  load(...args: DT[]) {
    const loadList = args.length ? args : this.dictTypes;
    return Promise.all(loadList.map((dt) => {
      return this.dictMeta[dt]?.load();
    }));
  }

  format(dOt: DT, val: DV[], opt: { isRaw: true; labelField?: string; valueField?: string }): DictData[];
  format(dOt: DT, val: DV, opt: { isRaw: true; labelField?: string; valueField?: string }): DictData;
  format(dOt: DT, val: DV | DV[], opt?: { symbol?: string; labelField?: string; valueField?: string }): string;
  format<T extends DL = DL>(dOt: MaybeRef<T[]>, val: DV[], opt: { isRaw: true; labelField?: keyof T; valueField?: keyof T }): T [];
  format<T extends DL = DL>(dOt: MaybeRef<T[]>, val: DV, opt: { isRaw: true; labelField?: keyof T; valueField?: keyof T }): T;
  format<T extends DL = DL>(dOt: MaybeRef<T[]>, val: DV | DV[], opt?: { symbol?: string; labelField?: keyof T; valueField?: keyof T }): string;
  format<T extends DL = DL>(dOt: DT | MaybeRef<T[]>, val: DV | DV[], opt: FormatOptions<T | DL> = {}) {
    const formatResult = computed(() => {
      // // 当前需要翻译的字典数据 (如果 dictDataOrType 是 DT 则通过 this.dictMeta[dictDataOrType].data 获取)
      const dictDataList = (typeof dOt == 'string' ? unref(this.dictMeta[dOt].data) : unref(dOt)) as Array<T | DictData>;
      // // 处理参数
      const formatOptions: Required<FormatOptions> = Object.assign({ ...defaultFormatDictOptions }, opt);
      // // 把需要翻译的值处理为数据方便操作
      const values = val instanceof Array ? val : [val];
      const dictDataResult = format<T | DL>(dictDataList, values, opt);
      if (formatOptions.isRaw)
        // 如果 format(dictKey, '1', { isRaw: true }) 则返回第一项( dictDataResult[0] 而不是 dictDataResult)
        return typeof val == 'string' ? dictDataResult[0] : dictDataResult;
      return dictDataResult.map(e => e?.[formatOptions.labelField]).join(formatOptions.symbol);
    });
    return unref(formatResult);
  }
}