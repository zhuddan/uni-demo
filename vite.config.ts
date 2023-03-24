import type { UserConfig } from 'vite';
import { defineConfig, loadEnv } from 'vite';
import uni from '@dcloudio/vite-plugin-uni';

// import { name, title, version } from './package.json';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_');
  const config: UserConfig = {
    plugins: [uni()],
    server: {
      port: Number(env.VITE_APP_PORT),
    },
    define: {
      __APP_API_URL__: `"${env.VITE_APP_API_URL}"`,
      __APP_MODE__: `"${mode}"`,
      __DEV__: mode == 'development',
      __PROD__: mode == 'production',
    },
  };
  return config;
});
