# 分块式拼图效果

[特效预览](http://vrbvillor.github.io/effects/blocks/blocks.html)

## 函数使用

```javascript
var object = CHIblocks(sJQcontainer, sJQimgs, oControllers, oOptions, oCallbacks);
```
## 构造参数

### sJQcontainer 容器

**必需**，`String`或`JQobject`：要执行本效果的图片列表的JQ选择器字符串或JQ对象，只对该JQ集合内第一个对象有效。
> 容器的样式一定要为position:relative，它的子元素  

### sJQimgs 图片选择器

默认为__img__，在$(sJQcontainer)基础上获取图片的JQ选择器字符串  

### oControllers 控制器对象

默认为空对象，JSON对象，用来使某些元素控制当前特效，可以使用的属性有：  
+ **indices**：索引的JQ选择器字符串（1/2/3/4/5...）

> 索引的当前页码会被附加class="cur"  

+ **prev**，向前播放的控制器的JQ选择器字符串  
+ **next**，向后播放的控制器的JQ选择器字符串  
+ **stop**，停止的控制器的JQ选择器字符串  
+ **start**，开始的控制器的JQ选择器字符串  

### oOptions，附加配置对象  

默认为空对象，JSON对象，用来配置当前的特效，可以使用的属性有：  

+ **h**，水平块数，默认为`2`  
+ **v**，竖直块数，默认为`2`  
+ **delay**，每帧的间隔时间，默认为`5000`毫秒  
+ **mstop**，默认为`true`，鼠标指向特效时，特效暂停  
+ **auto**，默认为`true`，特效自动播放（影响开始状态，或控制向前、后播放后是否会继续播放）  

### oCallbacks，回调函数对象

默认为空对象，JSON对象，用来在特效执行到某一步的时候，执行一个事件处理函数，可以使用的属性有： 

+ **init(oJQcontainer)**，完成初始化时执行的函数，参数是容器的JQ对象  
+ **all(oJQblocks)**，这一帧的所有块完成移动时执行的函数，参数是所有块的JQ对象  
+ **each(piIndex)**，每一块移动完成时执行的函数，参数是完成移动的那一块的JQ对象索引，函数的`this`指针是移动完成的那一块的元素对象  

## 构造生成的对象  

如果生成实例的话，可以调用的方法有  

+ **.start()**，开启特效的元素，用来播放特效
+ **.stop()**，暂停特效的元素，用来暂停特效
+ **.prev()**，向前播放，用来播放上一帧
+ **.next()**，向后播放，用来播放下一帧
+ **.show(n)**，播放第n帧
