# 扇子式伸缩效果

[特效预览](http://vrbvillor.github.io/effects/fans/fans.html)

## 函数使用

```javascript
var object = CHIfans(sJQcontainer, sJQkids, oOptions, oCallbacks);
```
## 构造参数

### sJQcontainer 容器

**必需**，**String**或**JQobject**：要执行本效果的图片列表的JQ选择器字符串或JQ对象，只对该JQ集合内第一个对象有效。
> 容器的样式一定要为position:relative，它的子元素  

### sJQkids 图片选择器

在$(sJQcontainer)的基础上，使用$().find()查找折扇每个扇页的DOM子元素的JQ查询串或对象，如果不定义则直接使用$().children()方法

### oOptions 附加配置对象  

默认为空对象，JSON对象，用来配置当前的特效，可以使用的属性有：  

+ `relax`，是否为舒展模式，默认为`true`，在鼠标离开状态时为舒展状态，每个块与块的间隔都一样大  

> 如果为`false`则始终有一个扇页是打开的，类似于**drawer**特效的第4个demo横向唯一模式

+ `delay`，每帧的间隔时间，默认为`5000`毫秒  
+ `mstop`，默认为`true`，鼠标指向特效时，特效暂停  
+ `auto`，默认为`true`，特效自动播放（影响开始状态，或控制向前、后播放后是否会继续播放）  

### oCallbacks 回调函数对象

默认为空对象，JSON对象，用来在特效执行到某一步的时候，执行一个事件处理函数，可以使用的属性有： 

+ `show(piIndex)`，显示某一子元素的回调函数，`this`指向被展开的元素，参数为此元素的索引  
+ `hide(piIndex)`，隐藏某一子元素的回调函数，`this`指向被缩回的元素，参数为此元素的索引  

## 构造生成的对象  

如果生成实例的话，可以调用的方法有  

### 当`relax==true`时可以使用的方法有
+ `.relax()`，调用舒展模式  
+ `.show(n)`，播放第n帧

### 当`relax==false`时可以使用的方法有
+ `.start()`，开启特效的元素，用来播放特效
+ `.stop()`，暂停特效的元素，用来暂停特效
+ `.prev()`，向前播放，用来播放上一帧
+ `.next()`，向后播放，用来播放下一帧
+ `.show(n)`，播放第n帧
