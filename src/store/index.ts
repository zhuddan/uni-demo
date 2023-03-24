import { createPinia } from 'pinia';
import * as Pinia from 'pinia';
import type { App } from 'vue';

export const pinia = createPinia();

export function installStore(app: App) {
  app.use(pinia);
  return {
    Pinia,
  };
}
