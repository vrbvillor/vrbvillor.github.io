# 使用Raphael绘制弧形与扇形

## 矢量图与位图

矢量图是可伸缩的图像，在任何情况下都不会失真，但是很难绘制复杂的图案  
位图是网站上最常用的图片类型，GIF/PNG/JPG/BMP，位图在缩放时会失真  

## SVG与Canvas

是HTML5新推出的标签，它们不仅仅是新标签，更是新功能，可以在DOM上绘制矢量图形。

### SVG

类似于DOM，有树形的结构，每个元素都可以彼此独立，也可以组合在一起，可以响应DOM事件，适合做交互性内容

### Canvas

类似于画板，可以绘制复杂的图案，可以保存图像为位图，刷新率高，适合制作游戏向刷新率高的东西

## Raphael库

低端浏览器IE678中的VML就是矢量，相当于现代浏览器中的SVG，Raphael同时封装了SVG与VML，可以在高低端浏览器都绘制出相同的矢量图形效果，Raphael有类似于jQuery的语法，可以使用链式指令写法，易学易上手，功能多，量重且没有SVG上的分组/符号/滤镜

## 使用Raphael

### 生成画布

```html
<div id="Canvas"></div>
```
```javascript
var paper=Raphael('Canvas',400,400);
```

可以在一个DOM上，利用它的ID，生成一个画布，以便在画布上绘制图形。

### 移动画布

```javascript
paper.setViewBox(-200,-200,400,400);
```

默认的画布的坐标原点（0,0）是在左上角的，用这个方法可以将原点移动到画布中央，以方便计算坐标。

`paper.setViewBox(xnumber,ynumber,wnumber,hnumber[,fitboolean])`

**参数**  
+ `xnumber`：必选，新的左上角x位置，以原画布的坐标系为准  
+ `ynumber`：必选，新的左上角y位置，同上  
+ `wnumber`：必选，新画布的宽，最好与画布原始尺寸成比例  
+ `hnumber`：必选，新画布的高，同上  
+ `fitboolean`：可选，画布上的元素是否伸缩以匹配新画布  

### path方法

```javascript
paper.path('指令串');
```

本方法用于在画布上绘制一条矢量路径，可以采用以下的命令来合成路径


指令 | 名称 | 参数
---- | ---- | ----
M | 移动画笔 | (x y)+
Z | 闭合路径 | (none)
L | 画直线 | (x y)+
H | 画水平直线 | x+
V | 画竖直直线 | y+
C | 三次贝塞尔曲线 | (x1 y1 x2 y2 x y)+
S | 连接三次贝塞尔曲线 | (x2 y2 x y)+
Q | 二次贝塞尔曲线 | (x1 y1 x y)+
T | 连接二次贝塞尔曲线 | (x y)+
A | 椭圆弧 | (rx ry x转角 大弧标志 顺时针标志 x y)+

### A指令

A指令用于画椭圆（或圆）上的一部分圆弧，它的指令格式为

`A rx ry xRot large sweep x y`


其中各参数的说明：  
+ `rx`：x轴方向上的半径  
+ `ry`：y轴方向上的半径  

    > 当`rx==ry`时，就是画的圆弧，否则就是椭圆弧

+ `xRot`：x轴的转角，以**顺时针**方向为正方向的**角度值**  
+ `large`：大弧标志，可以是`0/1`，为`0`时画较小方向上的弧，为`1`时画较大方向上的弧  

    > 当是**180**度时，大小弧重叠，最后画的结果，由`sweep`参数决定

+ `sweep`：顺时针标志，可以是`0/1`，为`0`时按逆时针画，为`1`时按顺时针画  
+ `x`：终点的x坐标  
+ `y`：终点的y坐标  

**两点相同时绘制出的四种弧**  
![两点相同时绘制出的四种弧](http://vrbvillor.github.io/lessons/arcs.jpg)

**褐色弧**  
`paper.path('M-100,-100A80,80,0, 0 , 0 ,100,100')`  
**紫色弧**  
`paper.path('M-100,-100A80,80,0, 0 , 1 ,100,100')`  
**红色弧**  
`paper.path('M-100,-100A80,80,0, 1 , 0 ,100,100')`  
**蓝色弧**  
`paper.path('M-100,-100A80,80,0, 1 , 1 ,100,100')`  


### 圆的参数方程

想要在指定的位置，画出预期大小的圆上的弧，需要借助圆的参数方程。

```
x=r * cos(t);
y=r * sin(t);
```

**数学用坐标系与屏幕坐标系**  
![数学用坐标系与屏幕坐标系](http://vrbvillor.github.io/lessons/coordinate.jpg)


**先画1/4弧**

```javascript
var startAngle=-90,
    overAngle=0,
    radius=100,
    cos=Math.cos,
    sin=Math.sin,
    angle2Theta=function(angle){return angle * Math.PI / 180;},
    startTheta=angle2Theta(startAngle),
    overTheta=angle2Theta(overAngle),
    startX=radius * cos(startTheta),
    startY=radius * sin(startTheta),
    overX=radius * cos(overTheta),
    overY=radius * sin(overTheta),
    large=overAngle-startAngle>180 ? 1:0,
    path=[
        'M',startX,',',startY,
        'A',radius,',',radius,',0,',large,',1,',overX,',',overY
    ].join(''),
    arc=paper.path(path);
```

**再画3/4弧**  

把上边代码中的`overAngle=0`改写成`overAngle=180`。


### 让圆弧从1/4变成3/4

先将计算弧的公式封装成一个函数

```javascript
function getArc(startAngle,overAngle,radius){
    var cos=Math.cos,
        sin=Math.sin,
        angle2Theta=function(angle){return angle * Math.PI / 180;},
        startTheta=angle2Theta(startAngle),
        overTheta=angle2Theta(overAngle),
        startX=radius * cos(startTheta),
        startY=radius * sin(startTheta),
        overX=radius * cos(overTheta),
        overY=radius * sin(overTheta),
        large=overAngle-startAngle>180 ? 1:0,
        path=[
            'M',startX,',',startY,
            'A',radius,',',radius,',0,',large,',1,',overX,',',overY
        ].join('');
    return path;
}
```

然后画一个1/4弧，让它自动变化成3/4弧
```javascript
var arc=paper.path(getArc(-90,0,100))
    .animate({
        path: getArc(-90,180,100)
    },3000);
```

发现这个动作并不是我们想要的，因为路径的相互转化，是由程序进行的，它会先将起始及终止路径，转化成为贝塞尔曲线形式，再在这两个曲线之间，计算点的动作，以最简的运动方式来进行动画。


### `animate`方法

图形可以使用`animate`方法来将它们的`数字型`属性做成动画并演示出来。我们画的弧形，需要增加一个可以作为`数字型`演示动画的属性，来让它按照圆弧的形式伸缩。

### 自定义属性

```javascript
paper.ca.arc=function(startAngle,overAngle,radius){
    var cos=Math.cos,
        sin=Math.sin,
        angle2Theta=function(angle){return angle * Math.PI / 180;},
        startTheta=angle2Theta(startAngle),
        overTheta=angle2Theta(overAngle),
        startX=radius * cos(startTheta),
        startY=radius * sin(startTheta),
        overX=radius * cos(overTheta),
        overY=radius * sin(overTheta),
        large=overAngle-startAngle>180 ? 1:0,
        path=[
            'M',startX,',',startY,
            'A',radius,',',radius,',0,',large,',1,',overX,',',overY
        ].join('');
    return {path:path};
}
```

然后画一个空路径，并赋予它属性，使它变成1/4弧，再让它animate成3/4弧
```javascript
var arc=paper.path('M0,0').attr({
    arc:[-90,0,100]
}).animate({
    arc:[-90,180,100]
},3000);
```

现在我们得到想要的效果了。下一步，为了将它更好地封装，我们将它封装成一个自定义形状。

### 自定义形状

```javascript
Raphael.fn.arc=function(startAngle,overAngle,radius){
    //因为只有这个形状需要用到自定义属性arc，所以把自定义属性也移进来
    //因为自定义属性只需要定义一次，所以先判断它是否存在，再决定是否定义
    if(!this.ca.arc){
        this.ca.arc=function(startAngle,overAngle,radius){
            var cos=Math.cos,
                sin=Math.sin,
                angle2Theta=function(angle){return angle * Math.PI / 180;},
                startTheta=angle2Theta(startAngle),
                overTheta=angle2Theta(overAngle),
                startX=radius * cos(startTheta),
                startY=radius * sin(startTheta),
                overX=radius * cos(overTheta),
                overY=radius * sin(overTheta),
                large=overAngle-startAngle>180 ? 1:0,
                path=[
                    'M',startX,',',startY,
                    'A',radius,',',radius,',0,',large,',1,',overX,',',overY
                ].join('');
            return {path:path};
        }
    }
    return paper.path('M0,0').attr({
        arc:[startAngle,overAngle,radius]
    });
}

var arc=paper.arc(-90,0,100).animate({
    arc:[-90,180,100]
},3000);
```

把它进行一下优化：  
1. 图形的起始圆心不一定在原点上，所以要将圆心参数化  
2. 起始角与终止角必须有限制，即终止角一定大于起始角，且它们的差要在一个周角360度之内  

所以，代码改成如下：  

```javascript
Raphael.fn.arc=function(cx,cy,startAngle,overAngle,radius){
    //因为只有这个形状需要用到自定义属性arc，所以把自定义属性也移进来
    //因为自定义属性只需要定义一次，所以先判断它是否存在，再决定是否定义
    if(!this.ca.arc){
        this.ca.arc=function(cx,cy,startAngle,overAngle,radius){
            while(overAngle-startAngle>360) overAngle-=360;
            while(overAngle-startAngle<0) overAngle+=360;
            var cos=Math.cos,
                sin=Math.sin,
                angle2Theta=function(angle){return angle * Math.PI / 180;},
                startTheta=angle2Theta(startAngle),
                overTheta=angle2Theta(overAngle),
                startX=radius * cos(startTheta) + cx,
                startY=radius * sin(startTheta) + cy,
                overX=radius * cos(overTheta) + cx,
                overY=radius * sin(overTheta) + cy,
                large=overAngle-startAngle>180 ? 1:0,
                path=[
                    'M',startX,',',startY,
                    'A',radius,',',radius,',0,',large,',1,',overX,',',overY
                ].join('');
            return {path:path};
        }
    }
    return paper.path('M0,0').attr({
        arc:[cx,cy,startAngle,overAngle,radius]
    });
}
//除了角度外，还可以让它的圆心位置及半径也动起来
var arc=paper.arc(50,50,-90,0,50).animate({
    arc:[100,100,-90,180,100]
},3000);
```

### 闭合图形

有的时候，我们不仅仅是要画一条弧线，还有可能是需要画一个扇形，所以我们需要让弧线在正确的位置闭合。闭合的方法就是：画完弧之后，让它画一条直线回到圆心，再使用`z`指令闭合这个路径。

```javascript
//把是否闭合也参数化
Raphael.fn.arc=function(cx,cy,startAngle,overAngle,radius,closed){
    //因为图形是否闭合是布尔值属性，不是数字型属性，所以不写入自定义属性内。
    if(!this.ca.arc){
        this.ca.arc=function(cx,cy,startAngle,overAngle,radius){
            while(overAngle-startAngle>360) overAngle-=360;
            while(overAngle-startAngle<0) overAngle+=360;
            var cos=Math.cos,
                sin=Math.sin,
                angle2Theta=function(angle){return angle * Math.PI / 180;},
                startTheta=angle2Theta(startAngle),
                overTheta=angle2Theta(overAngle),
                startX=radius * cos(startTheta) + cx,
                startY=radius * sin(startTheta) + cy,
                overX=radius * cos(overTheta) + cx,
                overY=radius * sin(overTheta) + cy,
                large=overAngle-startAngle>180 ? 1:0,
                path=[
                    'M',startX,',',startY,
                    'A',radius,',',radius,',0,',large,',1,',overX,',',overY
                ];
            closed && path.push('L',cx,',',cy,'Z');
            return {path:path.join('')};
        }
    }
    return paper.path('M0,0').attr({
        arc:[cx,cy,startAngle,overAngle,radius]
    });
}
//除了角度外，还可以让它的圆心位置及半径也动起来
var arc=paper.arc(50,50,-90,0,50,true).animate({
    arc:[100,100,-90,180,100]
},3000);
```


到这里，我们的这个自定义的扇形就绘制完成了。  
end of file
