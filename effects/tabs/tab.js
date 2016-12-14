/*
sJQcontainer，要使用本效果的容器的JQ选择器字符串
sJQtitles，在$(sJQcontainer)上使用find查找，各标题栏的选择器字符串，点击它们会使对应的内容栏收缩或展开
sJQcontents，在$(sJQcontainer)上使用find查找，各内容栏的选择器字符串，它们是会显示或隐藏的部分
oOptions，附加参数列表对象，可以使用的属性有
	.way，激活方式，默认为mouseenter，即鼠标悬停时产生效果，还可以为click
	.auto，自动播放，默认为true
	.delay，自动播放的间隔，默认为3000
	.mstop，鼠标悬停时播放停止，默认为true
oCallbacks，回调函数列表对象，可以使用的属性有
	.init(oJQtitle0,oJQcontent0)，完成初始化时执行的函数，不可以直接使用生成的对象名
	.hide(oJQtitles_hide,oJQcontents_hide)，每一次缩回时执行的函数，参数是被隐藏的标题栏及内容栏的JQ对象
	.show(oJQtitle_show,oJQcontent_show)，每一次展开时执行的函数，参数是被显示的标题栏及内容栏的JQ对象
如果生成有名对象的话，可以调用的方法有
	.show(index)，激活第index个标题，显示第index个内容
	.start()，开始自动播放，使用后auto被设置为true
	.stop()，暂停自动播放，使用后auto被设置为false
被激活的标题栏被附加class="cur"
*/
function CHItab(sJQcontainer, sJQtitles, sJQcontents, oOptions, oCallbacks) {
	if (!sJQcontainer || !$(sJQcontainer).size() || !sJQtitles || !sJQcontents) return;
	if (!oOptions) oOptions = {};
	if (!oCallbacks) oCallbacks = {};

	function isPos(n) {
		return n && /^[\+]?[0]*[1-9][\d]*$/.test(n);
	}

	var piDelay = isPos(oOptions.delay) ? oOptions.delay : 3000,
		bMouseStop = "mstop" in oOptions ? Boolean(oOptions.mstop) : true,
		bAuto = oOptions.auto ? oOptions.auto : false,
		sWay = ~ ['click', 'mouseenter'].indexOf(oOptions.way) ? oOptions.way : 'mouseenter',
		oResult = {},
		oJQcontainer = $(sJQcontainer).eq(0),
		oJQtitles = oJQcontainer.find(sJQtitles),
		oJQcontents = oJQcontainer.find(sJQcontents),
		niCurrent = 0,
		piLength = oJQtitles.size();


	oJQtitles[sWay](function() {
		oResult.show(oJQtitles.index($(this)));
	})
	oResult.show = function(index) {
		off();
		index += piLength;
		index %= piLength;
		oJQtitles.eq(niCurrent).removeClass("cur");
		oJQcontents.eq(niCurrent).hide();
		if (oCallbacks.hide) oCallbacks.hide(oJQtitles.eq(niCurrent), oJQcontents.eq(niCurrent), niCurrent);
		niCurrent = index;
		$(oJQtitles).eq(niCurrent).addClass("cur");
		oJQcontents.eq(niCurrent).show();
		if (oCallbacks.show) oCallbacks.show(oJQtitles.eq(niCurrent), oJQcontents.eq(niCurrent), niCurrent);
		if (bAuto) on();
	}
	var timer = 0;

	function on() {
		if (!timer) timer = setTimeout(oResult.next, piDelay);
	}

	function off() {
		clearTimeout(timer);
		timer = 0;
	}
	oResult.start = function() {
		bAuto = true;
		on();
	};
	oResult.stop = function() {
		bAuto = false;
		off();
	};
	if (bMouseStop) oJQcontainer.mouseleave(function() {
		if (bAuto) on()
	}).mouseenter(off);
	oResult.next = function() {
		oResult.show(niCurrent + 1);
	};
	oResult.prev = function() {
		oResult.show(niCurrent - 1);
	};

	oJQcontents.not(":first").hide();
	oJQtitles.eq(0).addClass('cur');
	if (bAuto) oResult.start();
	if (oCallbacks.init) oCallbacks.init(oJQtitles.eq(0), oJQcontents.eq(0));
	return oResult;
}