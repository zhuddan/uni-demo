import type { DictBaseOptions, FormatOptions } from './typings';

export const defaultRuoyiDictsOptions: DictBaseOptions = {
  labelFields: ['label', 'dictLabel', 'name', 'title'],
  valueFields: ['value', 'dictValue', 'code', 'key'],
  isLazy: false,
};
export const defaultFormatDictOptions: Required<FormatOptions> = {
  symbol: '/',
  isRaw: false,
  valueField: 'value',
  labelField: 'label',
};