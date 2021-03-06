# 像素字幕编辑器（不成熟版）

使用矢量绘图制作，编辑器必须使用现代浏览器或IE9+，像素本身效果可以兼容低端（但效果不太好）。

[像素效果预览](http://vrbvillor.github.io/pixels/demo.html)
[像素编辑器IE9+](http://vrbvillor.github.io/pixels/)

--------------------
使用手册

## 系统设置标签

###像素尺寸
就是每个单元的尺寸，是正方形的，可以做大像素，也可以做小像素  

###画布尺寸
就是整个画布的尺寸，必须是像素尺寸的整数倍。  
    > 如果像素尺寸或画布尺寸改变的话，内容会重新排列，按照原来的样子，如果多出来的位置就补白（默认色），如果原来有内容的话就会被割除（丢失）  

### 设置
改变上边的尺寸数字后，需要点击设置才会生效  

### 重置
未点击设置之前，改变回修改数字之前的数字  

## 所有帧标签

### 缩略图列表
画布缩略图列表：是每一帧的缩略图，等比例缩小的效果，周围有灰色边框的是当前帧，当帧多于一的时候，鼠标指向帧会有操作条：上移、下移、删除  

**上移**或**下移**：改变帧的顺序，在预览及播放时会按这个顺序播放  
**删除**：删除这一帧的所有数据（不会删除这一帧上添加的色块）  

### 创建新帧
在列表尾追加一帧空帧，并定位到这一新帧上。创建数量没有限制。

### 播放预览
把现在编辑的内容播放出来，在播放时不可以修改内容，必须要先停止预览才可以。

### 导入数据
需要特定格式的数据，把点阵导入进来，如果是多帧的话就会导入多帧。把数据粘在出现的文本域中，点击确定。**会替换掉当前的所有内容。**

### 导出数据
把当前的点阵数据导出，不包括调色版数据。点击后，文本域中的内容就是点阵数据。

### 清空数据
就是把当前所有的内容都清除掉，不会清除掉调色版数据。


## 当前帧标签
显示的就是在所有帧标签中有灰色外框的那一帧的设置。

### 画面背景
隐藏在画布后边的颜色，在帧与帧转换的过程中会看到的背景的背景色。

### 默认颜色
画布最先显示的颜色，是内容的背景色，是“补白”的色彩。

### 重设颜色
修改过画面背景或默认颜色之后，点击设置才会生效。原来补白的颜色会替换成新的默认颜色。但通过点击生成的与默认颜色一样的颜色，不会被转换成新色。

### 动画模式
每一个像素转换到下一个像素的方式。每一帧只能有一种转换方式。可以点击预览来查看每一种的效果，或点击一个色块来查看局部的小效果。

### 复制本帧
将当前帧复制，追加到队尾（成为最后一帧）。

### 删除本帧
与所有帧列表上的缩略图上的**删除**功能相同。

## 调色盘

### 颜色列表
默认是METRO风格的配色板，点击色块，它会成为当前的前景色。点击画布，会把被点击像素设置成当前的这个颜色。

### 当前颜色
当前前景色的HEX值，点击文本框后出现调色版。在RGB值上调节，如果调节到的是已有的颜色，会在颜色列表上选中这个颜色。RGB值不仅可以滑动颜色条，还可以在后边的文本框中输入数字，0~255。在下边的左边，是颜色预览，右边可以输入一个HEX值，点击确定颜色后，HEX值会被设置到当前颜色上。如果是新颜色，会在旁边出现“★NEW”字样。下边的“可添加颜色”会变成可用状态。

### 可添加颜色
在上边调节出新颜色后，需要点击本按钮，才可以添加到调色版上，只有在调色版里边的颜色，才可以被应用到画布上。

### 删除颜色
删除在颜色列表中已经选中的颜色。如果该颜色出现在点阵中，那么这个颜色会被设置成默认色（前景的背景色）。

### 批量添加
点击后，提示输入框，在里边输入合法的HEX值，多个用半角逗号隔开，点击确定后会被添加到颜色列表中。

### 清空调色盘
清空当前颜色列表，等同于在所有颜色上点击删除，会把已有的颜色设置成默认色。

### 导入调色盘
导入一个颜色数据表，会覆盖当前的调色盘。会用新颜色替换掉所有已经设置的颜色。

### 导出调色盘
导出当前的颜色列表。