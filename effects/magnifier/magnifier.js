/*
sJQimg，图片的JQ选择器，一定要是一个img元素
setOptions，配置集合对象，可以使用的键有
	width，放大框的宽，默认为100
	height，放大框的高，默认为100
	position，放大框相对于源元素的位置，默认为‘right’，还可以为left/top/bottom
	data，被放大元素放置原始图片路径的data属性，默认为primary，即data-primary
	x，放大框的水平位置偏移，正右，负左，默认为0
	y，放大框的垂直位置偏移，正下，负上，默认为0
*/
function CHImagnifier(sJQimg, setOptions) {
	var img, //小图JQ对象
	IMG, //大图JQ对象
	//放大镜的框
	MAGNIFIER = $("<div/>").css({
		position: 'absolute',
		border: '1px solid silver',
		visibility: 'hidden',
		overflow: 'hidden'
	}),
		//图上移动的小块
		BLOCK = $("<div/>").css({
			position: 'absolute',
			backgroundColor: 'rgba(255,255,255,.3)',
			border: '1px solid white'
		});

	MAGNIFIER.appendTo("body");
	BLOCK.appendTo("body");
	//根据原始图片的尺寸，计算小放大框的比例

	function calculate() {
		if (!IMG.width()) return;
		BLOCK.css({
			width: img.width() * MAGNIFIER.width() / IMG.width(),
			height: img.height() * MAGNIFIER.height() / IMG.height()
		}).show();
		MAGNIFIER.css({
			visibility: 'visible'
		}).show();
	}
	//夹值

	function clamp(minValue, value, maxValue) {
		value = Math.max(minValue, value);
		value = Math.min(maxValue, value);
		return value;
	}

	//鼠标在图片范围内移动时保持放大效果

	function mouseMove(event) {
		//鼠标移动的范围边界
		var x = event.pageX,
			y = event.pageY,
			width = img.width(),
			height = img.height(),
			left = img.offset().left,
			top = img.offset().top,
			right = left + width,
			bottom = top + height;
		if (x < left || x > right || y < top || y > bottom) {
			$(document).off("mousemove", mouseMove);
			BLOCK.hide();
			MAGNIFIER.hide();
			return;
		};
		//小放大框的范围边界
		var blkWidth = BLOCK.outerWidth(),
			blkHeight = BLOCK.outerHeight(),
			blkLeft = x - blkWidth / 2,
			blkTop = y - blkHeight / 2;
		BLOCK.show().css({
			left: clamp(left, blkLeft, right - blkWidth),
			top: clamp(top, blkTop, bottom - blkHeight)
		});

		//放大镜里边的原图移动
		MAGNIFIER.show().find("img").each(function(index, el) {
			$(this).css({
				marginLeft: -$(this).width() * (parseFloat(BLOCK.css("left")) - left) / width,
				marginTop: -$(this).height() * (parseFloat(BLOCK.css("top")) - top) / height
			});
		});
	}
	if (!$.isPlainObject(setOptions)) setOptions = {};
	var defaultOptions = {
		width: 100,
		height: 100,
		position: 'right',
		data: 'primary',
		x: 0,
		y: 0
	};
	$.extend(true, defaultOptions, setOptions);
	//鼠标经过图片即更换聚焦目标
	$(sJQimg).mouseenter(function(event) {
		img = $(this);
		var imgWidth = img.outerWidth(),
			imgHeight = img.outerHeight(),
			imgOffset = img.offset(),
			imgLeft = imgOffset.left,
			imgTop = imgOffset.top,
			magAt = defaultOptions.position,
			magWidth = defaultOptions.width,
			magHeight = defaultOptions.height;
		if ($.isFunction(magAt)) magAt = magAt(this);
		if ($.isFunction(magWidth)) magWidth = magWidth(this);
		if ($.isFunction(magHeight)) magHeight = magHeight(this);
		//放大框尺寸及位置
		MAGNIFIER.css({
			width: magWidth,
			height: magHeight,
			left: (function() {
				switch (magAt) {
				case "top":
				case "bottom":
					return imgLeft;
				case "left":
					return imgLeft - magWidth;
				case "right":
					return imgLeft + imgWidth;
				}
			})() + defaultOptions.x,
			top: (function() {
				switch (magAt) {
				case "left":
				case "right":
					return imgTop;
				case "top":
					return imgTop - magHeight;
				case "bottom":
					return imgTop + imgHeight;
				}
			})() + defaultOptions.y
		});
		var src = img.data(defaultOptions.data);
		if (!src) {
			console.error("There missed a data-" + defaultOptions.data + " on <img src='" + img.attr("src") + "'>");
			return false;
		}
		IMG = $("<img/>").attr("src", src);
		IMG.each(function(index, el) {
			if (this.complete) calculate();
			$(this).load(calculate);
		});
		MAGNIFIER.empty().append(IMG);
		$(document).mousemove(mouseMove);
	});
}