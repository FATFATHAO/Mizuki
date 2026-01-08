---
title: interview-todolist-winter-holiday
published: 2026-01-09
description: "寒假面试复习清单"
image: ""
tags: [interview]
category: "interview"
draft: false
lang: "zh-CN"
author: "FATFATHAO"
---

# 寒假面试复习清单

## 第一阶段

### 两个星期，完成 80%的八股文和基础原理题

- JavaScript/TypeScript 核心（重中之重）
  - 闭包与作用链（手写防抖、节流）
  - 原型与继承
  - 异步编程: Promise 原理（尝试手写 Promise）、async/await、Event Loop（宏任务/微任务执行顺序）在事件循环中最好能画出 Node.js 和浏览器中的差异
  - ES6+新特性:重点理解 let/const（块级作用域、暂时性死区）、箭头函数(this 绑定规则等)、模块化（ESM vs CommonJS)
  - 内存与垃圾回收(JS+浏览器)：
    - 栈/堆的区别
    - 常见内存泄露环境
      - 闭包
      - 未清理的定时器
      - 事件监听未移除
  - Chrome DevTools 的 Memory 面板(Heap Snapshot)
- CSS 布局： Flexbox、Grid、BFC 原理，移动端适配
- 浏览器原理：从输入 URL 到页面渲染全过程、回流与重绘、跨域解决方案、缓存机制（HTTP Cache）

## 第二阶段

### 不仅会 React，还会为什么

- React 核心原理：Virtual DOM, Diff 算法，Fiber 架构（简述原理）
  - Fiber：准备一句精炼的解释，如：“Fiber 是 React 16 引入的新的协调引擎，它将渲染工作拆解为可中断、可恢复的单元（Fiber 节点），为实现并发更新（Concurrent Mode）和优先级调度打下基础。”
  - Hooks 依赖陷阱：为 useEffect、useMemo、useCallback 准备一个“因依赖数组设置不正确导致无限循环或陈旧闭包”的真实案例。
- Hooks 深入：useEffect 的陷阱，useMemo/useCallback 的优化场景，自定义 Hooks 的封装
- 状态管理：对比 Redux(Toolkit)/Zustand/Jotai 的区别，理解 Flux 思想
- React 18 新特性：Concurrent Mode, Automatic Batching, Suspense
- 受控/非受控组件
  - 表单场景必问
  - 与性能、可维护性强相关
- key 的真正作用

- React 的性能优化系统总结
  - 减少不必要的渲染(memo/useCallback)
  - 拆分组件、缩小更新范围
  - 懒加载(React.lazy + Suspense)

## 第三阶段

### 让项目经历的起拷问，并通过算法笔试

- 项目复盘：拿着修改好的简历，针对每一个亮点准备可能被问到的问题(比如：你说性能提升了 20%，具体你是怎么测试出来的呢，利用了 Chrome DevTools 里面的哪个面板呢？)
- 算法题：每天 2-3 道 LeetCode,重点刷《剑指 Offer》和前端高频题（数组、链表、树的遍历、动态规划简单题）

## 补充的点

第一阶段

- 计算机网络(HTTP/HTTPS)
  浏览器和网络一般是很重要但容易忽略的部分

  - HTTP 状态码(200,301,302,304,403,404,500 等)
  - HTTP/2、HTTP/3：了解核心特性(多路复用、头部压缩、QUIC 协议)，面试常问“和 HTTP/1.1 的区别”
  - HTTPS：理解非对称加密交换密钥、对称加密通信内容的核心思想，能说出 RSA 和 ECDHE 的大致区别
  - HTTP 缓存（强缓存 Cache-Controlvs 协商缓存 ETag/Last-Modified)
  - HTTPS 握手过程（大概讲清楚）
  - 跨域(CORS 原理，预检请求)

- TypeScript 进阶
  八股文一般专门有 ts 相关的内容

  - type 和 interface 的区别
  - 泛型的基本使用
  - 常用工具类型：Partial, Pick, Omit, Record（面试常考手写或解释原理）

- 手撕代码题
  - 手写 Promise(核心状态流转)
  - 手写 call/apply/bind
  - 手写 new 操作符
  - 手写防抖、节流
  - 手写深拷贝（考虑循环引用）
  - 实现一个简单的 Promise.all、Promise.race。

第二阶段

工程化与构建工具: React 面试可能会问“这个项目是用 webpack 还是 vite 打包的？知道他们两个的区别吗？”，所以必看：

- Webpack: Loader vs Plugin 的区别、打包流程简述、HMR(热更新)原理;
- Vite：为什么比 Webpack 要快（ESBuild+原生 ESM）

以及实验室当中的开发环境区分：dev/test/prod
构建产物的优化:

- 代码分割
- gzip/brotli
- CDN

第三阶段

1. 针对“实验室项目”的深挖策略
    因为别人看不到代码，叙述逻辑必须比开源项目更严密。针对实验室项目，准备以下 3 类问题的答案：

        A 类：性能优化的证据
            *提问*：“你说性能提升了 20%，你是怎么测的？”
            *你的回答策略*：
                “我是用 Chrome DevTools 的 Performance 面板 / Lighthouse 打分的。”
                “优化前 First Contentful Paint (FCP) 是 2.5s，优化后是 1.8s。”
                具体手段：“用了 React.memo 减少重渲染，用了 CDN 加速静态资源，用了懒加载。”

        B 类：难点与坑（实验室项目通常有很多坑）
            *提问*：“项目中遇到最难的一个 Bug 是什么？”
            *你的回答策略*：
                描述一个具体的技术问题（例如：IE 兼容性问题、复杂表单的数据联动错误、跨域图片上传失败）；
                你的排查过程（怎么查 Log、怎么断点、怎么搜 StackOverflow）；
                最终解决结果。

        C 类：团队协作
            *提问*：“多人协作怎么解决冲突？”
            *你的回答策略*：
                Git Flow 分支管理；
                代码规范（ESLint + Prettier）；
                Code Review 习惯。

    - 提到任何优化，必须绑定数据（如 Lighthouse 分数、FCP/LCP 时间）和工具（Chrome DevTools 的 Performance、Network、Memory 面板）
    - “STAR”法则：描述项目难点时，用情境(Situation)、任务(Task)、行动(Action)、结果(Result)的结构来组织语言，显得逻辑清晰。

1. 算法题的微调
    核心重点：数组（去重、扁平、排序）、树（前中后序遍历递归/非递归）、栈与队列（括号匹配）、简单 DP（爬楼梯）、“链表”（反转、环检测、合并）和 “字符串”（反转、最长公共前缀、KMP 等）。
    资料：《剑指 Offer》是必刷的，有很多前端爱考的题目（比如重建二叉树）。

1. 在面试前 1-2 周，增加 “第四阶段：输出与模拟”。

    - 自我讲述：对着镜子或录音，完整复述“从输入 URL 到页面渲染”等复杂流程。检查是否流畅、有条理。
    - 模拟面试：找同学/朋友进行技术模拟面试，或使用在线模拟面试平台。重点锻炼把技术问题讲清楚的能力。
    - 简历打磨：确保简历上的每个技术栈、每个项目亮点，都经得起清单里提到的深度拷问。

1. 每个知识点一定要完成三个事：1.写一句 30s 能说完的解释 2.画一张流程图 3.手写一道输出题
