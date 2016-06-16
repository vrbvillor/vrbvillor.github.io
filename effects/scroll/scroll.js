/*
sJQcontainer，要使用本效果的容器
sJQkid，在$(sJQcontainer)的基础上，使用find效果找到的滚动整体部分的元素选择器字符串，默认使用第一子元素
oControllers，控制器列表对象，可以使用的属性有
	.prev，向前播放的控制器的JQ选择器字符串
	.next，向后播放的控制器的JQ选择器字符串
	.stop，停止的控制器的JQ选择器字符串
	.start，开始的控制器的JQ选择器字符串
oOptions，附加参数列表对象，可以使用的属性有
	.dir，为滚动方向，只可以为u/d/l/r
	.speed，为滚动时间间隔，默认为30，不为0，越大滚动越慢
	.step，为步长，默认为1，在IE下只能通过改动step来达到飞速滚动的效果
	.mstop，鼠标指向时停止开关，默认为true
	.auto，自动播放，默认为true
oCallbacks，回调函数列表对象，可以使用的属性有
	.init()，完成初始化时执行的函数，函数的`this`为容器的JQ对象
	.move(oJQkid)，每一次滚动时执行的函数，函数的`this`为容器的JQ对象，参数为子容器的JQ对象
如果生成有名对象的话，可以调用的方法有
	.start()，开始滚动，使用后，auto被设置为true
	.stop()，停止滚动，使用后，auto被设置为false
	.roll()，同方向转向，左右互转，或上下互转
注：子DOM内容的每个组成部分可以无所谓尺寸，任意大小
*/
function CHIscroll(sJQcontainer, sJQkid, oControllers, oOptions, oCallbacks) {
	function FIND(sJQ) {
		return sJQ && $(sJQ).size();
	}
	if (!FIND(sJQcontainer)) return;
	if (!oOptions) oOptions = {};
	if (!oCallbacks) oCallbacks = {};
	if (!oControllers) oControllers = {};

	function isPos(n) {
		return n && /^[\+]?[0]*[1-9][\d]*$/.test(n);
	}

	var oResult = {},
		oJQcontainer = $(sJQcontainer).eq(0),
		oJQkid = sJQkid ? oJQcontainer.find(sJQkid).eq(0) : oJQcontainer.children().eq(0);
	if (!oJQkid.size()) return;
	var oJQkids = oJQkid.children(),
		piTotal = oJQkids.size(),
		cDir = oOptions.dir && $.inArray(oOptions.dir.toLowerCase(), ["u", "d", "l", "r"]) >= 0 ? oOptions.dir.toLowerCase() : "l",
		piSpeed = isPos(oOptions.speed) ? oOptions.speed : 30,
		piStep = isPos(oOptions.step) ? oOptions.step : 1,
		bMouseStop = "mstop" in oOptions ? Boolean(oOptions.mstop) : true,
		bAuto = "auto" in oOptions ? oOptions.auto : true,
		timer = 0,
		cSign = (cDir == 'l' || cDir == 'u') ? "-" : "+",
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
	var piContainerSize, piAllSize;

	function messure() {
		off(); //先停止所有事件
		if (bMouseStop) {
			oJQcontainer.unbind("mouseover", off);
			oJQcontainer.unbind("mouseleave", on);
		}

		piContainerSize = oJQcontainer[sSizeName](); //量当前外围尺寸
		piAllSize = totalSize(oJQkid.children(), sOutSizeName); //量当前总子元素尺寸
		if (oJQkid.children().size() > piTotal) piAllSize *= 0.5; //如果是复制过的，总子元素尺寸折半

		if (piContainerSize > piAllSize) //如果外围尺寸大于内容尺寸，则不滚动
		{ //移除后复制进去的子元素
			if (oJQkid.children().size() > piTotal) oJQkid.children(":gt(" + (piTotal - 1) + ")").remove();
			oJQkid[sSizeName]('auto');
			oJQkid.css(sMarginName, 0)
		} else { //滚动起始，如果只有一组原来的子元素，则追加，防止频繁追加
			if (oJQkid.children().size() == piTotal) oJQkid.append(oJQkids.clone());
			oJQkid[sSizeName](piAllSize * 2)
			if (bMouseStop) oJQcontainer.mouseenter(off).mouseleave(function() {
				if (bAuto) on();
			});
			if (bAuto) on();
		}
	}
	$(window).resize(messure);

	function run() {
		var iMarginLength = parseInt(oJQkid.css(sMarginName)) * -1;
		var iNextPosition = (cSign == '-') ? ((iMarginLength < piAllSize) ? ("-=" + piStep) : ("+=" + (piAllSize - piStep))) : ((iMarginLength > piAllSize - piContainerSize) ? ("+=" + piStep) : ("-=" + (piAllSize - piStep)));
		//if(p=='-') n=(ml < aS)?("-="+l):("+="+(aS-l));
/*{//正滚时，当可见移动层在原层（第一个层）上，正常进行
			if(ml < aS) n="-="+l;
			//否则要移动到第一个层上的对应位置上，并步进
			else n="+="+(aS-l);
			
		}*/
		//else n=(ml > aS-s)?("+="+l):("-="+(aS-l));
/*{//反滚时，当可见移动层在新层（第二个层）上，正常进行
			if(ml > aS-s) n="+="+l;
			//否则要移动到第二个层上的对应位置上，并步进
			else n="-="+(aS-l);
			
		}*/
		oJQkid.css(sMarginName, iNextPosition);
		if(oCallbacks.move) oCallbacks.move.call(oJQcontainer,oJQkid);
	}
	oResult.roll = function(cNewDir) {
		cSign = (cNewDir && (cNewDir == '-' || cNewDir == '+')) ? cNewDir : (cSign == "-" ? "+" : "-");
	}

	function on() {
		if (!timer) timer = setInterval(run, piSpeed);
	}
	oResult.start = function() {
		bAuto = true;
		on()
	}

	function off() {
		clearInterval(timer);
		timer = 0;
	}
	oResult.stop = function() {
		bAuto = false;
		off();
	}
	if (FIND(oControllers.prev)) $(oControllers.prev).click(function() {
		oResult.roll('-')
	});
	if (FIND(oControllers.next)) $(oControllers.next).click(function() {
		oResult.roll('+');
	});
	if (FIND(oControllers.stop)) $(oControllers.stop).click(oResult.stop);
	if (FIND(oControllers.start)) $(oControllers.start).click(oResult.start);

	messure();
	if (oCallbacks.init) oCallbacks.init(oJQcontainer, oJQkid);
	return oResult;
}