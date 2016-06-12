# 抽屉式标题内容伸缩效果

[特效预览](http://vrbvillor.github.io/effects/movie/movie.html)

## 函数使用

```javascript
var object = CHImovie(sJQcontainer, sJQkid, oControllers, oOptions, oCallbacks);
```

## 构造参数

### sJQcontainer 容器

**必需**，**String**或**JQobject**：要执行本效果的图片列表的JQ选择器字符串或JQ对象，只对该JQ集合内第一个对象有效。
> 使用横向的时候，一定要计算容器的宽，并使容器正常包裹浮动的子元素及其内容（清除内容浮动，及设置overflow:hidden）。  

### sJQkid 子容器
**可选**，在$(sJQcontainer)基础上，使用`$().find()`查找需要被滚动的整体部分的选择器字符串，默认为使用第一子元素

### oControllers 控制器参数 对象

控制特效进行的控制器配置对象，对象中的属性值可以为JQ选择器或JQ对象

+ `indices`，控制播放索引列表，一般为特效中有多个子元素时使用，用来播放第n个元素
+ `start`，开启特效的元素，用来播放特效
+ `stop`，暂停特效的元素，用来暂停特效
+ `prev`，向前播放，用来播放上一帧
+ `next`，向后播放，用来播放下一帧

### oOptions 附加配置对象  

默认为空对象，JSON对象，用来配置当前的特效，可以使用的属性有：  

+ `dir`，方向，默认为`r`，还可以为`u`或`d`或`l`  
+ `delay`，默认为`30`，必须为正数，为滚动时间间隔，越大滚动越慢
+ `mstop`，默认为`true`，鼠标指向时停止滚动
+ `minLi`，默认为`1`，为最少的显示（在外边的元素的）数量，如果少于这个数量就不执行特效
+ `auto`，默认为true，是否自动播放


### oCallbacks 回调函数对象

默认为空对象，JSON对象，用来在特效执行到某一步的时候，执行一个事件处理函数，可以使用的属性有： 

+ `init()`，完成初始化时执行的函数，函数的`this`为容器的JQ对象
+ `move()`，每一次滚动时执行的函数，函数的`this`为当前指示的子元素的JQ对象

## 构造生成的对象  

如果生成实例的话，可以调用的方法有  

+ `.start()`，开始滚动，使用后，`auto`被设置为`true`
+ `.stop()`，停止滚动，使用后，`auto`被设置为`false`
+ `.run(ind)`，播放到指定索引的位置
+ `.prev()`，向前滚动一个
+ `.next()`，向后滚动一个
+ `.size()`，返回子元素个数
+ `.cur()`，返回当前作为标志的子元素索引


