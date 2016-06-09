# 抽屉式标题内容伸缩效果

[特效预览](http://vrbvillor.github.io/effects/drawer/drawer.html)

## 函数使用

```javascript
var object = CHIdrawer(sJQcontainer, sJQtitles, sJQcontents, oOptions, oCallbacks);
```

## 构造参数

### sJQcontainer 容器

**必需**，**String**或**JQobject**：要执行本效果的图片列表的JQ选择器字符串或JQ对象，只对该JQ集合内第一个对象有效。
> 使用横向的时候，一定要计算容器的宽，并使容器正常包裹浮动的子元素及其内容（清除内容浮动，及设置overflow:hidden）。  

### sJQtitles 标题
**必需**，在$(sJQcontainer)基础上，使用$().find()查找各标题栏的JQ选择器字符串或JQ对象，点击它们会使对应的内容栏收缩或展开  

### sJQcontents 内容
**必需**，在$(sJQcontainer)基础上，使用$().find()查找各内容栏的JQ选择器字符串或JQ对象，它们是会收缩或展开的部分，一定要有overflow:hidden

### oOptions 附加配置对象  

默认为空对象，JSON对象，用来配置当前的特效，可以使用的属性有：  

+ `dir`，方向，默认为`h`，只可以为`h`或`v`  
+ `type`，动作类型，默认为1，可以为1-3，它们的效果分别是：
	- `1`，自由式，所有内容可以**自由**展开或关闭，点击标题可以伸缩对应的内容栏  
	- `2`，唯一式，**始终**有一个内容栏是展开的，点击标题只可以展开内容，不可以缩回  
	- `3`，限制式，**最多**有一个内容栏是展开的，点击标题可以打开对应内容，当内容是打开的再点击对应标题可以缩回内容

### oCallbacks 回调函数对象

默认为空对象，JSON对象，用来在特效执行到某一步的时候，执行一个事件处理函数，可以使用的属性有： 

+ `.init(oJQdt0,oJQdd0)`，完成初始化时执行的函数，参数为第一对标题及内容的JQ对象  
+ `.show(oJQdtShow,oJQddShow,piIndexDT,piIndexDD)`，每一次展开时执行的函数

> `oJQdtShow`是被激活的标题栏JQ对象，`oJQddShow`是被显示的内容栏JQ对象，`piIndexDT`是被激活的标题栏的索引，`piIndexDD`是被显示的内容栏的索引  

## 构造生成的对象  

如果生成实例的话，可以调用的方法有  

+ `.show(index)`，展开索引为index(index>=0)的内容栏，效果根据type不同而有所区别  
+ `.hide(iIndex)`，根据参数不同，有不同的行为，详情如下  

	- `iIndex==undefined`，缩回所有内容栏  
	- `iIndex>=0`，为0时不可以有负号，缩回索引为i的内容栏
	- `iIndex<=0`，为0时必须有负号，缩回除了索引为-iIndex的其它内容栏

	> 0和-0是不一样的  

