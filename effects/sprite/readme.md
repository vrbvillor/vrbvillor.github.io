# 序列帧播放效果
**本插件会在JQ上扩展3个方法**

+ `$.fn.visible()`：使元素可见（即`visibility:visible`）
+ `$.fn.hidden()`：使元素不可见（即`visibility:hidden`）
+ `$.fn.spirte(oCallbacks)`：本插件，详情如下。

在一个元素上生成精灵图（SPRITE或序列帧）播放功能，只在JQ集合上的第一个元素有效。

## 声明方法：
```javascript
var sprite=$(selector).sprite({
    loaded:function(){}...//所有的回调参数都是可选的
});
```

## 参数oCallbacks：事件回调参数集合

可以使用的属性有
+ `loaded(counter)`：所有图片资源调用完成之后调用，参数`counter`为计数器，此时为总图片量
+ `loading(counter,allnum)`：每个图片资源调用完成之后调用，参数`counter`为计数器，`allnum`为总图片量
+ `show/hide(n)`：在显示/隐藏第`n`张图片时候调用
+ `loop(n)`：在循环播放时调用，`n`为剩余的循环次数
+ `stopped(dir)`：在停止播放时调用，用以处理播放完成时的行为，参数只可能为`±1`，显示播放方向，即`+1`为正向播放完成时，`-1`为反向播放完成时
+ `played()`，在正向播放完成时调用
+ `rewound()`，在反向播放完成时调用

## 生成的对象`sprite`播放控制对象

播放的行为全都是用这个对象来控制的

### 可以使用的属性有

+ `loaded`，布尔值，指`fill`命令所填充的图片资源是否全部调用完成，完成为`true`
+ `step`，默认为`1`，正整数，播放步长，所有图片是每隔几个播放一次
+ `at`，正整数，当前处于第几帧
+ `frames`，正整数，总共有多少帧

### 可以使用的方法有

+ `fill(srcPattern,maxnum)`，填充图片，会先将容器清空，其中参数
    - `srcPattern`，必需，路径格式串，里边必须含有字符串{n}，用以替换成整数，图片的文件名最好使用方便的连续的数字为名
    - `maxnum`，必需，最大数字，超过最大数字就停止填充，函数无法判断某个数字是否是合法的，即有图片，所以最好人工检查图片序列的完整性
+ `play/rewind(speed,loop)`，正向/反向播放全图，会触发`stop`事件及`played`或`rewound`事件，其中参数
    - `speed`，每张图间隔的毫秒数，默认为`50`，必须是正整数
    - `loop`，布尔值，是否循环播放，默认为`0`，可以为正整数，为`-1`时无限循环
+ `destroy(bool)`，放弃对象，如果`bool`为真则同时清除里边内容
+ `goto(num,speed)`，从当前帧以`speed`的速度播到第`num`帧，会触发`stop`事件
+ `show(num)`，显示第`num`（num=0~all-1）张图片。每次切换一张图片，会触发`show`及`hide`事件
+ `on(key,fun)/off(key)`，变更或解绑事件处理函数，同JQ中的事件的基本用法

