# 导航与内容滚动监听效果
> 可以处理变化尺寸的内容，但暂时不支持动态添加的内容

[纵向特效预览](http://vrbvillor.github.io/effects/navigator/navigator.html)
[横向特效预览](http://vrbvillor.github.io/effects/navigator/navigator-h.html)

## 函数使用

```javascript
var object = CHInavigator(sJQnavs, sJQcontents, oOptions, oCallbacks);
```

## 构造参数

### sJQnavs 导航项目（集合）
**必需**，查找到导航项目的JQ字符串或JQ对象

### sJQcontents 内容项目（集合）
**必需**，查找到内容项目的JQ字符串或JQ对象

### oOptions 附加配置对象  

默认为空对象，JSON对象，用来配置当前的特效，可以使用的属性有：  

+ `dir`，默认为`v`，纵向，还可以为`h`横向
+ `offset`，纠正偏移量，单位`px`，默认为`0`，为正数的话会延后响应，为负数的话会提前响应（一般为负数，以适应顶部的静止化导航遮挡的部分）

### oCallbacks 回调函数对象

默认为空对象，JSON对象，用来在特效执行到某一步的时候，执行一个事件处理函数，可以使用的属性有： 

+ `init()+ `，初始化完成时执行的函数，只发生在`window.onload`事件上
+ `show()+ `，显示事件发生时的函数，仅当有新的项目被显示出来的时候才发生，函数的`this`语境是刚被显示出来的导航项目
+ `hide()+ `，隐藏事件发生时的函数，仅当有新的项目被显示出来的时候才发生，函数的`this`语境是刚被隐藏掉的导航项目

> 重复点击被显示出来的内容则不会发生，在同一内容区域滚动时也不会发生

