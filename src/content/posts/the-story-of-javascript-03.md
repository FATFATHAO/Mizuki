---
title: 帝国的交通规则与应急预案：从分岔路口到防线建设
published: 2026-01-18
description: ""
image: ""
tags: [JavaScript, interview]
category: "interview"
draft: false
hint: true
lang: "zh-CN"
author: "FATFATHAO"
---

> 在一个拥有数百万行代码的 JavaScript 帝国中，变量和数据只是静止的资源，要让帝国真正的运转起来，我们需要一套完整的交通规则和应急预案——决定执行方向的控制流，以及处理灾难的错误处理机制。

# 流动的帝国

想象一下，我们的 JavaScript 如果有一套高速公路系统。其中，变量是车辆，数据类型是货物，但如果没有交通规则，这一切就会陷入混乱。本章，我们将来探讨帝国高速公路的两种核心秩序：控制流(决定往哪里走)和错误处理(出事了怎么办)

# 抉择的十字路口——控制流

## if...else——最古老的守卫

在 JavaScript 帝国的每个十字路口，都站着一位古老的守卫：`if...else`,他根据一个简单的原则工作：检查面具的真伪(还记得我们上一章讲的吗？面具即 true 和 false)

```js
let traveler = "jiangsu";

// 守卫检查面具
if (traveler === "jiangsu") {
  console.log("欢迎，请通过VIP通道");
} else {
  console.log("请通过普通通道");
}
```

但是 JavaScript 的守卫有个特点：它不只看布尔值，而是看任何值的“真值性”

真值(Truthy)与假值(Falsy): 六个不一样的人。

| 假面(Falsy) | 描述       |
| ----------- | ---------- |
| false       | 谎言之源   |
| 0, -0, 0n   | 虚无数字   |
| ""          | 空洞的言语 |
| null        | 故弄玄虚   |
| undefined   | 意外的缺失 |
| NaN         | 逻辑的崩坏 |

```js
// 虚假六人组
false; // 虚假使者首领（看到他就一定知道这是假的）
0 - // 等同于false
  0; // 等同于false
(""); // 空言等同于false
null; // 空言等同于false
undefined; // 未定义假面
NaN; // 非数字的假面

// 任何不在这六人之列的，都是真值(Truthy)
if ("hello")
if ([])
if ({})
if (function(){})
```

> 与 C++的守卫不同，C++的守卫只认布尔值，JavaScript 的守卫更懂得“察言观色”。它知道一个非空字符串、一个空数组甚至一个空对象都代表“存在”，而其他几个才是真正的虚无。

而面对一个简单的`if...else`，我们有三元运算符来简化：

```js
let accessLevel;
if (user.isVIP) {
  accessLevel = "gold";
} else {
  accessLevel = "silver";
}

let accessLevel === user.isVIP ? "gold" : "silver";
```

## switch——宏伟的中央调度

当分支太多的时候，`if...else`守卫就会显得力不从心，这个时候，我们就需要`switch`调度站：

```js
let trainTicket = "G102"; // 火车票

switch (trainTicket) {
  case "G101":
    console.log("前往北京");
    break;
  case "G102":
    console.log("前往上海");
    break;
  case "G103":
    console.log("前往广州");
    break;

  default:
    console.log("请前往服务台进行咨询");
}
```

> [!WARNING] `break`语句的目的就是防止“轨道追尾”(Fall-through)的关键。没有它，火车会沿着轨道一直滑行下去：

```js
let score = 85;
let grade;

// 在JS中，switch(true)允许我们在case中编写复杂的逻辑表达式，而不仅仅是匹配固定值
switch (true) {
  case score >= 90:
    grade = "A";
    break;
  case score >= 80:
    grade = "B";
  case score >= 70:
    grade = "C";

  default:
    grade = "D";

    console.log(`成绩等级: ${grade}`); // D 一直执行到了最下面！
}
```

> 在 C++中，switch 只能使用整型或枚举类型，而 JavaScript 的 switch 可以匹配任何数据类型，包括字符串、对象引用等。这种灵活性让 JavaScript 的调度站更加通用，但也需要开发者更加小心类型适配。

# 错误处理的防线建设

## throw——主动拉响警报

我们的帝国交通规划师不仅选择了正确的工具规划正确的道路，还要遇见可能发生的错误。当程序发现不可继续的情况时，应该主动拉响警报：

```js
function processPayment(amount) {
  if (amount <= 0) {
    // 抛出错误，而不是默默失败
    throw new Error("支付金额必须大于0");
  }
  // 正常处理支付
  console.log(`成功支付${amount}元`);
}

try {
  processPayment(-100); // 触发警报
} catch (error) {
  console.log("支付失败", error.message); // 支付金额必须大于0
}
```

记得飞机上面记录飞行异常数据的黑匣子吗？每一个错误的对象就相当于一个黑匣子

```js
try {
  // 几种常见的系统错误
  undefinedFunction(); // ReferenceError: 找不到这个函数
  null.someProperty; // TypeError: 不能读取null的属性
  JSON.parse("{invalid}"); // SyntaxError: JSON解析错误
} catch (error) {
  console.log(`错误类型: ${error.name}`);
  console.log(`错误信息: ${error.message`);
  console.log(`调用栈: ${error.stack}`);
}
```

## 帝国交通的三道安全网: try...catch...finally

上面我们已经初步见识到了这个体系的冰山一角，至于在我们的交通轨道体系当中，需要有安全网来拦截错误，不然，错误就像一个气球，如果你在当前的函数不`catch`它，他就会向上传递传给调用者。
如果在过程当中一直没有人拦截这个气球，它最终会到达帝国的顶端（全局作用域），导致整个脚本进程“宕机”。这就是为什么我们需要在关键的节点布置“安全网”

```js
function riskyOperation() {
  console.log("开始执行高风险操作...");

  // 模拟一个随机错误
  if (Math.random() > 0.5) {
    throw new Error("随机故障发生");
  }

  return "操作成功";
}

function safeExecutor() {
  let result;
  let resourceAcquired = false;

  try {
    // 第一步：尝试获取资源
    console.log("尝试获取数据库链接...");
    resourceAcquired = true; // 模拟获取成功

    // 第二步：执行可能失败的操作
    result = riskyOperation();

    console.log("操作完成，准备提交食物...");
  } catch (error) {
    // 第三步：捕获并处理错误
    console.log(`捕获到错误：${error.message}`);
    console.log(`正在回滚食物...`);
    result = "操作失败，已回滚";
  } finally {
    // 无论如何都要进行的操作
    if (resourceAcquired) {
      console.log("释放数据库连接");
      // 这里确保相关的资源被释放，无论操作成功与否
    }
    console.log("清理完成");
  }

  // 多次执行，观察不同的结果
  for (let i = 0; i < 3; i++) {
    console.log(`\n--- 第${i + 1}次执行 ---`);
    console.log("最终结果:", safeExecutor());
  }

  return result;
}
```

> `finally` 是程序的契约精神：不管世界是否毁灭，我承诺关掉灯、关上门、释放掉占用的资源。它是可靠系统的最后一道防线，是程序员对自己代码的责任体现。在 C++中，我们习惯使用 RAII 和析构函数来自动清理资源。而在 JavaScript 中，由于存在垃圾回收机制(GC)，我们无法预测对象什么时候被销毁。所以，我们就要使用 finally 来进行手动的资源释放（如关闭文件句柄，取消加载状态等）

## 更加现代的错误处理 Promise 与 async/await 的错误处理

在异步编程时代，错误处理有了新的形式：

```js
async function fetchUserData(userId) {
  try {
    const response = await fetch(`/api/users/${userId}`);

    if (!response.ok) {
      // HTTP错误也需要处理
      throw new Error(`HTTP错误: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    // 统一处理所有错误：网络错误、JSON解析错误、HTTP错误...
    console.error("获取用户数据失败:", error);

    // 返回一个安全的默认值，而不是让错误继续传播
    return { id: userId, name: "位置用户", error: true };
  }
}

// 使用
fetchUserData(123)
  .then((user) => console.log("用户:", user))
  .catch((error) => console.log("外层捕获:", error));
```

# 和 C++的对比

**异常处理机制对比**

| 特性     | JavaScript                | Column3                        |
| -------- | ------------------------- | ------------------------------ |
| 抛出类型 | 任何值（推荐 Error 对象） | 任何类型（推荐异常类）         |
| 捕获机制 | 动态类型，单一 catch 块   | 静态类型，多 catch 块          |
| 性能影响 | 现代引擎优化良好          | 传统上较重，但现代编译器有优化 |
| 错误传播 | 通过调用栈自动传播        | 通过调用栈自动传播             |

JavaScript 相对 C++的独特优势：错误优先回调

```js
// Node.js风格的错误优先回调
fs.readFile("config.json", (error, data) => {
  if (error) {
    // 错误处理
    console.error("读取文件夹失败:", error);
    return;
  }

  // 正常处理
  console.log("配置文件内容：", data.toString());
});

// 对比C++的异常处理
try {
  std::ifstream file("config.json");
  // C++需要检查每一步
} catch {const std :exception& e} {
  std::cerr << "错误: " << e.what() << std::endl;
}
```

也有**防御式编程的艺术**，在 JS 里面，有一个非常现代且优雅的特性，即可选链.?。因为在 ts 中，经常会遇到这样的一个问题：TypeError: Cannot read property 'xxx' of undefined。
在过去我们需要像 C++一样层层判断，但是我们现在可以通过可选链进行安全制动

```js
function processApiResponse(response) {
  // 检查相应是否存在
  if (!response) {
    return { success: false, error: "无响应" };
  }

  // 检查HTTP状态
  if (response.status !== 200) {
    return {
      success: false,
      error: `HTTP ${reponse.status}`,
    };
  }

  // 安全解析JSON
  let data;
  try {
    data = JSON.parse(response.body);
  } catch (error) {
    return {
      success: false,

      error: "无效的JSON格式",
    };
  }

  // 验证数据结构
  if (!data || typeof data !== "object") {
    return {
      success: false,
      error: "无效的数据格式",
    };
  }

  return { success: true, data };
}

// 可选链
let city = user && user.address && user.address.city;
let city = user?.address?.city;
```
