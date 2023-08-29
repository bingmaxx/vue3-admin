import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { viteMockServe } from 'vite-plugin-mock'

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd());
  return {
    plugins: [
      vue(),
      viteMockServe({
        mockPath: 'mock',
        enable: env.VITE_MOCK === 'true' ? true : false,
      }),
    ],

    server: {
      port: 1234,
      proxy: {
        '/common': {
          target: env.VITE_BASE_PATH,
          changeOrigin: true
        },
      }
    },

    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },

    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "./src/styles/variables.scss";@import "./src/styles/mixin.scss";'
        }
      }
    }
  }
})
