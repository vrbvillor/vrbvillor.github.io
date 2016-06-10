/*
拼图背景效果
sJQcontainer，容器的JQ选择器字符串
代码会将容器的背景图片，按照子元素的位置分别进行摆放，形成马赛克的拼图效果
*/
function CHImosaic(sJQcontainer) {
	var oContainer = $(sJQcontainer),
		oItems = oContainer.children(),
		piLength = oItems.length,
		sImageUrl = oContainer.css('background-image');
	oContainer.css('background-image', 'none');
	if (!piLength) return;
	var offset = oContainer.offset(),
		padLeft = parseInt(oContainer.css('padding-left')),
		padTop = parseInt(oContainer.css('padding-top')),
		left = offset.left - padLeft,
		top = offset.top - padTop;
	oItems.each(function(index, el) {
		var obj = $(this),
			xy = obj.offset(),
			x = xy.left - left,
			y = xy.top - top;
		obj.css({
			backgroundImage: sImageUrl,
			backgroundPosition: -x + 'px ' + -y + 'px'
		});
	});
}