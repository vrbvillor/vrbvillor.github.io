# 仿3D效果（未成熟）

## DOM第一视角
[预览链接](http://vrbvillor.github.io/views/3Dstage-first.html)

就像拿着相机在一个3D空间中行走的样子。鼠标默认是平移镜头，左键拖拽向上下左右为平移镜头（景物会反向移动），滚轮上下滚为镜头前进或后退（景物会变近或远）。
按一下滚轮，切换成旋转镜头。左键拖拽向上下左右为旋转镜头（景物会转向相反的方向），滚轮上下滚动为以视线为轴垂直于画面旋转镜头（景物会平面旋转）。

## DOM第三视角
[预览链接](http://vrbvillor.github.io/views/3Dstage-third.html)

就像对着一个物体，从各个角度观察它一样。鼠标控制拖拽旋转，是把物体往某个方向转的效果，滚轮上下为平转镜头。这个效果可以用于展示一些相同类别的图标，最好使用正多面体，点的分布会比较均匀。

## SVG正12面体日历
[预览链接](http://vrbvillor.github.io/views/calendar.html)
进去后，点击12个小圆，可以切换到代表那一个月份的面。每个面都是有固定朝向的，每相邻两个月都是相邻的两个正五边形。日历数字的显示并没有写。