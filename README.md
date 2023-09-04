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

之后在 `utils/request.ts` 文件下封装 axios 请求。具体接口见 `@/api` 目录。

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
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
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

## 加载 svg 图标
在 vite 中有多个插件可以加载 svg
- [vite-plugin-svg-spritemap](https://github.com/g-makarov/vite-plugin-svg-spritemap) 将多个 svg 文件生成 svg 精灵图
- [vite-plugin-svg-icons](https://github.com/vbenjs/vite-plugin-svg-icons) 生成 svg 精灵图
- [vite-svg-loader](https://github.com/jpkleemans/vite-svg-loader) 将 svg 文件作为 Vue 组件加载（打包后每个 svg 是一个 js 文件）

svg 可以每个单独加载，也可以合成一个精灵图一次加载，在本项目中，主要是路由菜单部分用到 svg 文件，因此将多个 svg 文件合成一个精灵图更适合，当前使用 `vite-plugin-svg-spritemap`：

```sh
npm i vite-plugin-svg-spritemap -D
```

vite.config.ts 文件中添加如下配置：
```ts
import { svgSpritemap } from 'vite-plugin-svg-spritemap'
export default defineConfig(({ command, mode }) => {
  return {
    plugins: [
      // ...
      svgSpritemap({
        pattern: './src/assets/iconsvg/*.svg',
      }),
    ],
  }
})
```

svg 文件目录为 `@/assets/iconsvg`，svg 规范可参考 [iconfont - 图标制作说明](https://www.iconfont.cn/icons/upload?spm=a313x.manage_type_myprojects.i3.d059fa781.71a83a81OQd7ZE) 闭合/少节点/合并/轮廓化…… svg 文件的 `fill` 需要清空或者为 ``。

在 `@/components/svg` 目录封装 `IconSvg` 组件，具体见组件代码。全局样式文件 `@/styles/main.scss` 中设置 `.icon-svg` 默认样式：
```scss
// 全局 svg 组件样式
.icon-svg {
  width: 16px;
  height: 16px;
  fill: currentColor;
}
```
之后便可使用 IconSvg 组件，传入 svg 文件名即可：
```vue
<IconSvg name=""></IconSvg>
```

执行 `npm run build` 命令后，dist 目录下将生成 `spritemap.svg` 文件，此为 svg 文件生成的精灵图。

