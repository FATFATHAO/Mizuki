---
title: LeetCode Hot 100 哈希板块
published: 2025-11-12
description: "LeetCode 热题 100"
image: ""
tags: [LeetCode Hot 100]
category: "LeetCode题解"
draft: false
lang: "zh_CN"
author: "FATFATHAO"
---

<!-- # LeetCode Hot 100 哈希板块 -->

今天来写一下哈希板块吧，这是大家初入 LeetCode Hot 的第一个板块

## 哈希的起源

在哈希表出现之前，我们用什么来查找数据呢，我们回顾一下我们所学过的数据结构，有几种办法呢？

- **数组/链表**：通过遍历来进行查找，使用的时间复杂度一般为 O(N) ，如果数据量巨大的话，耗费的查找时间也是巨大的。
- **二叉搜索树(BST)/二分查找**：需要有序或平衡。时间复杂度 $O(\log N)$。虽然快了很多，但随着数据量指数级增长，依然有开销。

那么我们有没有一种办法，可以一瞬间查找到我们需要的数据呢？而且时间复杂度不要太高，O(1)就可以，就像查字典一样，知道了相关的字母，相关的拼音，我们直接翻到那一页即可，而不用一页一页的进行查找。

聪明的你想到了一种办法，我们能不能用一个酒店，酒店里面有不同门牌号的酒店，我们把值存放在一个房间当中，而这个酒店的门牌号由我们自己来规定。我们在各个钥匙上面写上我们的门牌号，用来找到我们的值所存放的房间，这样就可以查找到我们的值。而且这个门牌号是唯一特殊的，这个钥匙只能打开这个门，与此相对的，其他的钥匙是打不开这扇门的。

因此，我们有了一套方案，我们把这个关系叫做映射，我们把不同的值和钥匙上的门牌号对应了起来，我们把这个关系叫做映射，我们可以通过这个钥匙来找到这个地址。因此，我们有了 key, value pair 这个东西。

哈希表的本质，其实就是用空间来换取时间，他放弃了数据的顺序，换来的是查找速度的提升

## 从专业角度看待

我们在通过专业课的学习中也会学习到哈希表，比如数据结构、计算机组成原理，都能讲到关于哈希表的内容，我们不妨联想串联一下这部分的知识。

在数据结构中，关于哈希表的知识，我们一般会遇到两个不同的考点，即**哈希函数**和**哈希冲突**

### 哈希函数

如果我们要实现哈希表，那么就要通过特定的数据结构以及算法来实现，哈希函数就是处理这方面的一个函数，一般我们看到的算式是这样的 key % hashtableSize，我们取他的余数，决定将我们的值放在哈希表里面什么样的位置。

但是我们哈希表的容量是有限的，我们在使用上述的哈希函数一定会遇到一个问题，如果我们的余数取到了之前取到过的数，那么我们的值就会出现他现在分配到的位置已经是有人的位置了，放不进去，这个问题被称为：**哈希碰撞**

### 哈希碰撞

为什么会有哈希碰撞呢？原因其实很简单，我们的 key 的空间一般是无穷的，他远大于我们哈希表 table 的空间，也就是说，Key1 != Key2，但是 Hash(Key1) == Hash(Key2)。所以我们就要找到一种办法来解决现在发生的冲突。

解决冲突的办法有很多种，下面列举两种：

- 拉链法(在工程中更多的使用拉链法)：
  - 数组的每个位置存一个链表(或红黑法)。发生冲突就把冲突的值挂在后面。
  - 优点：处理简单，对装载因子不敏感。
  - 缺点：指针占用额外内存，链表跳转对 CPU 缓存不友好。
- 开放寻址法：
  - 如果位置被占了，就按照一些规则(线性探测、二次探测)找下一个空位。
  - 优点：数据都在数组里，序列化容易，缓存友好。
  - 缺点：删除麻烦(需要标记位)，容易产生堆积现象。

## 从底层的角度看待

一般我们从底层看待，都是从计算机组成原理的角度进行看待的，在计组当中，我们一般用于查找的时候会用到哈希这个理念，比较常见的有：**页表**、和**文件系统**。

### 页表

我们都知道在虚拟内存管理中，为了加速虚拟地址到物理地址的转换，现代 CPU 的 TLB 本质上就是一个全相联的高速缓存哈希表。

### 文件系统

而有的文件系统中，快速定位文件块也用到了哈希的思想

## 从网络的角度来看待

### 负载均衡

当你有多台服务器的时候，如何决定该去请求哪一台？一个简单的式子是这样的：hash(ip) % 10。

### 一致性哈希

分布式系统中为了解决节点增删而导致大量数据迁移问题

## 从语言特性来进行横向对比

| 特性       | C++ (std::unordered_map)                                        | Golang (map)                                                                     | TypeScript (Map / Set)                                                               |
| ---------- | --------------------------------------------------------------- | -------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| 底层实现   | 通常是 数组 + 链表 (C++11 标准未规定具体，但主流编译器皆为此)。 | hmap 结构。使用 桶 (Buckets) 数组，每个桶存 8 个键值对。溢出由于链表连接溢出桶。 | V8 引擎下通常是 Deterministic Hash Tables (基于开放寻址法的变种，为了保持插入顺序)。 |
| 有序性     | 无序。迭代顺序不可预测。                                        | 随机。每次遍历顺序可能都不一样（故意设计的，防止依赖顺序）。                     | 有序。按插入顺序迭代（这是 JS/TS Map 的一大特性）。                                  |
| 红黑树     | 无（std::map 才是红黑树）。                                     | 无                                                                               | 无（但在 Java HashMap 中，链表过长会转红黑树，TS/JS 一般不转）                       |
| 时间复杂度 | 平均 $O(1)$，最坏 $O(N)$                                        | 平均 $O(1)$，最坏 $O(N)$                                                         | 平均 $O(1)$（但在 V8 内部由于对象形状优化，可能极快）                                |

主要区别：

- C++分类明确：map(有序、红黑树、O(LogN)) vs unordered_map(无序、哈希、O(1))
- Golang 只有哈希表
- typescript 的 Object 也可以做哈希表，但 Key 只能是 String/Symbol。在现代开发中，一般使用 map = new Map();其中的 key 可以是任意类型。

## LeetCode Hot 100 哈希板块实战

在这一部分中，我们将攻克 LeetCode Hot 100 的经典题目，通常在 Hot 100 中，哈希题目考察三种思维：

1. 存在性判断：判断这个元素是否之前有出现过(Set)
2. 映射关系：这个元素对应的下标值是多少(Map)
3. 计数/分组：这个元素出现了几次，或者把这类元素归为一组。使用 Map<Key,Count>或 Map<Key, List>。

题目清单：

### 1. 两数之和

给定一个整数数组 `nums` 和一个整数目标值 `target`，请你在该数组中找出**和为目标值**`target`的那**两个**整数，并返回它们的数组下标。

你可以假设每种输入只会对应一个答案，并且你不能使用两次相同的元素。

你可以按任意顺序返回答案。

```CPP
class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        unordered_map<int, int> hash;
        for (int i = 0; ; i++) {
            auto it = hash.find(target - nums[i]);
            if (it != hash.end()) {
                return {it->second, i};
            } else {
                hash[nums[i]] = i;
            }
        }
        return {};
    }
};
```

既然是寻找两数之和，那么其实很好思考，我们有目标值和目标数组，我们把数组出现过的数的下标都存储在哈希表中，当我们在循环遍历的过程中，每次都判断**目标值-当前遍历到的值**是否已经出现过，如果出现过，我们可以直接在哈希表中取出下标，返回即可。

## 我喜欢的语言应该记住的语法

这里不得不说的是，思想很简单，但是基本的语法要记得，如果基本的语法都不记得，知道思想临时手撕也撕不出来。

简单的来说，对于一个哈希表来说，他一定要有访问、存储、查找、删除、容量等功能

### C++

那么在 C++中，**unordered_map** 的方法有 `insert, operator, find, erase, size, empty, swap, count`。

一般来说，我认为插入有两种办法：

- 在使用 `insert` 的时候，我们知道 **unordered_map** 里面存储的都是键值对相关的内容。比如 **unordered_map<int, int>** ，在 C++中，一般使用 **pair<int,int>(key, value)** 将相关的内容包裹起来，要么使用 make_pair(int, int)。

- 还有一种方式，在 C++中，**unordered_map** 重载了[]运算符，所以我们可以通过\[key\]去访问里面的 Value，可以读取也可以进行修改。

我们知道，在 C++中，为了方便访问，遍历，查找函数，STL 中使用了模版范式编程，构造了 **迭代器** 这种东西。所以当我们在 **unordered_map** 中进行查找 `find` 的时候，查找函数返回的是一个 **unordered_map** 的迭代器。这个迭代器可以看做是一种指针，如果查找到了相关的内容，这个指针就会指向目标的内存地址，如果没有查找到，这个指针最后会停留在 unordered_map.end()上面，所以当我们想要判断是否查找到目标值的时候，只需要看 it 最后停留的位置即可

简单来讲：

```cpp
unordered_map<int, int> mp;
auto it = mp.find(5);
if (it != mp.end()) {
  std::cout << it->second;
} else {
  std::cout << "No Found";
}
```

在插入和查找完毕之后，如果我们想删除一个元素，我们会用到 `erase` 这个方法，比较简单的，我们使用 `erase(key)`就可以删除这个键值对了。或者，当我们需要删除某个位置的元素时，也可以使用 `erase(unordered_map<int, int>::iterator)` 即 `erase(pos)` ，如果当我们需要删除一组元素的时候，我们可以使用 `erase(startPos, endPos)` 这种方式。

而关于剩下的 `size, empty, swap, count` 则比较好理解

size 即返回当前哈希表的大小，empty 则是检测当前哈希表是否为空，swap 则是交换两个哈希表里面的内容，而 count 因为 unordered_map 是哈希表实现的，他不允许出现重复的键，所以如果元素中有该键的元素，返回 1，否则返回 0

### TypeScript

和 C++不太一样的地方在于，毕竟 TypeScript 是声明式语言，而且汲取了 C++和 JavaScript 各自的特点。所以他的声明和使用有些不太一样。

```TypeScript
const emptyMap = new Map<string, number>();

const initializedMap = new Map<string, string>([
  ['name', 'Alice'],
  ['title', 'Engineer'],
]);

const complexKeyMap = new Map<object, number>();
const user = {id: 1};
complexKeyMap.set(user, 1);
```

增删改查

```TypeScript

// 增/改
map.set(key, value);
// 删
map.delete(key);
// 查
map.get(key);
// find
map.has(key);
// clear
map.clear();
// size
map.size
```

遍历方法

```TypeScript
// for of
for (const [id, user] of userMap) {
  console.log(`${id}, ${user.name}`);
}
// for each
userMap.forEach((user, id) => {
  console.log(`${id}, ${user.name}`);
});

// 单独遍历
for (const id of userMap.key()) {
  console.log(id);
}

for (const user of userMap.values()) {
  console.log(user.name);
}

// 直接访问迭代器，和直接遍历map差不多
for (const entry of userMap.entries()){
  console.log(entry);
}

// 先转换为数组再进行处理
const userArray = Array.from(userMap);
console.log(userArray);

const adminUsers = Array.from(userMap).filter(([ id,user ]) => user.role === 'admin').map(([id, user]) => user.name);
```

### Golang

```go
a := make(map[key]value)
for i, v := range a {
  // 通过这种方式对里面的go语言进行遍历
}

```

那么看到这里，希望你已经对哈希表的知识有了大概的一些理解，希望你能顺利的通过 leetcode hot 100 中的三道哈希相关的题目
