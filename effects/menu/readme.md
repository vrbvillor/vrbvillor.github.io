# 多级伸缩导航效果

[特效预览](http://vrbvillor.github.io/effects/magnifier/magnifier.html)

## 函数使用

```javascript
var object = CHImenu(sJQcontainer, bSmooth, oCallbacks);
```

## 构造参数

### sJQcontainer 容器

**必需**，**String**或**JQobject**：要使用本特效的容器的JQ选择器字符串或JQ对象，只对该JQ集合内第一个对象有效。

> 本特效的DOM结构一定要用下边的格式

```html
<ul>
	<li>
		<a></a>
		<ul>
			...以此类推
		</ul>
	</li>
</ul>
```

本特效会将有下级导航的`li`附加上`kids`类，并将本级的`a`标签的`href`设置成`javascript:void(0)`，及附加类`kids`

### bSmooth 滑动效果

默认为`true`，是否使用滑动展开，如果为`true`是则使用上下滑动，否则使用直接显示隐藏（即hide/show方法）

### oCallbacks 回调函数对象

默认为空对象，JSON对象，用来在特效执行到某一步的时候，执行一个事件处理函数，可以使用的属性有：   

+ `init()`，完成初始化时执行的函数，函数的`this`为容器的JQ对象
+ `hide(oJQa,oJQli)`，每一次缩回时执行的函数，函数的`this`为缩回的ul的JQ对象，首参是与`ul`并列的`a`元素，次参是`ul`所属的`li`元素
+ `show(oJQa,oJQli)`，每一次展开时执行的函数，函数的`this`为展开的ul的JQ对象，首参是与`ul`并列的`a`元素，次参是`ul`所属的`li`元素
