/*
页面任意位置浮动框
sJQdom，要执行本效果的元素的JQ选择器字符串
oOptions，附加参数列表对象，可以使用的属性有
	top，bottom，left，right为四项边距，可为0
	top/bottom只有一项有效，另一项需要为空，同样规则适用于left/right，有效值的那项值必须非负
	minTop，最小顶边距，当元素顶边距大于最小顶边距时，DOM浮动，如果小于时，DOM则停在该处
	minLeft，最小左边距，当元素左边距大于最小左边距时，DOM浮动，如果小于时，DOM则停在该处
	maxTop，最大顶边距，当元素顶边距小于最大顶边距时，DOM浮动，如果大于时，DOM则停在该处
	maxLeft，最大左边距，当元素左边距小于最大左边距时，DOM浮动，如果大于时，DOM则停在该处
	以上8项参数都可以使用有return的函数
	fix，使用fix模式，即不会出现滑动的样子，而是静止的

oCallbacks，回调函数对象，里边可以调用本特效的某些属性，前提是需要本函数生成实名对象
	.init(oJQdom)，初始化后的回调函数，oJQdom就是本效果执行的JQ对象
	.move(oJQdom)，每步浮动的回调函数，oJQdom就是本效果执行的JQ对象

默认为左上浮动，边距为0，最小边距默认为0
*/
function CHIfloat(sJQdom, oOptions, oCallbacks) {
	if (!sJQdom || !$(sJQdom).size()) return;
	if (!oOptions) oOptions = {};
	if (!oCallbacks) oCallbacks = {};

	function isFun(n) {
		return n instanceof Function;
	}

	function isPos(n) {
		return n && /^[\+]?[0]*[1-9][\d]*$/.test(n);
	}

	function int(n) {
		return parseInt(n);
	}

	var oResult = {},
		oJQdom = $(sJQdom).eq(0).css({
			"position": "absolute"
		}),
		timer = 0,
		bFixed = oOptions.fix ? oOptions.fix : false;
	var iTop, iBottom, iLeft, iRight, iMinTop, iMaxTop, iMinLeft, iMaxLeft;
	if (oOptions) {
		if ("top" in oOptions) iTop = isFun(oOptions.top) ? oOptions.top : int(oOptions.top);
		else if ("bottom" in oOptions) iBottom = isFun(oOptions.bottom) ? oOptions.bottom : int(oOptions.bottom);
		else iTop = 0;

		if ("left" in oOptions) iLeft = isFun(oOptions.left) ? oOptions.left : int(oOptions.left);
		else if ("right" in oOptions) iRight = isFun(oOptions.right) ? oOptions.right : int(oOptions.right);
		else iLeft = 0;

		if ("minTop" in oOptions) iMinTop = isFun(oOptions.minTop) ? oOptions.minTop : int(oOptions.minTop);
		if ("maxTop" in oOptions) iMaxTop = isFun(oOptions.maxTop) ? oOptions.maxTop : int(oOptions.maxTop);
		if ("minLeft" in oOptions) iMinLeft = isFun(oOptions.minLeft) ? oOptions.minLeft : int(oOptions.minLeft);
		if ("maxLeft" in oOptions) iMaxLeft = isFun(oOptions.maxLeft) ? oOptions.maxLeft : int(oOptions.maxLeft);
	} else iTop = iLeft = iMinTop = iMinLeft = 0;

	oResult.move = function() {
		var oWin = $(window),
			iWinWidth = oWin.width(),
			iWinHeight = oWin.height(),
			iScrollLeft = oWin.scrollLeft(),
			iScrollTop = oWin.scrollTop(),
			xy = oJQdom.position(),
			iX = xy.left,
			iY = xy.top,
			iDomWidth = oJQdom.outerWidth(true),
			iDomHeight = oJQdom.outerHeight(true),
			iNewX, iNewY, iNowLeft, iNowTop, iNowRight, iNowBottom,
			iNowMinLeft, iNowMinTop, iNowMaxLeft, iNowMaxTop;

		if (iLeft !== undefined) iNowLeft = isFun(iLeft) ? iLeft() : iLeft;
		if (iRight !== undefined) iNowRight = isFun(iRight) ? iRight() : iRight;
		if (iBottom !== undefined) iNowBottom = isFun(iBottom) ? iBottom() : iBottom;
		if (iTop !== undefined) iNowTop = isFun(iTop) ? iTop() : iTop;

		if (iMinLeft !== undefined) iNowMinLeft = isFun(iMinLeft) ? iMinLeft() : iMinLeft;
		if (iMaxLeft !== undefined) iNowMaxLeft = isFun(iMaxLeft) ? iMaxLeft() : iMaxLeft;
		if (iMinTop !== undefined) iNowMinTop = isFun(iMinTop) ? iMinTop() : iMinTop;
		if (iMaxTop !== undefined) iNowMaxTop = isFun(iMaxTop) ? iMaxTop() : iMaxTop;

		var iNewLeft = iNowLeft === undefined ? (iWinWidth + iScrollLeft - iNowRight - iDomWidth) : (iScrollLeft + iNowLeft),
			iNewTop = iNowTop === undefined ? (iWinHeight + iScrollTop - iNowBottom - iDomHeight) : (iScrollTop + iNowTop);
		if (bFixed) {
			iNewX = (iNewLeft < iNowMinLeft) ? (iNowMinLeft - iScrollLeft) : ((iNewLeft > iNowMaxLeft) ? (iNowMaxLeft - iScrollLeft) : (iNowLeft === undefined ? (iWinWidth - iNowRight - iDomWidth) : iNowLeft));
			iNewY = (iNewTop < iNowMinTop) ? (iNowMinTop - iScrollTop) : ((iNewTop > iNowMaxTop) ? (iNowMaxTop - iScrollTop) : (iNowTop === undefined ? (iWinHeight - iNowBottom - iDomHeight) : iNowTop));
			oJQdom.css({
				position: 'fixed',
				left: iNewX,
				top: iNewY
			});
		} else {
			if (iNowMinLeft !== undefined) iNewLeft = Math.max(iNewLeft, iNowMinLeft);
			if (iNowMaxLeft !== undefined) iNewLeft = Math.min(iNewLeft, iNowMaxLeft);
			if (iNowMinTop !== undefined) iNewTop = Math.max(iNewTop, iNowMinTop);
			if (iNowMaxTop !== undefined) iNewTop = Math.min(iNewTop, iNowMaxTop);

			iNewX = ((iNewLeft - iX > 0) ? Math.ceil((iNewLeft - iX) * 0.1) : Math.floor((iNewLeft - iX) * 0.1)) + iX;
			iNewY = ((iNewTop - iY > 0) ? Math.ceil((iNewTop - iY) * 0.1) : Math.floor((iNewTop - iY) * 0.1)) + iY;
			if (iNewLeft == iX && iNewTop == iY) {
				clearTimeout(timer);
			} else timer = setTimeout(function() {
				oJQdom.css({
					"top": iNewY,
					"left": iNewX
				});
				oResult.move();
			}, 1);
		}
		if (oCallbacks.move) oCallbacks.move.call(oJQdom);
	}
	$(window).on("scroll resize", function() {
		clearTimeout(timer);
		timer = 0;
		timer = setTimeout(oResult.move, 100);
	});
	oResult.move();
	if (oCallbacks.init) oCallbacks.init.call(oJQdom);
	return oResult;
}