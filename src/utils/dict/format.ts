export type formatData = Record<string, any>;

import { defaultFormatDictOptions } from './config';
import type { FormatOptions } from './typings';
export function format<T extends formatData = formatData>(
  data: T[],
  value: Arrayable<any>,
  options?: FormatOptions<T>,
): Array<Nullable<T>> {
  const formatOptions: Required<FormatOptions> = Object.assign({ ...defaultFormatDictOptions }, options);
  const values = value instanceof Array ? value : [value];
  const legalValues = data.map(e => `"${e?.[formatOptions.valueField]}"`).join(',');
  const result = values.map((e) => {
    const resultItem = data.find(item => item?.[formatOptions.valueField] == e) || null;
    if (resultItem == null && legalValues.length)
      console.warn(`[Dict.format] The legal value expected by the custom dictionary ${JSON.stringify(data)} are: ${legalValues},  but got "${e}".`);
    return resultItem;
  });

  return result;
}
