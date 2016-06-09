# 层静止化效果（支持IE6，但不支持响应）

[特效预览-横向](http://vrbvillor.github.io/effects/fixed/fixed-h.html)
[特效预览-纵向](http://vrbvillor.github.io/effects/fixed/fixed-v.html)

## 函数使用

```javascript
var object = CHIfixed(sJQdoms, sWay, oCss);
```
## 构造参数

### sJQdoms 元素  

**必需**，要应用本效果的元素的JQ选择器字符串或JQ对象，可选择**多个**元素  

### sWay 静止化位置  

默认为`top`，还可以为`bottom`，`vertical`，`left`，`right`，`horizontal`

### oCss 附加样式表  

默认为空，静止化后额外增加的CSS样式对象，通常用来改变Z轴或添加某些不影响布局的样式（比如说阴影）

## 必须依赖以下样式表

```css
.fixed{
	position:fixed;
	_position: absolute;
}
.fixed-top{
	top:0px;
    _top:expression(eval(document.documentElement.scrollTop));
}
.fixed-bottom{
	bottom:0px;
	_top:expression(eval(document.documentElement.scrollTop + document.documentElement.clientHeight - this.clientHeight - (parseInt(this.currentStyle.marginTop) || 0) - (parseInt(this.currentStyle.marginBottom) || 0)));
}
.fixed-left{
	left:0px;
	_left:expression(eval(document.documentElement.scrollLeft));
}
.fixed-right{
	right:0px;
	_left:expression(eval(document.documentElement.scrollLeft + document.documentElement.clientWidth - this.clientWidth - (parseInt(this.currentStyle.marginLeft) || 0) - (parseInt(this.currentStyle.marginRight) || 0)));
}
```

> 如果不需要支持IE6，则可以把IE6对应的hack去掉  


## 原理

1. 测量原元素的布局属性，复制无外边距尺寸（margin，float，clear等属性）的一个占位元素
2. 生成一个静止化容器元素（用来放置移动过来的原元素），追加到**body**之后，以备用

> 生成的容器按当前模式使用静止（fixed）定位，如果是横向则计算`top`位置，纵向则计算`left`位置，因此本特效无法自主响应页面尺寸及布局的变化，如想响应请自行手写代码（如$(window).resize()等）

3. 当滚动位置在需要静止化的范围内时，将占位元素显示出来（透明），将原元素放置到静止化容器中
4. 反之隐藏占位元素，将原元素放置到原始位置（在占位元素的前边）
