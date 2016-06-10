/*
折扇效果（抽屉效果的美化版），只有横向的
要求内部使用绝对定位，以改变left来实现效果
所有的子元素要求是等宽的，代码会根据子元素的宽度，来计算播放时每个元素的位置
sJQcontainer，要执行本效果的容器的JQ选择器字符串
sJQkids，折扇效果每个扇页的DOM子元素的JQ串，如果不定义则直接使用children方法
oOptions，参数列表对象，可以使用的属性有
	.relax，舒展状态，默认为true，则起始状态与鼠标离开状态（way=mouseenter）都为舒展状态；如果false，则始终有一项被展开
	*****在relax=false时，下边三个参数才有效
	.auto，自动播放，默认为false
	.delay，自动播放的间隔，默认为3000
	.mstop，鼠标悬停时播放停止，默认为true
oCallbacks，回调函数列表对象，可以使用的属性有
	.show(oJQkid)，每一次切换后执行于被显示元素上的回调函数，oJQkid是被显示出来的子元素
	.hide(oJQkid)，每一次切换后执行于其它被隐藏元素上的回调函数，oJQkid是其中一个被隐藏的子元素
生成实例后，可以使用的方法有
	.show(index)，显示指定索引的元素，被显示的元素会附加上cur类
	.relax()，调用舒展模式
如果在非舒展模式下relax=false，可以额外增加方法
	.start()，自动播放，使用后，auto被设置为true
	.stop()，暂停播放，使用后，auto被设置为false
	.next()，播放下一个
	.prev()，播放上一个
*/
function CHIfans(sJQcontainer, sJQkids, oOptions, oCallbacks) {
	if (!sJQcontainer || !$(sJQcontainer).size()) return;
	if (!oOptions) oOptions = {};
	if (!oCallbacks) oCallbacks = {};

	function isPos(n) {
		return n && /^[\+]?[0]*[1-9][\d]*$/.test(n);
	}
	var bRelax = "relax" in oOptions ? oOptions.relax : true;
	var sWay = bRelax ? "mouseenter" : "click";
	var oJQcontainer = $(sJQcontainer).eq(0),
		oJQkids = sJQkids ? oJQcontainer.find(sJQkids) : oJQcontainer.children(),
		oResult = {},
		piTotal = oJQkids.size();
	if (!piTotal) return; /*所有的子元素被认为是等宽的，如果不是请修改CSS*/
	var piKidWidth = oJQkids.eq(0).outerWidth(),
		piContainerWidth = oJQcontainer.width(),
		timer = 0,
		indexCurrent = 0,
		niLock = 0;
	for (var i = 0; i < piTotal; i++) {
		var oJQkid = oJQkids.eq(i),
			iXbefore = i ? (piContainerWidth - piKidWidth) / (piTotal - 1) * (i - 1) + piKidWidth : 0,
			iXafter = (piContainerWidth - piKidWidth) / (piTotal - 1) * i,
			iXrelax = piContainerWidth / piTotal * i;
		oJQkid.data({
			bx: iXbefore,
			ax: iXafter,
			rx: iXrelax
		});
		var oDOMkid = oJQkid.get(0);
		oDOMkid.timer = 0;
		oJQkid[sWay](function() {
			clearTimeout(timer);
			oJQkids.finish();
			oResult.show($(this).index());
		});
	}
	oResult.show = function(index) {
		if (niLock) return;
		niLock = oJQkids.size();
		oJQkids.eq(index).addClass("cur");
		for (var i = 0; i < piTotal; i++) {
			var oJQkid = oJQkids.eq(i).stop();
			oJQkid.animate({
				left: oJQkid.data(index < i ? "bx" : "ax")
			}, function() {
				niLock--;
				if (index == i) if (oCallbacks.show) oCallbacks.show.call(this, index);
				else if (oCallbacks.hide) oCallbacks.hide.call(this, oJQkids.index(this));
				if (!niLock && bAuto && !bRelax && !bMouseHover) {
					timer = 0;
					on();
				}
			});
			indexCurrent = index;
		}
		oJQkids.eq(index).siblings().removeClass("cur");
	};
	oResult.relax = function() {
		oJQkids.removeClass("cur").map(function(indexMe, oMe) {
			$(oMe).animate({
				left: $(oMe).data("rx")
			});
		});
	};
	if (bRelax) {
		oResult.relax();
		oJQcontainer.mouseleave(oResult.relax);
	} else {
		oResult.show(0);
		var piDelay = isPos(oOptions.delay) ? oOptions.delay : 3e3;
		var bMouseStop = "mstop" in oOptions ? Boolean(oOptions.mstop) : true;
		var bAuto = "auto" in oOptions ? oOptions.auto : true;
		var bMouseHover = 0;

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
		oResult.next = function() {
			if (niLock) return;
			off();
			indexCurrent = (indexCurrent + 1) % piTotal;
			oResult.show(indexCurrent);
		};
		oResult.prev = function() {
			if (niLock) return;
			off();
			indexCurrent = (indexCurrent - 1 + piTotal) % piTotal;
			oResult.show(indexCurrent);
		};
		if (bMouseStop) oJQcontainer.mouseleave(function() {
			bMouseHover = false;
			if (bAuto) on();
		}).mouseenter(function() {
			off();
			bMouseHover = true;
		});
		if (bAuto) oResult.start();
	}
	if(oCallbacks.init) oCallbacks.init.call(oJQcontainer);
	return oResult;
}