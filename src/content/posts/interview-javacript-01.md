---
title: JavaScript的前世今生——Js学习笔记01
published: 2026-01-10
description: ""
image: ""
tags: [JavaScript, interview]
category: "JavaScript, interview"
draft: true
lang: "zh-CN"
author: "FATFATHAO"
---

# JavaScript 的前世今生

JavaScript 是 Web 核心三大件的之一，HTML,CSS,JS，三兄弟令人耳熟能详。它由 Brendan Eich 于 1995 年所创建，是世界上 98.9%的网站由 JavaScript 来实现客户端网页行为。

## JavaScript 的诞生

由于 JavaScript 是 Web 三大件的之一，所以要讲述他的起源，我们得回到浏览 Web 最重要的东西——浏览器。

### 浏览器

世界上第一个流行的图形用户界面网络浏览器 Mosaic，于 1993 年发布，后来它的主要开发者们成立了 Netscape 公司（后被收购，收购前创立了 Mozilla 组织，后被 AOL 限制对 Mozilla 的参与，AOL 成立了 Mozilla，Mozilla 所维护创立的也就是现如今最流行的浏览器之一————FireFox)。在互联网发展的早期阶段，网页只能是静态的，在浏览器加载后无法实现动态行为。蓬勃发展的网页开发领域渴望打破这一限制，因此在 1995 年，网景公司决定在他们 1994 年推行的更完善的浏览器 Mosaic Navigator 浏览器中添加编程语言。他们采取了两种途径来实现这一个目标：一个是与 Sun Microsystems 合作嵌入 Java 语言，二是聘请 Brendan Eich 嵌入 Scheme 语言。

他们的目标是开发一种“面向大众的语言”，“帮助非程序员创建动态的交互式网站”。NetScape 管理层决定，最佳的方案是由 Eich 设计一种新的语言，其语法类似于 Java，而与 Scheme 或其他现有的脚本语言的相似程度较低。在 1995 年 9 月 Mosaic Navigator 测试版中，这种新语言和解释器被命名为 LiveScript，但在 12 月的正式版中，他被重新命名为 JavaScript。

### JavaScript 和 ES

JavaScript 这个名字的选择造成了混淆，让人误以为它与 Java 直接相关。当时， 互联网泡沫正处于兴起阶段，Java 是一种流行的新兴语言，因此 Eich 认为 JavaScript 这个名字是 Netscape 的一种营销策略。

而微软于 1995 年推出了 Internet Explorer ，引发了与 Netscape 的浏览器大战 。在 JavaScript 方面，微软创建了自己的解释器， 称为 JScript 。

微软于 1996 年首次发布 JScript，同时还推出了对 CSS 的初步支持以及 HTML 扩展。这些实现方式与 Netscape Navigator 中的对应版本明显不同。 这些差异使得开发者难以保证网站在两种浏览器中都能良好运行，导致“在 Netscape 中浏览效果最佳”和“在 Internet Explorer 中浏览效果最佳”的标识在之后的几年里被广泛使用。

1996 年 11 月， 网景公司向 ECMA 国际组织提交了 JavaScript，作为所有浏览器厂商都能遵循的标准规范的起点。这促成了 1997 年 6 月首个 ECMAScript (即大名鼎鼎的 ES)语言规范的正式发布。然而，微软在浏览器市场日益占据主导地位，阻碍了 JavaScript 语言的全面标准化进程。到 21 世纪初， Internet Explorer 的市场份额达到了 95%。这意味着 JScript 成为了 Web 客户端脚本的实际标准。

### 转折与标准化

在 2000 年代初期 Internet Explorer 占据主导地位的时期，客户端脚本技术停滞不前。这种情况在 2004 年开始发生变化，当时 Netscape 的继任者 Mozilla 发布了 Firefox 浏览器。Firefox 广受欢迎，从 Internet Explorer 手中夺取了相当大的市场份额。2005 年，Mozilla 加入 ECMA 国际组织，并开始着手制定 ECMAScript for XML (E4X)标准。这促使 Mozilla 与 Macromedia （后被 Adobe Systems 收购）展开合作，后者在其基于 ECMAScript 4 草案的 ActionScript 3 语言中实现了 E4X 标准。双方的目标是将 ActionScript 3 标准化为新的 ECMAScript 4。为此，Adobe Systems 将 Tamarin 实现作为开源项目发布。然而，Tamarin 和 ActionScript 3 与现有的客户端脚本语言差异过大，且由于缺乏微软的合作，ECMAScript 4 最终未能实现。

与此同时，与 ECMA 工作无关的开源社区也取得了非常重要的进展。2005 年，杰西·詹姆斯·加勒特（Jesse James Garrett） 发表了一篇白皮书，他在文中创造了 `“Ajax”` 一词，并描述了一系列以 JavaScript 为核心的技术，用于创建可以在后台加载数据的 Web 应用程序，从而避免页面完全重新加载。这引发了 JavaScript 的复兴，而开源库及其周围形成的社区正是这场复兴的先锋。许多新的库应运而生，包括 jQuery 、 Prototype 、 Dojo Toolkit 和 MooTools 。

谷歌于 2008 年推出了 Chrome 浏览器，其搭载的 V8 JavaScript 引擎速度比竞争对手更快。其关键创新在于即时编译 (JIT)， 因此其他浏览器厂商需要对其引擎进行全面改造以支持 JIT。2008 年 7 月，这些分散的各方齐聚奥斯陆召开会议。会议最终促成了 2009 年初达成的协议，即整合所有相关工作，共同推进该语言的发展。最终成果便是 ECMAScript 5 标准，该标准于 2009 年 12 月发布。

### 达到成熟期

对该语言的雄心勃勃的研究持续了数年，最终在 2015 年 ECMAScript 6 的发布中，大量新增内容和改进内容被正式化。2009 年 Ryan Dahl 创建 Node.js 后，JavaScript 在 Web 浏览器之外的使用量显著增长。Node 结合了 V8 引擎、 事件循环和 I/O API ，从而提供了一个独立的 JavaScript 运行时系统。截至 2018 年，Node 已被数百万开发者使用，而 npm 是世界上模块数量最多的包管理器 。

当前的 JavaScript 生态系统拥有众多库和框架 、成熟的编程实践，以及在 Web 浏览器之外的大量 JavaScript 应用。此外，随着单页应用程序和其他大量使用 JavaScript 的网站的兴起，已经创建了多种转译器来辅助开发过程。

最初的 JavaScript 引擎仅仅是源代码的解释器 ，但所有相关的现代引擎都使用即时编译 (JIT) 来提升性能。JavaScript 引擎通常由 Web 浏览器厂商开发，每个主流浏览器都拥有自己的引擎。在浏览器中，JavaScript 引擎通过文档对象模型 (DOM) 和 Web IDL 绑定与渲染引擎协同运行。然而，JavaScript 引擎的使用并不局限于浏览器；例如， V8 引擎是 Node.js 运行时系统的核心组件。它们也被称为 ECMAScript 引擎，这是该规范的正式名称。随着 WebAssembly 的出现，一些引擎还可以在与常规 JavaScript 代码相同的沙箱中执行这些代码。
