# vue3-admin

> Vue3 admin, use TypeScript, Vite4, VueRouter4, Pinia2.

## 本机环境
```sh
$ node -v
v18.16.0

$ npm -v
9.5.1
```

## 命令行
```sh
npm install

# Compile and Hot-Reload for Development
npm run dev

# Type-Check, Compile and Minify for Production
npm run build

# Run Unit Tests with [Vitest](https://vitest.dev/)
npm run test:unit

# Lint with [ESLint](https://eslint.org/)
npm run lint
```

## 安装 sass 并全局引用
安装 sass 包，参考 [CSS 预处理器 - Vite](https://cn.vitejs.dev/guide/features.html#css-pre-processors)。项目中全局 scss 文件放在 `@/styles` 目录
```sh
npm --registry https://registry.npm.taobao.org i -D sass
```

vite 配置文件 vite.config.ts 中添加如下配置：
```ts
export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "./src/styles/variables.scss";@import "./src/styles/mixin.scss";'
      }
    }
  }
})
```

## axios

```sh
npm i axios
```

之后在 `utils/request.ts` 文件下封装 axios 请求。具体接口见 `api` 目录。

## 开发服务器设置
[vite - 开发服务器选项](https://cn.vitejs.dev/config/server-options.html#server-host)

首先是为开发服务器配置自定义代理，vite 配置文件 vite.config.ts 中添加如下配置：
```ts
export default defineConfig({
  server: {
    port: 1234,
    proxy: {
      '/common': {
        target: 'xxx',
        changeOrigin: true
      },
    }
  },
})
```

## 使用 Mock
基于 [vite-plugin-mock](https://github.com/vbenjs/vite-plugin-mock) 实现，细节见文档。
```sh
npm i mockjs -S
npm i vite-plugin-mock -D
```

vite 配置文件 vite.config.ts 中添加如下配置：

```ts
import { viteMockServe } from 'vite-plugin-mock'
export default defineConfig({
  plugins: [
    vue(),
    viteMockServe({
      mockPath: 'mock',
      enable: true,
    }),
  ],
}
```

之后在 `mock` 目录中添加测试接口。


## vite 使用环境变量
[vite - 环境变量和模式](https://cn.vitejs.dev/guide/env-and-mode.html)

可以通过 `import.meta.env` 使用定义在 `.env`、`.env.[mode]` 文件中的环境变量，有两个限制，一是除了内建变量（MODE、BASE_URL、PROD、DEV、SSR）只能获取 `VITE` 开头的环境变量；二是 import.meta.env 只能在业务代码中获取环境变量，在 vite.config.js 中需要按照如下方式获取环境变量：
```ts
import { defineConfig, loadEnv } from 'vite'
// 从默认的对象方式变成函数配置方式
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd());
  const VITE_BASE_PATH = env.VITE_BASE_PATH;
  return {
    plugins: [
      vue(),
    ],}
})
```

## 按需引入 ant-design-vue

npm 安装 ant-design-vue 与 unplugin-vue-components：
```sh
npm i ant-design-vue --save 
npm i unplugin-vue-components -D
```

vite.config.ts 文件中添加如下配置：
```ts
export default defineConfig(({ command, mode }) => {
  return {
    plugins: [
      // ...
      Components({
        resolvers: [
          AntDesignVueResolver({
            importStyle: false,
          }),
        ],
      }),
    ],
  }
})
```

首次引用 ant-design-vue 组件后会在项目根目录自动添加 components.d.ts 文件。文件内容如下：
```ts
export {}

declare module 'vue' {
  export interface GlobalComponents {
    AButton: typeof import('ant-design-vue/es')['Button']
    // ...
  }
}
```

