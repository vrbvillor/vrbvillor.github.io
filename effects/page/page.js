/*
sJQcontainer，要使用本效果的容器的JQ选择器字符串
sJQkid，在$(sJQcontainer)的基础上，使用find找到的需要被滚动的整体部分的元素选择器字符串，默认使用第一子元素
oControllers，控制器列表对象，可以使用的属性有
	.prev，向前播放的控制器的JQ选择器字符串
	.next，向后播放的控制器的JQ选择器字符串
	.stop，停止的控制器的JQ选择器字符串
	.start，开始的控制器的JQ选择器字符串
oOptions，附加参数列表对象，可以使用的属性有
	.dir，为滚动方向，只可以为u/d/l/r，默认为l
	.delay，为滚动时间间隔，默认为30，不为0，越大滚动越慢
	.mstop，鼠标指向时停止开关，默认为true
	.auto，默认为true，自动开始，关联到默认状态及前后播放
oCallbacks，回调函数列表对象，可以使用的属性有
	.init(oJQcontainer)，完成初始化时执行的函数，参数为容器的JQ对象
	.move()，每一次滚动时执行的函数
如果生成有名对象的话，可以调用的方法有
	.start()，开始滚动，使用后，auto被设置为true
	.stop()，停止滚动
	.roll()，同方向转向，左右互转，或上下互转
	.prev()，向前滚动一个
	.next()，向后滚动一个
*/
function CHIpage(sJQcontainer, sJQkid, oControllers, oOptions, oCallbacks) {
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
		oJQkid = sJQkid ? oJQcontainer.find(sJQkid).eq(0) : oJQcontainer.children().eq(0);
	if (!oJQkid.size()) return;

	var oJQkids = oJQkid.children(),
		timer = 0,
		cDir = oOptions.dir && $.inArray(oOptions.dir.toLowerCase(), ["u", "d", "l", "r"]) >= 0 ? oOptions.dir.toLowerCase() : "l",
		piDelay = isPos(oOptions.delay) ? oOptions.delay : 3000,
		bMouseStop = "mstop" in oOptions ? Boolean(oOptions.mstop) : true,
		cSign = (cDir == 'l' || cDir == 'u') ? "-" : "+",
		bAuto = "auto" in oOptions ? oOptions.auto : true;

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
	var piContainerSize = oJQcontainer[sSizeName]();
	var piAllSize = totalSize(oJQkids, sOutSizeName);
	var piEachSize = oJQkids[sOutSizeName](true);
	var piTotal = oJQkids.size();
	if (piContainerSize > piAllSize) return; //如果外围尺寸大于内容尺寸，则不滚动

	//计算可以显示出来的子元素个数，在原有子元素队尾，取相同数量的新元素，并将它们复制到原有子元素队列的前方
	var piClonedNum = Math.ceil(piContainerSize / piEachSize);
	var oDomNewKids = oJQkids.slice(piTotal - piClonedNum, piTotal).clone();
	oJQkid.children().eq(0).before(oDomNewKids);
	var piAllNum = piTotal + piClonedNum;
	oJQkid[sSizeName](piEachSize * piAllNum);
	oJQkid.css(sMarginName, -piClonedNum * piEachSize);
	var bLock = false;

	if (bMouseStop) oJQcontainer.mouseover(off).mouseleave(function() {
		if (bAuto) on();
	});

	function run() {
		if (bLock) return;
		off();
		bLock = true;
		var iNextPosition, bNeedChange = false,
			iMarginLength = parseInt(oJQkid.css(sMarginName)) * -1;
		if (cSign == '-') { //正向滚动，到达最后位置时，还要正移之前，要把移动层移动到最前边
			if (iMarginLength == piAllSize) {
				bNeedChange = true;
				iNextPosition = 0;
			}
		} else { //负向滚动，到达最前位置时，还要负移之前，要把移动层移动到最后边
			if (iMarginLength == 0) {
				bNeedChange = true;
				iNextPosition = "-=" + piAllSize;
			}
		}
		if (bNeedChange) oJQkid.css(sMarginName, iNextPosition);
		var oAnimate = {};
		oAnimate[sMarginName] = cSign + '=' + piEachSize;
		oJQkid.animate(oAnimate, function() {
			bLock = false;
			if (bAuto) on();
		});
		if (oCallbacks.move) oCallbacks.move();
	}
	oResult.roll = function() {
		cSign = cSign == "-" ? "+" : "-";
	}

	function on() {
		if (!timer) timer = setInterval(run, piDelay);
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
		bAuto = false;
		off();
	}
	oResult.prev = function(bChangeDir) {
		if (bLock) return;
		off();
		var cOldSign = cSign;
		cSign = "+";
		run();
		if (!bChangeDir) cSign = cOldSign;
		if (bAuto) oResult.on();
	}
	oResult.next = function(bChangeDir) {
		if (bLock) return;
		off();
		var cOldSign = cSign;
		cSign = '-';
		run();
		if (!bChangeDir) cSign = cOldSign;
		if (bAuto) oResult.on();
	}
	if (FIND(oControllers.prev)) $(oControllers.prev).click(oResult.prev);
	if (FIND(oControllers.next)) $(oControllers.next).click(oResult.next);
	if (FIND(oControllers.stop)) $(oControllers.stop).click(oResult.stop);
	if (FIND(oControllers.start)) $(oControllers.start).click(oResult.start);
	if (bAuto) oResult.start();
	if (oCallbacks.init) oCallbacks.init(oJQcontainer);
	return oResult;
}