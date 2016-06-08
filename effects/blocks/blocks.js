/*分块式拼图效果
sJQcontainer，必需，要执行本效果的图片列表的JQ选择器字符串，一定要position:relative
sJQimgs，在$(sJQcontainer)基础上获取图片的JQ选择器字符串，默认为'img'
oControllers，Controllers控制器对象，可以使用的属性有
	.indices，索引的JQ选择器字符串（1/2/3/4/5...），索引的当前页码会被附加class="cur"
	.prev，向前播放的控制器的JQ选择器字符串
	.next，向后播放的控制器的JQ选择器字符串
	.stop，停止的控制器的JQ选择器字符串
	.start，开始的控制器的JQ选择器字符串
oOptions，附加参数列表对象，可以使用的属性有
	.h，水平块数，默认为2
	.v，竖直块数，默认为2
	.delay，每帧的间隔时间，默认为5000毫秒
	.mstop，鼠标指向时停止开关，默认为true
	.auto，默认为true，自动开始，关联到默认状态及前后播放
oCallbacks，回调函数列表对象，可以使用的属性有
	.init(oJQcontainer)，完成初始化时执行的函数，参数是容器的JQ对象
	.all(oJQblocks)，所有块这一帧完成时执行的函数，参数是所有块的JQ对象
	.each(oJQblock)，每一块移动完成时执行的函数，参数是完成移动的那一块的JQ对象
如果生成实例的话，可以调用的方法有
	.on()，开始自动播放，使用后，auto被设置为true
	.off()，停止自动播放，使用后，auto被设置为false
	.prev()，显示前一张图片
	.next()，显示后一张图片
*/

function CHIblocks(sJQcontainer, sJQimgs, oControllers, oOptions, oCallbacks) {
	function FIND(sJQ) {
		return sJQ && $(sJQ).length;
	}
	if (!FIND(sJQcontainer)) return false;
	if (!sJQimgs) sJQimgs = "img";
	var oJQcontainer = $(sJQcontainer).eq(0),
		oJQimgs = oJQcontainer.find(sJQimgs);
	if (!oJQimgs.length) return false;
	if (!oControllers) oControllers = {};
	if (!oOptions) oOptions = {};
	if (!oCallbacks) oCallbacks = {};

	function isPos(n) {
		return n && /^[\+]?[0]*[1-9][\d]*$/.test(n)
	}

	function int(n) {
		return parseInt(n) || 0
	}

	function isNat(n) {
		return !isNaN(n) && /^[\+]?[\d]+$/.test(n)
	}

	function rand(m, n) {
		return Math.floor(Math.random() * (Math.max(m, n) - Math.min(m, n))) + Math.min(m, n)
	}

	function indices(n) {
		return [n % piHblocks, Math.floor(n / piHblocks)]
	}
	var piDelay = isPos(oOptions.delay) ? int(oOptions.delay) : 5e3,
		bAuto = "auto" in oOptions ? Boolean(oOptions.auto) : true,
		bMouseStop = "mstop" in oOptions ? Boolean(oOptions.mstop) : true,
		oResult = {},
		numbers = [],
		piHblocks = isPos(oOptions.h) ? int(oOptions.h) : 2,
		piVblocks = isPos(oOptions.v) ? int(oOptions.v) : 2,
		piTotalBlocks = piHblocks * piVblocks,
		piEachWidth = oJQcontainer.width() / piHblocks,
		piEachHeight = oJQcontainer.height() / piVblocks;
	oJQcontainer.empty();
	for (var n = 0; n < piTotalBlocks; n++) {
		numbers.push(n);
		var aXY = indices(n);
		oJQcontainer.append($("<div>").css({
			width: piEachWidth,
			height: piEachHeight,
			left: piEachWidth * aXY[0],
			top: piEachHeight * aXY[1],
			backgroundPosition: (-piEachWidth * aXY[0]) + 'px ' + (-piEachHeight * aXY[1]) + 'px'
		}));
	}
	numbers = numbers.join(",");
	var oJQblocks = oJQcontainer.children().css("backgroundImage", "url(" + oJQimgs.get(0).src + ")"),
		piLength = oJQimgs.length,
		niCurrent = 0,
		niLock = 0;
	oResult.show = function(index) {
		if (niLock) return;
		off();
		niLock = piTotalBlocks;
		if (!isNat(index)) index = niCurrent + 1;
		index %= piLength;
		var array = numbers.split(",");
		oJQblocks.map(function(niMe, oMe) {
			var niRndIndex = rand(0, array.length),
				niRandom = array[niRndIndex],
				aXY = indices(niRandom);
			array.splice(niRndIndex, 1);
			$(oMe).delay(niMe * 100).fadeOut("", "", function() {
				$(oMe).css({
					backgroundImage: "url(" + oJQimgs.get(index).src + ")",
					backgroundPosition: (-piEachWidth * aXY[0]) + 'px ' + (-piEachHeight * aXY[1]) + 'px'
				})
			}).delay(100).fadeIn().delay(niMe * 100 + 500 * piLength).animate({
				top: piEachHeight * aXY[1],
				left: piEachWidth * aXY[0]
			}, 500, "", function() {
				niLock--;
				if (oCallbacks.each) oCallbacks.each.call(this, $(this).index());
				if (!niLock) {
					if (bAuto) on();
					if (oCallbacks.all) oCallbacks.all(oJQblocks);
				}
			})
		});
		niCurrent = index;
		if (typeof oJQindices !== 'undefined') {
			oJQindices.eq(niCurrent).addClass('cur').siblings().removeClass("cur");
		}
	};
	var timer = 0;

	function on() {
		if (!niLock && !timer) timer = setTimeout(oResult.next, piDelay);
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
		if (bAuto) on();
	}).mouseenter(off);
	oResult.next = function() {
		if (niLock) return;
		niCurrent++;
		oResult.show(niCurrent);
	};
	oResult.prev = function() {
		if (niLock) return;
		niCurrent = piLength - 1 + niCurrent;
		oResult.show(niCurrent);
	};
	if (FIND(oControllers.indices)) {
		var oJQindices = $(oControllers.indices);
		oJQindices.eq(0).addClass('cur');
		oJQindices.click(function() {
			oResult.show($(this).index(oControllers.indices));
		});
	}
	if (FIND(oControllers.prev)) $(oControllers.prev).click(oResult.prev);
	if (FIND(oControllers.next)) $(oControllers.next).click(oResult.next);
	if (FIND(oControllers.stop)) $(oControllers.stop).click(oResult.stop);
	if (FIND(oControllers.start)) $(oControllers.start).click(oResult.start);
	if (oCallbacks.init) oCallbacks.init(oJQcontainer);
	if (bAuto) oResult.start();
	return oResult
}