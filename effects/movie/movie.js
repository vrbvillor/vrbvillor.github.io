/*
sJQcontainer，要使用本特效的容器的JQ选择器字符串
sJQkid，在$(sJQcontainer)基础上，使用find查找需要被滚动的整体部分的选择器字符串，默认为使用第一子元素
oControllers，Controllers控制器对象，可以使用的属性有
	.prev，向前播放的控制器的选择器字符串
	.next，向后播放的控制器的选择器字符串
	.indices，索引的选择器字符串（1/2/3/4/5...），索引的当前页码会被附加class="cur"
	.stop，停止的控制器的选择器字符串
	.start，开始的控制器的选择器字符串
oOptions，附加参数列表对象，可以使用的属性有
	.dir，为滚动方向，只可以为u/d/l/r
	.delay，为滚动时间间隔，默认为30，不为0，越大滚动越慢
	.mstop，鼠标指向时停止开关，默认为true
	.minLi，为最少的显示数量，如果少于这个数量就不执行特效，默认为1
	.auto，是否自动播放，默认为true
oCallbacks，回调函数列表对象，可以使用的属性有
	.init(oJQcontainer)，完成初始化时执行的函数，参数为容器的JQ对象
	.move(oJQaimKid)，每一次滚动时执行的函数，参数当前指示的子元素的JQ对象
如果生成有名对象的话，可以调用的方法有
	.start()，开始滚动，使用后，auto被设置为true
	.stop()，停止滚动，使用后，auto被设置为false
	.run(ind)，播放到指定索引的位置
	.prev()，向前滚动一个
	.next()，向后滚动一个
	.size()，返回子元素个数
	.cur()，返回当前作为标志的子元素索引
*/
function CHImovie(sJQcontainer, sJQkid, oControllers, oOptions, oCallbacks) {
	function FIND(sJQ) {
		return sJQ && $(sJQ).size();
	}
	if (!FIND(sJQcontainer)) return;
	if (!oOptions) oOptions = {};
	if (!oControllers) oControllers = {};
	if (!oCallbacks) oCallbacks = {};

	function isPos(n) {
		return n && /^[\+]?[0]*[1-9][\d]*$/.test(n);
	}

	var oResult = {},
		oJQcontainer = $(sJQcontainer).eq(0),
		oJQkid = sJQkid ? oJQcontainer.find(sJQkid).eq(0) : oJQcontainer.children().eq(0),
		timer = 0,
		oJQkids = oJQkid.children(),
		piTotal = oJQkids.size(),
		piMaxLi = piTotal;
	if (piTotal < 2) return; //如果子元素不到2个则不滚动

	var piMinLi = isPos(oOptions.minLi) ? oOptions.minLi : 1;
	if (piTotal < piMinLi) return;
	else piTotal -= piMinLi - 1;

	var cDir = oOptions.dir && $.inArray(oOptions.dir.toLowerCase(), ["u", "d", "l", "r"]) >= 0 ? oOptions.dir.toLowerCase() : "l",
		piDelay = isPos(oOptions.delay) ? oOptions.delay : 3000,
		bMouseStop = "mstop" in oOptions ? !! oOptions.mstop : true,
		bAuto = "auto" in oOptions ? !! oOptions.auto : true,
		niCurrent = 0,
		niAimIndex = 0,
		bLimit = "limit" in oOptions ? !! oOptions.limit : true,
		sMarginName, sSizeName, sOutSizeName;
	if (cDir == 'l' || cDir == 'r') {
		sMarginName = "marginLeft";
		sSizeName = "width";
		sOutSizeName = "outerWidth";
	} else {
		sMarginName = "marginTop";
		sSizeName = "height";
		sOutSizeName = "outerHeight";
	}
	//计算元素的外围总尺寸

	function totalSize(jqObj, attr) {
		return eval(jqObj.map(function() {
			return $(this)[attr](true);
		}).get().join("+"));
	}
	var piAllSize = totalSize(oJQkids, sOutSizeName),
		piEachSize = oJQkids[sOutSizeName](true);

	oJQkid[sSizeName](piAllSize).css(sMarginName, 0);
	var bLock = false;

	oResult.show = function(index) {
		niCurrent = index === undefined ? niCurrent + 1 : index;
		niCurrent += piMaxLi;
		niCurrent %= piMaxLi;
		oJQkids.eq(niCurrent).addClass('cur').siblings().removeClass('cur');
		//如果设置了限制边界，则需要切换控制器prev和next的类disabled
		run(niCurrent);
	}

	function run(index) {
		if (bLock) return;
		bLock = true;
		off();
		var iMarginLength = parseInt(oJQkid.css(sMarginName)) * -1;
		var bNeedScroll = false;
		//如果要显示的元素，不在可视区域内，才滚动
		if (niAimIndex > index) {
			bNeedScroll = true;
			niAimIndex = index;
		} else if (niAimIndex + piMinLi < index + 1) {
			bNeedScroll = true;
			niAimIndex = index - piMinLi + 1;
		}
		//保证每次只把目标元素滚动到边界位置
		var niFocusIndex = piTotal - 1 > niAimIndex ? niAimIndex : piTotal - 1;
		var cbfun = function() {
				bLock = false;
				if (bAuto) on();
				if (bLimit) {
					if (oControllers.prev) $(oControllers.prev)[index ? "removeClass" : "addClass"]("disabled");
					if (oControllers.next) $(oControllers.next)[index + 1 == oJQkids.length ? "addClass" : "removeClass"]("disabled");
				}
				if (oCallbacks.move) oCallbacks.move.call(oJQkids.eq(niCurrent));
			}
		if (bNeedScroll) {
			var oAnimate = {};
			oAnimate[sMarginName] = -niFocusIndex * piEachSize;
			oJQkid.stop().animate(oAnimate, cbfun);
		} else {
			cbfun();
		}
		if (typeof oJQindices !== 'undefined') {
			oJQindices.eq(niCurrent).addClass('cur').siblings().removeClass("cur");
		}
	}

	function on() {
		if (!timer) timer = setInterval(oResult.next, piDelay);
	}

	function off() {
		clearInterval(timer);
		timer = 0;
	}
	oResult.start = function() {
		bAuto = true;
		on();
	}
	oResult.stop = function() {
		off();
		bAuto = false;
	}
	if (bMouseStop) oJQcontainer.mouseover(off).mouseleave(function() {
		if (bAuto) on();
	});
	oResult.size = function() {
		return oJQkids.size();
	}
	oResult.prev = function() {
		if (bLock) return;
		off();
		oResult.show(--niCurrent);
	}
	oResult.next = function() {
		if (bLock) return;
		off();
		oResult.show(++niCurrent);
	}
	if (FIND(oControllers.indices)) {
		var oJQindices = $(oControllers.indices);
		oJQindices.eq(0).addClass('cur');
		oJQindices.click(function() {
			oResult.show($(this).index(oControllers.indices));
		});
	}
	if (FIND(oControllers.prev)) $(oControllers.prev).click(function() {
		!$(this).hasClass('disabled') && oResult.prev();
	});
	if (FIND(oControllers.next)) $(oControllers.next).click(function() {
		!$(this).hasClass('disabled') && oResult.next();
	});
	if (FIND(oControllers.stop)) $(oControllers.stop).click(oResult.stop);
	if (FIND(oControllers.start)) $(oControllers.start).click(oResult.start);

	if (bAuto) oResult.start();
	oResult.show(0);
	if (oCallbacks.init) oCallbacks.init(oJQcontainer);
	return oResult;
}