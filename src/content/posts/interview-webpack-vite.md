---
title: webpack和vite的区别
published: 2025-12-19
description: ""
image: ""
tags: [webpack, vite, interview]
category: "interview"
draft: false
lang: "zh-CN"
author: "FATFATHAO"
---

# Webpack 和 Vite 的区别

## 一、Webpack

webpack 的五大概念

- 入口
- 输出
- 解析器
- 插件
- 模式

### 1. Webpack 的作用

- 模块打包：可以将不同模块的文件打包整合在一起，并保证他们之间的引用正确，执行有序
- 编译兼容：通过 webpack 的 loader 机制，可以编译转换诸如.less .vue .jsx 这类在浏览器中无法识别的文件
- 能力扩展：通过 webpack 的 plugin 机制，可以进一步实现诸如按需加载，代码压缩等功能

### 2. loader 是什么

能够让 webpack 去处理那些非 js 的文件，webpack 自身只能理解 js, json
可以是同步的也可以是异步的，支持链式调用，链中的每个 loader 会处理之前已处理过的资源

- 在 webpack 的配置中，loader 有两个属性：
  - test: 识别出哪些文件会被转换
  - use: 定义在进行转换时，应该使用哪个 loader

**链式调用**
配置多个 loader 的时候，从右到左/从上到下执行

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
    ],
  },
};
```

**有哪些常见的 loader**
babel-loader: 使用 Babel 加载 ES2015+代码并将其转换成 ES5
ts-loader:将 Typescript 转换成 JavaScript
sass-loader: 将 SCSS/SASS 代码转换成 css
style-loader: 将模块导出的内容作为样式添加到 DOM 中
css-loader: 加载 CSS 文件并解析 import 的 css 文件
less-loader: 将 Less 编译为 CSS
node-loader: 处理 Node.js 插件
source-map-loader: 加载额外的 Source Map 文件，以便用于断点调试

**Plugin 是什么**
打包优化，资源管理，注入环境变量。plugin 会运行在 webpack 的不同阶段，贯穿整个编译周期，目的在于解决 loader 无法实现的其他事
常见的 plugin
clean-webpack-plugin: 用于在打包前清理上一次项目生成的 bundle 文件
mini-css-extract-plugin: 分离样式文件，CSS 提取为独立文件
webpack-bundle-analyzer: 可视化 Webpack 输出文件的体积
speed-measure-webpack-plugin: 可以看到每个 Loader 和 Plugin 执行耗时
optimize-css-assets-webpack-plugin: 压缩 css 文件
css-minimizer-webpack-plugin: 压缩 css 文件
uglifyjs-webpack-plugin:压缩 js 文件
compression-webpack-plugin:启动 gzip 压缩
html-webpack-plugin: 自动生成一个 html 文件，并且引用 bundle.js 文件
terser-webpack-plugin: 可以压缩和去重 js 代码

**Loader 和 Plugin 的区别**

1. loader 运行在整个打包文件之前，而 plugins 在整个编译周期都起到作用
2. loader 在 module.rules 中配置，类型为数组，每一项都是 Object，包含了 test、use 等属性，而 Plugin 在 Plugins 中单独配置，类型为数组，每一项是一个 Plugin 示例，参数都通过构造函数传入
3. 在 Webpack 运行的生命周期中会广播出许多时间，Plugin 可以监听这些事件，在合适的时机通过 Webpack 提供的 API 改变输出结果而对于 loader，实质是一个转换器，将 A 文件进行编译形成 B 文件，操作的是文件，比如将 A.scss 转变为 B.css，只是单独的文件转换过程

**Webpack 的热更新原理**
