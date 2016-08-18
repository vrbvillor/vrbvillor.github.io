# 网站项目开发概要

## 基本流程

### 网站定位

一般由网站的所有者决定：

+ 行业定位：决定网站是面向哪个行业的（金融、百货、旅游、游戏）
+ 面向客户：网站面向的族群是哪些人（母婴、女性、求职者、师生）
+ 主要内容：网站中的主要内容是哪些（新闻、产品、招聘）
+ 展示形式：展示信息所使用的模式（社区、论坛、博客、商城）

### 定义需求

一般由制作方的产品部提出：

+ 模块划分：网站主要是由哪些部分组成（展示部分、用户中心、购物模块）
+ 内容布置：每个模块中需要布置哪些内容（产品列表、推荐、最新资讯）
+ 适应群体：由面向客户决定（移动端、手机应用、PC站｜兼容性）

### 制作流程

一般由制作方的技术部承担：

+ 原型定制：主要由产品部来决定（页面布局、功能设置、交互设置）
+ 设计图稿：主要由设计部来制作（搜集素材、效果图、矢量资源）
+ 页面制作：主要由前端来完成（切图、布局、交互、特效、数据传输）
+ 业务逻辑：主要由后台来完成（所使用语言、数据库、逻辑代码）

### 产品维护

一般由网站的所有者与制作方配合完成：

+ 数据录入：一般由网站所有者完成（测试信息、正式信息）
+ 产品测试：一般由制作方完成、或由制作方配合所有者完成（BUG、不足、友好性）
+ 域名空间：一般由网站所有者配合制作方完成（空间、域名、备案、上传、版本迭代）

### 运营推广

一般由网站所有者执行：

+ SEO推广：关键字优化、网站标题及介绍、内容的定时更新、软文及水军
+ 引擎付费：向搜索引擎进行付费推广
+ 订单处理：一般是购物型网站才有本步骤，由经营者自行分配人员专门处理
+ 售后服务：一般是购物型网站才有本步骤，由经营者自行分配人员专门处理
+ 客户维系：定期向客户推送新消息、电话回访客户、活动赠送礼品


## 前端职责

### 与设计师配合

+ 真实还原设计稿
+ 注意浏览器的兼容性
+ 注意浏览设备的适配性

### 页面效果注重

+ 在尽可能保证质量的前提下，降低单页资源占用量
+ 页面运行流畅
+ 交互效果友好、简单
+ 提升用户体验

### 与后台配合

+ 减少不必要的同步数据以加快页面响应速度（将不需要SEO的内容设置成异步内容、或使用JS写入）
+ 减少服务器请求次数（资源合并、静态化资源、缓存资源）
+ 即时的数据响应（Ajax异步调用、MVVM/MVC刷新DOM、使用轮询）
+ 减少数据库的负担（静态化数据——额外添加的，这个是后台职责）


## 制作步骤

### 部署

+ 老式的资源类型分类部署方案，方便批量管理资源，但不利于大型内容的修改  
	
	```html
	\images---- x.jpg y.png z.gif...
	\audios---- h.mid i.wma j.mp3...
	\videos---- a.mp4 b.flv c.mpeg d.swf...
	\script----           index.js
	       ---- \ucenter
	\style----- css.css   index.css
	      ----- \ucenter
	\less------ css.less  index.less
	     ------ \uceter
	\ucenter--- ...
	```

+ 新式的模块化部署方案，任意增减所需要的模块，但不容易分配合适的静态资源

	```html
	\header---- header.html header.css header.js
	       ---- \nav \umenu \search
	\footer---- footer.html footer.css
	       ---- \nav \copyright \gotop
	\sidebar--- \nav \contact
	\menu------ menu.html  menu.css  menu.js
	\index----- index.html index.css index.js
	\list------ list.html  list.css  list.js
	```

### 切图

前端收到设计师递过来的设计图后，最好要先通篇观察一下，然后再适当地将PSD图切割成所需的图片资源  

+ PNG/GIF/JPG格式的图片的特性，优缺点，适用范围  

    图片格式 | 半透明 | 全透明 | 动画 | 高质量 | 用途
    ---------| ------ | ------ | ---- | ------ | ----
    PNG32 | 可 | 可 | 不可 | 可 | 透明图片及图标
    PNG8 | 可 | 可 | 不可 | 不可 | 兼容IE6的PNG
    JPG | 不可 | 不可 | 不可 | 可 | 高清高质量图
    GIF | 不可 | 可 | 可 | 不可 | 动图、像素图标
    
+ 制作精灵图，SPRITE图，减少图片数量即减少请求服务器次数、用作非平铺背景图片 

    **精灵图示例**  
    ![精灵图示例](http://vrbvillor.github.io/fruits/fruits.png)
    **精灵图用法1：将精灵图用作背景**  
    ![将精灵图用作背景](http://vrbvillor.github.io/lessons/sprite1.jpg)
    **精灵图用:2：移动背景到指定位置**  
    ![移动背景到指定位置](http://vrbvillor.github.io/lessons/sprite2.jpg)
    
+ Base64码，可以编码任何类型的文件，但是文件大小会变大1/3  

    ```html
    小西瓜图片的BASE64编码：
    <img width="100" height="100" src="http://vrbvillor.github.io/lessons/sprite1.jpg" />
    <img width="100" height="100" src="data:image/jpeg;base64,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">
    ```

+ 矢量图标字体  

    图标形式 | 单色彩 | 多色彩 | 变色
    -------- | ------ | ------ | ----
    图片 | 可 | 可 | 不可
    字体 | 可 | 不可 | 可
    
    **SVG图标字体**  
    ![SVG图标字体](http://vrbvillor.github.io/lessons/SVGicons.png)

### 布局

根据兼容性及适配性要求，采用适当的布局方法  

+ HTML+CSS及HTML5+CSS3布局的区别  

    制作方法 | 低端兼容 | 高端特效 | 适配多种设备
    -------- | -------- | -------- | ------------
    HTML+CSS | 可 | 不可，需要用JS | 勉强可以，需要用JS
    HTML5+CSS3 | 不可 | 可，用CSS3 | 可，用Media Query

+ HTML标签，语义性对SEO的影响，代码层级尽可能少以降低冗余并加快页面调用  

    HTML标签 | 语义 | 权重 | 可重复
    -------- | ---- | ---- | ------
    title | 网站标题 | 很重 | 不可
    meta | 网站描述 | 很重 | 可（不同项目）
    h1 | 内容标题 | 很重 | 不可
    h2 | 二级标题 | 重 | 可使用2次
    h3 | 三级标题 | 有 | 任意
    h4~h6 | 四~六级标题 | 极小 | 任意
    em | 强调 | 有 | 少量
    strong | 着重 | 有 | 少量
    b | 加粗 | 无 | 任意
    i | 斜体 | 无 | 任意
    dl/dt/dd | 描述列表 | 小 | 任意
    ul/ol/li | 项目列表 | 小 | 任意
    a | 链接 | 有 | 任意，但要控制外链数量
    p | 段落 | 小 | 任意
    span | 装饰文字 | 无 | 任意

+ CSS兼容，低端兼容使用条件性注释引入兼容样式表文件，CSS HACK的缺点  

	```html
	<!--[if lt IE 7 ]><html class="ie6" lang="zh-cn"><![endif]-->
	<!--[if gte IE 7 ]><html class="ie7" lang="zh-cn"><![endif]-->
	<!--[if IE 8 ]><html class="ie8" lang="zh-cn"><![endif]-->
	<!--[if lte IE 9 ]><html class="ie9" lang="zh-cn"><![endif]-->
	<!--[if (gt IE 9)|!(IE)]><!--><html class="" lang="zh-cn"><!--<![endif]-->
	```
	
	比较符 | 全称 | 含义
	------ | ---- | ----
	无 | 无 | 等于
	lt | less than | 小于
	lte | less than or equal to | 小于等于
	gt  | greater than | 大于
	gte | greater than or equal to | 大于等于
	竖线 | or | 或者
	叹号 | not | 不等于
	
	[点击查看CSS HACK方法](https://github.com/CHIheart/CHIanimate/blob/master/CSSHACK.html)


### 特效

根据兼容性来决定，使用CSS/JS/图片来制作特效  

+ 最优先采用CSS制作，CSS3使用GPU计算样式的速度最快  

    浏览器版本 | CSS3 | 2D转换 | 3D转换、过渡及帧动画
    ---------- | ---- | ------ | --------------
    IE678 | 否 | 否 | 否
    IE9 | 是 | 是 | 否
    IE10-11 | 是 | 是 | 是
    四大浏览器 | 是 | 是 | 是

+ 如果无法达到的则采用JS制作，JS是纯文本，占用浏览器资源小  

    > 使用jQuery或Zepto来操作DOM进行过渡类动画  
    > 使用Raphael或Snap.svg来操作矢量元素进行动画

+ GIF动画则需要使用图片来制作  

    **GIF动画**  
    ![GIF动画](http://vrbvillor.github.io/lessons/gif.gif)

+ 更大的高清图动画，需要使用PNG或JPG格式的序列帧动画

    **序列帧**  
    ![序列帧](http://vrbvillor.github.io/effects/sprite/1.jpg)  
    ![序列帧](http://vrbvillor.github.io/effects/sprite/2.jpg)  
    ![序列帧](http://vrbvillor.github.io/effects/sprite/3.jpg)  
    ![序列帧](http://vrbvillor.github.io/effects/sprite/4.jpg)  
    ![序列帧](http://vrbvillor.github.io/effects/sprite/5.jpg)  
    ![序列帧](http://vrbvillor.github.io/effects/sprite/6.jpg)  
    ![序列帧](http://vrbvillor.github.io/effects/sprite/7.jpg)  
    ![序列帧](http://vrbvillor.github.io/effects/sprite/8.jpg)  
    
    [**播放效果**](http://vrbvillor.github.io/effects/sprite/sprite.html)  
    
+ 有些情况则需要多种方法配合使用  

### 数据

需要前后端共同完成  

+ 同步数据由后台程序运算后，与HTML代码同时返回客户端，显示页面上，同步数据对SEO友好，但影响页面显示速度  
+ 异步数据由前端向服务器发送请求，再经后台程序运算后返回客户端，由前端程序运算后显示在页面上，异步对SEO不友好但可以加快页面显示速度  
+ 一般使用Ajax+JSON来传输数据，使用MVVM/MVC框架来刷新页面  
+ 数据的静态化文件，将不经常改变的数据静态化，例如全国地址库  

### 优化

+ 4种图片格式的优劣  
+ 图片资源的合并与压缩  
+ 矢量图标的好处  
+ HTML标签对SEO的影响  
+ CSS要优先于JS显示以加快速度，以页面正常显示为优先，再考虑功能性  
+ JS代码分块后的合并与压缩，分块后请求次数变多，合并后只请求1次  
+ 静态资源库的使用CDN，可以不占用本地资源，浏览时可能免下载  

## 准备工具

### 图片编辑软件

+ 图片查看工具（2345看图器、美图秀秀）  
+ Photoshop（功能强大、设计师专用、效果及插件众多）  
+ Fireworks（容易上手、制作矢量素材与精灵图方便）  
+ 图片压缩工具（http://tinypng.org/）  
+ 矢量图标生成字体（https://icomoon.io/app/） 

### 代码编辑软件

+ Dreamweaver（可视化图形界面、站点管理、样式自动生成）  
+ Sublime（小巧轻便、插件多、适合各种语言的编辑）  
+ UltraEdit、Eclipse、Webstorm、VisualStudio等  

### 预编译语言

+ HTML->Jade
+ CSS->Less/Sass
+ JS->CoffeeScript

### 库/框架/插件

+ JQuery/Zepto/Prototype（操纵DOM的神器，简单易学，功能强大）  
+ SeaJS/RequireJS/CommonJS（JS代码模块化工具，自动处理依赖）  
+ Bootstrap/JQUI/JQMobile（CSS框架，可以快速制作简单的网站页面）  
+ Angular/Vue/React（MVVM框架，可以免除自己手动处理数据更新DOM的操作）  
+ Raphael/Snap.svg/Two.js（SVG矢量框架，可以更方便地绘制矢量图形）  
+ JCanvas/Stage.js/Three.js（Canvas矢量框架，可以绘制高刷新率的矢量图形）  

### 浏览器

+ 主流浏览器：火狐、谷歌、苹果、欧鹏  
+ IE浏览器：低端（IE678），高端（IE9/IE10-11），IETester  
+ 国产浏览器：单核、双核  

### 其它工具

+ 调试工具（Firebug、Webkit的开发者工具）  
+ 模块打包工具（Grunt、Webpack）  
+ Node.js（管理安装包、在服务器端运行JS、管理库的依赖）  
+ 网站资源管理：GIT、SVN  
+ 工作流程管理：禅道、蒲公英  