# 有界式滚动跟随浮动框

[特效预览](http://vrbvillor.github.io/effects/float/float.html)

## 函数使用

```javascript
var object = CHIfloat(sJQdom, oOptions, oCallbacks);
```
## 构造参数

### sJQdoms 容器

**必需**，要应用本效果的元素的JQ选择器字符串或JQ对象，可选择**多个**元素  

### oOptions 附加配置对象

默认为空，JSON对象，可以使用的属性有  

+ `top`，`bottom`，`left`，`right`为四项边距，可为`0`  

> `top/bottom`只有一项有效，另一项需要为空，同样规则适用于`left/right`，有效的那一项的值必须为**非负**  

+ `minTop`，最小顶边距，当元素顶边距大于最小顶边距时，DOM浮动，如果小于时，DOM则停在该处  
+ `minLeft`，最小左边距，当元素左边距大于最小左边距时，DOM浮动，如果小于时，DOM则停在该处  
+ `maxTop`，最大顶边距，当元素顶边距小于最大顶边距时，DOM浮动，如果大于时，DOM则停在该处  
+ `maxLeft`，最大左边距，当元素左边距小于最大左边距时，DOM浮动，如果大于时，DOM则停在该处  

> 以上8项参数都可以使用有`return`的函数  
> 默认为左上角浮动，边距为`0`，最小边距默认为`0`

### oCallbacks 回调函数对象

默认为空对象，JSON对象，用来在特效执行到某一步的时候，执行一个事件处理函数，可以使用的属性有： 

+ `init()`，初始化后的回调函数，`this`就是本效果执行的JQ对象  
+ `move()`，每步浮动的回调函数，`this`就是本效果执行的JQ对象  

