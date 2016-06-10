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
		timer = 0;

	var oJQkids = oJQkid.children(),
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
		bLimit = "limit" in oOptions ? !! oOptions.limit : true;

	var sMarginName, sSizeName, sOutSizeName;
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
		if (oCallbacks.move) oCallbacks.move(oJQkids.eq(niCurrent));
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
	if (bMouseStop) oJQcontainer.mouseover(stop).mouseleave(function() {
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