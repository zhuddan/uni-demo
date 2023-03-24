export interface _OriginDictData {
  // value
  id: string;
  dictCode: number;
  dictValue: string;
  // label
  dictLabel: string;
  // name
  dictType: string;
  // other
  cssClass: string;
  listClass: string;
  isDefault: string;
  status: string;
  default: boolean;

  // other label
  title: string;
  name: string;
  label: string;
  // other value
  value: string | number;
  code: string | number;
  key: string | number;

}
export type OriginDictData = Partial<_OriginDictData>;

export type DictKeys = Array<keyof _OriginDictData>;

export interface DictData {
  value: string;
  label: string;
  raw: Partial<_OriginDictData>;
}

export type DictDataLike = Record<string, any>;

export type DictDataListRecord<T extends string> = Record<T, DictData[]>;

export type DictDataLoadingRecord<T extends string> = Record<`${T}_loading`, boolean>;

export type DictValue = string | number;

export type LoadDict <DT extends string = string> = (dictType: DT) => Promise<OriginDictData[]>;

export interface DictBaseOptions {
  labelFields: DictKeys;
  valueFields: DictKeys;
  isLazy: boolean;
}

export interface FormatOptions<T extends DictDataLike = DictDataLike> {
  symbol?: string;
  isRaw?: boolean;
  labelField?: keyof T;
  valueField?: keyof T;
}