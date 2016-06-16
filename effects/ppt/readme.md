# 幻灯片效果

[特效预览](http://vrbvillor.github.io/effects/ppt/ppt.html)

## 函数使用

```javascript
var object = CHIppt(sJQcontainer, sJQkids, oControllers, oOptions, oCallbacks);
```

## 构造参数

### sJQcontainer 容器

**必需**，**String**或**JQobject**：要执行本效果的JQ选择器字符串或JQ对象，只对该JQ集合内第一个对象有效。  

### sJQkids 子元素
**可选**，在$(sJQcontainer)基础上，使用`$().find()`查找所有的子元素，默认为`li`。

### oOptions 附加配置对象 

默认为空对象，JSON对象，用来配置当前的特效，可以使用的属性有：  

+ `delay`，默认为`3000`，必须为正数，为滚动时间间隔，越大滚动越慢
+ `mstop`，默认为`true`，鼠标指向时停止滚动
+ `auto`，默认为true，是否自动播放


### oCallbacks 回调函数对象

默认为空对象，JSON对象，用来在特效执行到某一步的时候，执行一个事件处理函数，可以使用的属性有： 

+ `init()`，完成初始化时执行的函数，函数的`this`为容器的JQ对象
+ `.show(index)`，显示元素后执行的回调函数，函数的`this`指针是被显示的元素的JQ对象，参数`index`是该元素的索引   
+ `.hide(index)`，隐藏元素后执行的回调函数，函数的`this`指针是被隐藏的元素的JQ对象，参数`index`是该元素的索引   

## 构造生成的对象  

如果生成实例的话，可以调用的方法有  

+ `.start()`，开始滚动，使用后，`auto`被设置为`true`
+ `.stop()`，停止滚动，使用后，`auto`被设置为`false`
+ `.prev()`，向前滚动一个
+ `.next()`，向后滚动一个


