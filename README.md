# vue3-admin

> Vue3 admin, use TypeScript, Vite4, VueRouter4, Pinia2.

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
安装 sass 包，参考 [CSS 预处理器 - Vite](https://cn.vitejs.dev/guide/features.html#css-pre-processors)
```sh
npm --registry https://registry.npm.taobao.org install -D sass
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

