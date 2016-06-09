/*
层静止化效果
sJQdoms，要应用本效果的元素的JQ选择器字符串，可选择多个元素
sWay，静止化位置，默认为top，还可以为bottom，vertical，left，right，horizontal
oCss，静止化后额外增加的CSS样式对象，默认为空，通常用来改变Z轴或添加某些不影响布局的样式
原理有改动：
	测量原元素的布局属性，复制无外边距尺寸，margin，float，clear等属性，给一个占位元素
	复制含外边距尺寸给一个静止化容器元素
	当滚动位置在需要静止化的范围时，将占位元素显示出来，将原元素放置到静止化容器中
	反之隐藏占位元素，将原元素放置到原始位置（是占位元素的前边）
*/
function CHIfixed(sJQdoms, sWay, oCss) {
	if (!sJQdoms) return;
	if (!sWay) sWay = 'top';
	if (!oCss) oCss = {};
	$.fn.int = function(css) {
		return parseInt(this.css(css)) || 0;
	}
	$.fn.inside = function(sJQ) {
		return this.closest(sJQ).size() > 0;
	}
	var sClasses = "fixed-top fixed-bottom fixed-left fixed-right";

	function FIND(sJQ) {
		return sJQ && $(sJQ).size();
	}
	sWay = sWay.toLowerCase()
	if ($.inArray(sWay, ["top", "bottom", "left", "right", "horizontal", "vertical"]) < 0) sWay = "top";

	$(sJQdoms).map(function(ind, ele) {
		var oCssOriginal = {};
		//记录原始的需要被改变的样式
		for (var n in oCss) oCssOriginal[n] = $(ele).css(n);
		var O = $(ele).offset();
		var oData = {
			css: oCssOriginal
		};
		if (sWay == 'top' || sWay == 'vertical') oData.topLimit = O.top - $(ele).int('marginTop');
		if (sWay == 'bottom' || sWay == 'vertical') oData.bottomLimit = O.top + $(ele).outerHeight() + $(ele).int('marginBottom') - $(window).height();
		if (sWay == 'left' || sWay == 'horizontal') oData.leftLimit = O.left - $(ele).int('marginLeft');
		if (sWay == 'right' || sWay == 'horizontal') oData.rightLimit = O.left + $(ele).outerWidth() + $(ele).int('marginRight') - $(window).width();
		$(ele).data(oData);

		var placer = $("<" + ele.tagName + ">"),
			fixer = $("<" + ele.tagName + ">");
		placer.width($(ele).outerWidth()).height($(ele).outerHeight()).hide().insertAfter($(ele)).css({
			marginLeft: $(ele).css("marginLeft"),
			marginRight: $(ele).css("marginRight"),
			marginTop: $(ele).css("marginTop"),
			marginBottom: $(ele).css("marginBottom"),
			visibility: 'hidden',
			float: $(ele).css('float'),
			clear: $(ele).css('clear'),
			position: $(ele).css('position'),
			left: $(ele).css('left'),
			top: $(ele).css('top'),
			right: $(ele).css('right'),
			bottom: $(ele).css('bottom')
		});

		var oStyle = $.inArray(sWay, ['top', 'bottom', 'vertical']) >= 0 ? {
			left: $(ele).offset().left - $(ele).int('marginLeft')
		} : {
			top: $(ele).offset().top - $(ele).int('marginTop')
		};
		fixer.width($(ele).outerWidth(true)).height($(ele).outerHeight(true)).addClass('fixed').appendTo("body").css(oStyle);
		$(window).on('scroll load', function() {
			messure($(ele));
		});
		$(ele).data({
			placer: placer,
			fixer: fixer
		});
	});

	function messure(oJQ) {
		var scrollLeft = $(window).scrollLeft(),
			scrollTop = $(window).scrollTop(),
			fixer = oJQ.data('fixer'),
			placer = oJQ.data('placer');

		function reset() {
			placer.hide();
			oJQ.insertBefore(placer).css(oJQ.data('css'));
			fixer.hide().removeClass(sClasses);
		}

		function fixed(sWay) {
			placer.show();
			oJQ.css(oCss);
			fixer.append(oJQ).addClass('fixed-' + sWay).show();
		}

		var ways = ['top', 'bottom', 'left', 'right'];
		for (var n = 0; n < ways.length; n++) {
			var way = ways[n],
				bFix, limit = oJQ.data(way + 'Limit');
			switch (way) {
			case 'top':
				bFix = scrollTop > limit;
				break;
			case 'left':
				bFix = scrollLeft > limit;
				break;
			case 'right':
				bFix = scrollLeft < limit;
				break;
			case 'bottom':
				bFix = scrollTop < limit;
				break;
			}
			var bIn = oJQ.inside(fixer);
			if (bFix && !bIn) {
				fixed(way);
				return;
			} else if (!bFix && bIn && fixer.hasClass('fixed-' + way)) {
				reset();
				return;
			}
		}
	}
}