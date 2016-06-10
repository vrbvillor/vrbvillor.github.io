# 多级伸缩导航效果

[特效预览](http://vrbvillor.github.io/effects/mosaic/mosaic.html)

## 函数使用

```javascript
var object = CHImosaic(sJQcontainer);
```

## 构造参数

### sJQcontainer 容器

此容器一定要有背景图片，且足够大（不然出来的效果不好看），函数会计算它内部子元素的数量及位置，把容器上的图片分别布置到子元素的背景上，并按它们的位置对齐到背景的确定位置上，形成碎片的拼图效果。

> 暂时不支持`background-position`跟`background-size`等对背景的影响