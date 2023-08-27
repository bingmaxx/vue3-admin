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



