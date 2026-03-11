---
title: Leetcode算法学习专题——滑动窗口
published: 2025-12-26
description: ""
image: ""
tags: [interview, Leetcode]
category: "interview"
draft: false
lang: "zh-CN"
author: "FATFATHAO"
---

> 本文的主要内容主要由本人做题得到的一些小技巧，以后不时会过来进行补充；同时，因为该文不是在学习的时候记下的理论内容，所以理论上会有一些偏差，都是本人自己的总结，主要是方便自己理解的

# 滑动窗口

滑动窗口是一个常见的算法的概念，滑动窗口一般有两种不同的类型：定长滑动窗口和变长滑动窗口。

## 定长滑动窗口

定长滑动窗口其实我是按照灵神的思路进行的套路，基本的流程大概就是：

1. 入口，处理入口进来的信息
2. 处理，处理中间应该更新的答案之类的信息
3. 出口，处理出口需要抛出的信息

就以上三点，一般做好了就没什么其他的大问题了。这种类型的题目更多的是自己注意一些细枝末节的东西一般是不会出错的

这里给一个非常常见的例题方便理解

[1456. 定长字串中元音的最大数目](https://leetcode.cn/problems/maximum-number-of-vowels-in-a-substring-of-given-length/description/)

```js
function maxVowels(s: string, k: number): number {
    let ans = 0, sum = 0;
    for (let i = 0; i < s.length; i++) {
        // 处理入口
        if ('aeiou'.indexOf(s[i]) >= 0) {
            sum++;
        }
        // left保证了窗口的长度一定是定长的i - k + 1就是窗口的大小
        const left = i - k + 1;
        if (left < 0) continue;
        
        // 处理答案
        ans = Math.max(ans, sum);
        
        // 处理出口
        if ('aeiou'.indexOf(s[left]) >= 0) {
            sum--;
        }
    }
    return ans;
};
```

综上所述，这是一个非常经典的滑动窗口例题，我这里也只是简单的采用了一个做题的常规套路来进行的解题；但只要考虑到相关的问题，稍微的进行修改，一般就能AC了，所以这个问题不用过多的深究。

## 不定长滑动窗口/变长滑动窗口

不定长滑动窗口又分为三类不同的类型：最长子数组、最短子数组以及子数组个数。这里简单的介绍一下变长的滑动窗口，如果说定长滑动窗口是等右窗口爬到了指定的长度，做窗口再跟着一起进行滑动的话。那么，变长滑动窗口就是在符合题意的前提下，右窗口先进行滑动，直到达到了题目规定的最低限度的情况，开始缩短左窗口，就和一个蠕虫在挪动一样。

### 求最长子数组

[3. 无重复字符的最长字串](https://leetcode.cn/problems/longest-substring-without-repeating-characters/)这也是字节面试的时候最喜欢考查的一道题目，考查的频率很高，我们就选用他来作为我们的例题进行演示。

这道题主要的思路在于，我们如何在满足条件的情况下求取最长的子数组，主要按照他给我们的条件来进行思考，这里他所给的条件主要是越短越合法，所以在做灵神的题单的时候可能第一个反应是为什么**越短越合法/求最长**放在了一起，你可能会疑惑，这一个**越短**一个**最长**不是矛盾的吗？实际上要根据实际的语境来进行考虑

```js
function lengthOfLongestSubstring(s: string): number {
    const map = new Map();
    let left = 0, ans = 0;
    for (let i = 0; i < s.length; i++) {
        // 入口，处理加入的信息，依据题意，我们这里保存相关的index
        if (!map.has(s[i])) {
            map.set(s[i], []);
        }
        const arr = map.get(s[i]) as number[];
        arr.push(i);
        // 蠕动，如果达到了题目的边界条件，我们进行处理，蠕动做窗口，按照本题的意思我们这里只要每一个字符保存了的index超过了1，就说明保存了重复的字符。我们不断的遍历left遍历的字符，使得我们的left向前进行挪动
        while (arr.length > 1) {
            left = Math.max(left, map.get(s[left]).shift() + 1);
        }
        // 更新处理答案
        ans = Math.max(ans, i - left + 1);
    }
    return ans;
};
```

我们发现这次更新答案的逻辑放在了最后，因为如果继续按照定长滑动窗口的处理方式可能会遇到不符合我们需求的情况，即答案更新的不及时或者是答案的重复计算都是有可能的

### 求最短子数组

我们以这个比较简单的例子来做比较[209. 长度最小的子数组](https://leetcode.cn/problems/minimum-size-subarray-sum/description/)

```js
function minSubArrayLen(target: number, nums: number[]): number {
    let ans = Number.MAX_VALUE, sum = 0, left = 0;
    for (let i = 0; i < nums.length; i++) {
        // 处理右窗口进入的数据
        sum += nums[i];

        // 当目标条件到达我们的边界条件，开始处理信息。这次我们把答案更新也放入了蠕动的过程中，因为我们要求的是最小的数组，如果我们把求取答案的步骤放在外面，就会发生我们获得的信息已经是处理完之后不符合条件的情况。这种信息本该是被过滤的，但是被我们错误的获取了。所以我们这里采取的方法是在蠕动的过程中进行更新，而且我们将蠕动的过程放在了答案获取的后面，因为如果我们放在left更新之后，我们的答案仍然有几率会落在概率之外。
        while (sum >= target) {
            sum -= nums[left];
            ans = Math.min(ans, i - left + 1);
            left++;
        }
    }
    return ans === Number.MAX_VALUE ? 0 : ans;
};
```

### 求子数组的个数

求字数的个数也分为三种不同的情况：越短越合法、越长越合法还有恰好型的滑动窗口

#### 越短越合法

我们使用例题[713. 乘积小于k的子数组](https://leetcode.cn/problems/subarray-product-less-than-k/description/)来进行演示

```js
function numSubarrayProductLessThanK(nums: number[], k: number): number {
    // 边界去除（这里其实里面的逻辑也可以排除这里的边界）
    if (k === 0) {
        return 0;
    }
    let sum = 1, left = 0, ans = 0;
    for (let i = 0; i < nums.length; i++) {
        // 通过题目我们很快能推导出来，什么时候是我们子数组乘积的最大值呢？就是我们子数组里面每一个数都乘起来的值，所以可以用变长滑动窗口来维护这个边界
        sum *= nums[i];

        // 由题目可知，我们得到的和一定要小于k，所以一旦我们的乘积超过了我们的预期，我们这里就需要截断他。然后开始蠕动，直到我们滑动窗口内的值符合题意，然后继续更新
        while (sum >= k && left <= i) {
            sum = Math.floor(sum / nums[left]);
            left++;
        }
        // 这里我们采用的是答案叠加的方式，为什么可以进行叠加呢？原因是这样的，假设我们的例子现在是
        // [10, 2, 5, 6], k = 10
        // 我们很快就能发现，最后得到的答案的格式大概是这样的：
        // [10]、[5]、[2]、[6]、[10,5]、[5,2]、[2,6]、[5,2,6]。需要注意的是 [10,5,2] 并不是乘积小于 100 的子数组。
        // 按照我们的算法进行遍历，[10, 5, 2]的时候就会进入上面的循环，其余的时候是不进入的，当不存在于内循环的时候，我们这里有
        // [left, right] [...arr] maxValue acc
        // [0, 0] [10] 10 1
        // [0, 1] [10, 2] [2] 20 2 这里原本会有一个[10]的，但是我们不计算重复的子数组，所以[10]排除，我们会发现从[left...right]里面的值都是符合条件的，即[left + 1, right], [left + 2, right] ... [right, right]，一个有几个数组符合条件呢？恰好有right - left + 1个数组，即我们当前子数组的长度
        // [0, 3] [10, 5, 2] loop
        ans += i - left + 1;
    }
    return ans;
};
```

#### 越长越合法

我们使用例题[1358. 包含所有三种字符的子字符串数目](https://leetcode.cn/problems/number-of-substrings-containing-all-three-characters/description/)

```js
function numberOfSubstrings(s: string): number {
    // 这里用了一个取巧的办法，因为我们只要判断三个连在一起的a, b, c，所以让3个连号的数组存储就行了，不然可以使用哈希表噢！
    const arr = Array(3).fill(0);
    let ans = 0, left = 0;
    // 这里设置这个函数是因为偷懒，不想写太多的判断逻辑又能复用，主要的逻辑就是检测这三个数组有没有超过我们的规定，如果没有的话就返回true，不然就false
    const checkArray = () => {
        for (const num of arr) {
            if (num < 1) {
                return false;
            }
        }
        return true;
    }
    for (let i = 0; i < s.length; i++) {
        // 同样处理右窗口，我们把所有要进来的字符加入我们的数组当中存储起来
        arr[s[i].charCodeAt(0) - 'a'.charCodeAt(0)]++;
        // 开始判断，如果满足了题目的要求，进入循环之中
        while (checkArray()) {
            arr[s[left++].charCodeAt(0) - 'a'.charCodeAt(0)]--;
        }
        // 当循环处理完毕的时候，我们会发现处理完毕的数组应该已经不符合题目的要求了，但是这里就会存在[left, right]不符合要求而[left - 1, right]符合要求的情况，这个时候就会出现一种情况，如题所述，我们只要分别保留一个a, b, c字符就可以存入答案之中。所以会有[left - 1, right], [left - 2, right], [left - 3, right]....[0, right]，是符合题意的。而因为我们的下标是从零开始，当我们开始不符合题意的时候，当前的left值刚好就是[left - 1, right] ... [0, right] 数组的大小，即我们想要获取的答案
        ans += left;
    }
    return ans;
};
```


#### 恰好型滑动窗口

我们使用例题[930. 和相同的二元子数组](https://leetcode.cn/problems/binary-subarrays-with-sum/)

```js
function numSubarraysWithSum(nums: number[], goal: number): number {
    // 创建一个查找的函数，目的在于每次查找>=k的值
    const findK = (k: number) => {
        let left = 0, sum = 0, ans = 0;
        for (let i = 0; i < nums.length; i++) {
            sum += nums[i];
            while (sum >= k && left <= i) {
                sum -= nums[left];
                left++;
            }
            ans += left;
        }
        return ans;
    }
    // 由本体我们指导，我们目前想要找到的答案需要满足goal这个条件，但是怎么样才能满足goal这个条件呢？goal是恰好等于goal的这个情况，如果根据前面的例题总结我们会发现一件事情，我们的滑动窗口应该是一次滑倒底的，即完整的一次遍历。这种情况就限制了我们很难很好的找出满足goal的这个条件。所以这里人们就发明了一个取巧的办法，我们可以先找出>=goal的值，然后我们再找到一个>=goal + 1的值，由于滑动窗口的性质决定，>=goal的值一定是>=goal + 1的值，所以我们只需要减去后面满足的情况，不就能恰好的得到满足goal的情况了吗？
    return findK(goal) - findK(goal + 1);
};
```

那么滑动窗口的内容就到这里了，目前没有涉及到双指针的内容，主要是因为目前滑动窗口的内容姑且够用就先看了滑动窗口的内容，如果之后遇到双指针的题目没有感觉会回来补双指针的内容写回博客里面

那么，谢谢您的观看，下次我们将会简单的讲讲二分查找以及二分答案的内容
