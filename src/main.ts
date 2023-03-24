import { createSSRApp } from 'vue';
import App from './App.vue';
import { installStore } from './store';
export function createApp() {
  const app = createSSRApp(App);
  const { Pinia } = installStore(app);
  return {
    app,
    Pinia,
  };
}
