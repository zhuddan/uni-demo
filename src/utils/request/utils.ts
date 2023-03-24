/**
 * @param baseUrl url
 * @param params
 * @returns {string}
 */
export function setParams(baseUrl: string, params: Recordable): string {
  let parameters = '';
  for (const key in params)
    parameters += `${key}=${encodeURIComponent(params[key])}&`;

  parameters = parameters.replace(/&$/, '');
  return /\?$/.test(baseUrl) ? baseUrl + parameters : baseUrl.replace(/\/?$/, '?') + parameters;
}

export function joinTimestamp<T extends boolean>(join: boolean, restful: T): T extends true ? string : object;

export function joinTimestamp(join: boolean, restful = false): string | object {
  if (!join)
    return restful ? '' : {};

  const now = Date.now();
  if (restful)
    return `?_t=${now}`;

  return { _t: now };
}