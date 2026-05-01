---
title: 语法与数据类型的特殊法则：JavaScript的语法与数据类型
published: 2026-01-14
description: ""
image: ""
tags: [JavaScript, interview]
category: "interview"
draft: false
hint: true
lang: "zh-CN"
author: "FATFATHAO"
---

> 1995 年的某天，一位网景工程师在十天内创造了一个将改变世界的语言。谁也没想到，这个起初只是用于网页简单交互的“玩具语言”，会演化成今天这样一个庞大的语法帝国。

# 声明的逐步完善——var, let 与 const 还有神秘的无主之地

## 草根出生的 var

在 JavaScript 帝国的早期，只有一位统治者：`var`。这位统治者慷慨而随性，它允许开发者在任何地方声明变量，但它有一个特性——不承认“块级领地”

```js
if (true) {
  var treasure = "黄金";
  // 还记得吗？在C++、Java中，我们声明的treasure宝藏应该只属于我们的if块内
}
console.log(treasure); // 但在JavaScript中，这里仍然是可以访问到treasure的！
```

好比在一个硕大的城市当中，你在某个房间(if 块)藏了一个宝藏，却发现整个城堡的居民都能够找到他。`var`会将所有声明"提升"到当前函数或全局空间的顶部，他会造成无数作用域混乱。

同时，如若我们上面直接写`treasure = "黄金"`而不加任何的授勋(即声明)，JS 引擎会认为这是一个**流浪汉**，并自动把他收编到全局帝国的户籍中(否则他就是只属于这一位统治者)(`window`或`global`下)。这在现代开发中被视为极大的隐患(因为他会污染全局的环境)

帝国的管理者们(程序员)很快发现并开始抱怨：“我的变量互相被覆盖了！”、“这个值怎么在这里被修改了！”

混乱的情况一直从 1995 年直到 2015 年，直到...

## ES6 大变革——let 与 const 的法治时代

2015 年，JavaScript 迎来了历史上最重要的变革——ECMAScript 2015(ES6)。这次改革带来了两位新的、更有纪律的统治者：`let`和`const`。

`let`(契约领主):

```js
if (true) {
  let secret = "机密文件";
  // 这个机密文件只属于当前的块级作用域
}
console.log(secret); // ReferenceError: secret未定义
// 秘密被安全的保护在块级领地内
```

`const`(誓言领主):

```js
const oath = "永恒的誓言";
oath = "改变的念头"; // TypeError: 无法对常量赋值

// 但是，const守护的只是忠诚，而非不变
const library = ["book1", "book2"];
library.push("book3"); // 允许！

const library = ["new"]; // 报错
```

> "`const`并不意味着内容不可变，它意味着“忠诚”——它永远指向最初绑定的那个地址，就像图书管理员和图书馆的关系一样：你可以改变馆内藏书（对象内容），但你不能把图书馆的招牌换到另一栋建筑上（改变引用）。"

# 变量提升——语言预编译

## var 的人口普查

JavaScript 引擎在执行代码之前，会进行一次神秘(隐式)的“人口普查”——这就是**变量提升（Hoisting)。**

```js
console.log(magic); // 输出: undefined，而不会报错！
var magic = "扑克牌魔术";

// 实际执行顺序相当于
var magic;
console.log(magic);
magic = "扑克牌魔术";
```

这就像一场魔术表演：魔术师（引擎）事先知道有哪些道具（变量），但直到正式表演时才会展示它们的具体内容。

## let 的“安检机制”

相应的，更年轻的领主们`let`和`const`也是有提升的，但是他们的提升更加的严谨。

```js
console.log(secret); // ReferenceError: 无法在初始化前访问'secret'

let secret = "国家机密";
```

这就是暂时性死区(Temporal Dead Zone, TDZ)——从作用域开始到变量声明之间的区域，变量存在但无法访问，就像一个贵宾虽然已经在宾客名单上，但必须通过安检才能进入会场。

# 数据的法则——七条法则和一个创世神

## 七个不可变的原始人"imutable"

JavaScript 的数据法则由七个原始类型构成，他们简单、纯粹、不可变：

1、Number(数字法则):

```js
// 在JS中，所有的数字都是64位浮点数
0.1 + 0.2 === 0.3; // false 这样会产生浮点数的精度问题

NaN === NaN; // false NaN是一个极其高傲的数字，他甚至不等于他自己，他是数字法则中的"无名氏"
```

2、String(文本法则)、Boolean(逻辑法则)、Undefined(未定义法则)、Null(虚空法则)

```js
typeof null; // "object"——一个从远古遗留的bug
// 这原本是 1.0 版本的 Bug，当时 JS 使用 32 位存储。
// 前三位如果是 000 则判定为 object。而 null 的全位都是 0，
// 于是它被误判为了对象。虽然之后有人提议修复，
// 但为了兼容成千上万的老网页，这个“错误的勋章”被永久保留了下来。
```

3、Symbol(唯一印记法则)与 BigInt(大整数法则)

```js
const id1 = Symbol("id");
const id2 = Symbol("id");
id1 === id2; /// false  每个Symbol都是宇宙中独一无二的

const hugeNumber = 900n + 1n; // BigInt可以安全处理更大的整数
```

## 万物之源——Object

对象是 JavaScript 的造物主，几乎一切都是它的后代

```js
// 函数是对象
function warrior() {}
warrior.skill = "剑术"; // 给函数添加属性

// 数组是对象
const array = [1, 2, 3];
array.strategy = "包围战术"; // 给数组添加属性

// 甚至原始类型也可以通过包装成为临时对象
"hello".toUpperCase(); // 字符串临时成为了String对象
```

# 字面量——世界的直观表达

## 所见即所得的魔法

字面量是 JavaScript 中最直观的表达方式，就像用母语直接描述事物

```js
const hero = {
  name: "FATFATHAO",
  weapon: "code of god",
  level: 99,
};

// 数组字面量——直接列出元素
const skills = ['JavaScript', 'React', 'Node.js'];

// 模板字符串——ES6的字符串特性
console.log(`英雄${hero.name} 使用 ${hero.weapon}
他的等级是: ${hero.level}
技能包括： ${skills.join(", ") `);
// 反引号允许换行和直接嵌入表达式
```

模板字符串结束了字符串拼接的问题，让代码如散文般流畅

# 作用域——单项透视镜的原理

## 链式作用域

作用域就像一系列嵌套的“单向透视镜房间”：

```js
const globalResource = "阳光"; // 全局资源，所有人都能获取
function outerKindom() {
  const outerSecret = "外域藏宝图";

  function innerCastle() {
    const innerSecret = "内堡密室钥匙";
    console.log(globalResource); // "阳光" - 内部可以看到外部
    console.log(outerSecret); // "外域藏宝图" - 内部可以看到外部
  }

  innerCastle();
  console.log(innerSecret); // ReferenceError 外部看不到内部

  // 引擎寻找变量时，像侦探一样沿着作用域链进行查找：
  // 1.先在当前房间进行查找
  // 2.找不到就去父房间
  // 3.直到全局房间
  // 4.如果都找不到，报错
}
```

从 1995 年的混乱草莽，到 2015 年的现代法治，JavaScript 走过了漫长的道路。var 的随意性被 let 和 const 的纪律取代，混乱的作用域被清晰的块级领地规范，字符串拼接的繁琐被模板字符串的优雅解决。

然而，这个故事还没有结束。TypeScript 的静态类型检查、Deno 的新运行时、WebAssembly 的跨界能力……JavaScript 帝国仍在进化。

但无论未来如何，理解这些基础——声明、提升、类型、作用域——就像理解帝国的基本法。它们构成了 JavaScript 世界的底层秩序，在这秩序之上，我们构建着数字时代的万千应用。

接下来我们将介绍：在 JS 帝国中，当每个公民(数据)在面对`if`的审查时，都被标记为“真”或“假”的面具。而这些公民里面，有一个神秘的六人组 Falsy 他们无论如何都是假的，而对于其他公民来说，他们永远都是真的。如果觉得神秘的话，请看下一章
