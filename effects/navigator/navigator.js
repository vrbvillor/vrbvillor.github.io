/*
导航与内容滚动监听效果，可以处理变化尺寸的内容，但暂时不支持动态添加的内容
sJQnavs，查找到导航项目的JQ字符串
sJQcontents，查找到内容项目的JQ字符串
oOptions，配置参数集合对象，可以使用的属性有
    dir，默认为v，纵向，还可以为h横向
    offset，偏移，默认为0，为正数的话会延后响应，为负数的话会提前响应（一般为负数，以适应顶部的静止化导航遮挡的部分）
oCallbacks，回调函数集合对象，可以使用的属性有
    init()，初始化完成时执行的函数，只发生在window.onload事件上
    show()，显示事件发生时的函数，仅当有新的项目被显示出来的时候才发生，函数的this语境是刚被显示出来的导航项目
    hide()，隐藏事件发生时的函数，仅当有新的项目被显示出来的时候才发生，函数的this语境是刚被隐藏掉的导航项目
    （重复点击被显示出来的内容则不会发生，在同一内容区域滚动时也不会发生）
*/
function CHInavigator(sJQnavs, sJQcontents, oOptions, oCallbacks) {
	var timer = 0,
		oJQnavs = $(sJQnavs),
		oJQcontents = $(sJQcontents);
	if (!oJQnavs.length || !oJQcontents.length) return false;
	if (!$.isPlainObject(oOptions)) oOptions = {};
	var dir = /^h$/i.test(oOptions.dir) ? 'h' : 'v',
		scrollAttr = dir == 'v' ? 'scrollTop' : 'scrollLeft',
		offsetAttr = dir == 'v' ? 'top' : 'left',
		offset = isNaN(oOptions.offset) ? 0 : parseInt(oOptions.offset);
	if (!$.isPlainObject(oCallbacks)) oCallbacks = {};
	//绑定到窗口的load及scroll事件上
	$(window).on('load scroll', function(event) {
		clearTimeout(timer);
		timer = 0;
		timer = setTimeout(judge, 100);
		if (event.type == 'load' && $.isFunction(oCallbacks.init)) oCallbacks.init();
	});
	//导航项目的点击，为了保证偏移的正确显示，屏蔽掉锚链接的默认行为，而改成手动滚动窗口
	oJQnavs.click(function() {
		if ($(this).hasClass("cur")) return true;
		var index = oJQnavs.index(this);
		light(index);
		var offsetLength = oJQcontents.eq(index).offset()[offsetAttr] + offset,
			oAnimate = {};
		oAnimate[scrollAttr] = offsetLength;
		$("html,body").animate(oAnimate);
		return false;
	});
	//点亮导航项目

	function light(index) {
		var THAT = oJQnavs.filter(".cur"),
			piCur = oJQnavs.index(THAT),
			THIS = oJQnavs.eq(index).addClass("cur");
		if (index != piCur) { //显示出来的与隐藏掉的不为同一项目时才发生事件
			if ($.isFunction(oCallbacks.show)) oCallbacks.show.call(THIS);
			if ($.isFunction(oCallbacks.hide)) oCallbacks.hide.call(THAT);
			THAT.removeClass("cur");
		}
	}
	//判断当前显示的内容范围

	function judge() {
		var scrollLength = $(window)[scrollAttr](),
			piCurrent = 0,
			piLength = oJQcontents.length;
		for (var n = 0; n < piLength; n++) {
			if (oJQcontents.eq(n).offset()[offsetAttr] + offset > scrollLength) {
				n--;
				break;
			}
		}
		piCurrent = n < 0 ? 0 : (n >= piLength ? piLength - 1 : n);
		light(piCurrent);
	}
}