import type { DictBaseOptions, OriginDictData } from './typings';
import { defaultRuoyiDictsOptions } from './config';

export class DictBase {
  options: DictBaseOptions;

  get labelFields() {
    return this.options.labelFields;
  }

  get valueFields() {
    return this.options.valueFields;
  }

  getField(dict: Partial<OriginDictData>, ...fields: Array<keyof OriginDictData>) {
    const res = fields.find(f => Object.prototype.hasOwnProperty.call(dict, f)) as keyof OriginDictData;
    if (!res)
      console.warn(`[Dict get field error]: Object cannot find key \`${fields.join(',')}\` in `, dict);

    return res;
  }

  constructor(options: Partial<DictBaseOptions> = {}) {
    this.options = Object.assign({ ...defaultRuoyiDictsOptions }, options);
  }
}