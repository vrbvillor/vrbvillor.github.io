(function() {
	//改变元素可见度，默认参数为true
	$.fn.visible = function(bool) {
		var visibility = bool === undefined || bool ? 'visible' : 'hidden';
		return this.css('visibility', visibility);
	}
/*
	打散文字，将一纯文本容器元素中的每个字符，用相同的标签包裹住，一般为使用其它特效做准备
	tagName，标签名，默认为span，最好使用行内标签，且不要受CSS的影响（从未被赋予样式的标签）
	*/
	$.fn.explode = function(tagName) {
		if (!tagName) tagName = 'span';
		return this.each(function() {
			var text = $(this).text(),
				str = [];
			$(this).empty();
			for (var n = 0; n < text.length; n++)
			str.push('<' , tagName , '>' , text.charAt(n) , '</' , tagName , '>');
			$(this).html(str.join(''));
		});
	}
/*
	波浪式元素动画，可以是一个主元素中的所有子元素，也可以是一大段纯文本中的文字
	oOptions，配置参数集合对象，可以使用的键名有
		mode，必须，可以为'text'文本动画或'child'子元素动画
		tagName，用来包裹文本的标签名，或需要被执行动画的子元素标签名
		action，行为，默认为'come'字符或子元素入场，还可以为'leave'字符或子元素离场
		direction，方向，默认为'here'，字符或子元素从上方入场或离场就在本位置（逐个淡入淡出），还可以为'up''left''down''right''random'
		easing，舒缓函数，默认为'linear'
		duration，每个单位完成动画的时间，默认为500毫秒
		delay，每个单位之间执行动画的间隔时间（上个完到下个开始），默认为空，采用随机延迟
		times，偏离倍数，默认为1，偏离倍数越大，效果越明显
		each，function，每个元素执行完动作时的回调函数
		done，function，整个动作执行完毕时的回调函数
	*/
	$.fn.wave = function(oOptions) {
		if (!oOptions || !oOptions.mode) return this;

		function isPos(n) {
			return n && /^[\+]?[0]*[1-9][\d]*$/.test(n)
		}

		function rand(m, n) { //范围内的随机整数，若不指定范围，则取0-9内的随机数
			if (isNaN(m)) m = 0;
			if (isNaN(n)) n = 9;
			return Math.floor(Math.random() * (Math.max(m, n) - Math.min(m, n))) + Math.min(m, n);
		}
		var mode = oOptions.mode.toString().toLowerCase(),
			//如果有标签就直接用，如果没有，如果是文本动画则用span默认，如果是元素动画，则留空，后边会用.children()方法
			tagName = oOptions.tagName ? oOptions.tagName : (oOptions.mode == 'text' ? 'span' : ''),
			action = oOptions.action ? oOptions.action : 'come',
			direction = oOptions.direction ? oOptions.direction : 'here',
			easing = oOptions.easing ? oOptions.easing : 'linear',
			duration = isPos(oOptions.duration) ? oOptions.duration : 500,
			delay = !isNaN(oOptions.delay) ? oOptions.delay : 0,
			times = isPos(oOptions.times) ? oOptions.times : 1,
			eachFunction = $.isFunction(oOptions.each) ? oOptions.each : $.noop,
			doneFunction = $.isFunction(oOptions.done) ? oOptions.done : $.noop;

		return this.each(function() {
			var width = $(this).outerWidth() * times,
				height = $(this).outerHeight() * times,
				children;

			switch (mode) {
			case 'text':
				var text = $(this).text();
				$(this).explode(tagName);
				children = $(this).find(tagName);
				break;
			case 'child':
				if (tagName) children = $(this).find(tagName);
				else children = $(this).children();
				break;
			default:
				return $(this);
			}

			var oCssOut = {
				opacity: 0
			},
				oCssIn = {
					opacity: 1
				};
			switch (direction) {
			case 'down':
				oCssOut.top = height;
				oCssIn.top = 0;
				break;
			case 'left':
				oCssOut.left = -width;
				oCssIn.left = 0;
				break;
			case 'right':
				oCssOut.left = width;
				oCssIn.left = 0;
				break;
			case 'up':
				oCssOut.top = -height;
				oCssIn.top = 0;
				break;
			default:
				//case 'here':
				oCssOut.top = oCssIn.top = 0;
			}

			var oCss = oCssOut,
				oAnimate = oCssIn;
			if (action == 'leave') {
				oCss = oCssIn;
				oAnimate = oCssOut;
			}
			oCss.position = 'relative';

			var THIS = $(this).visible(),
				piCount = $(this).children(tagName).length,
				piLength = piCount;
			children.each(function(ind, ele) {
				if (direction == 'random') {
					oCssIn = {
						left: 0,
						top: 0,
						opacity: 1
					};
					oCssOut = {
						opacity: 0,
						left: rand(-9, 9) * $(ele).width() * times,
						top: rand(-9, 9) * $(ele).height() * times
					};
					oCss = action == 'leave' ? oCssIn : oCssOut;
					oAnimate = action == 'leave' ? oCssOut : oCssIn;
					oCss.position = 'relative';
					$(ele).data('oAnimate', oAnimate);
				}
				$(ele).css(oCss);
				setTimeout(function() {
					if (direction == 'random') {
						oAnimate = $(ele).data('oAnimate');
						$(ele).removeData('oAnimate');
					}
					$(ele).animate(oAnimate, {
						duration: duration,
						easing: easing,
						done: function() {
							if (eachFunction) eachFunction.call(this, ind, ele, piLength - piCount);
							piCount--;
							if (!piCount) {
								if (mode == 'text') {
									THIS.empty();
									if (action == 'leave') THIS.visible(false);
									THIS.text(text);
								}
								doneFunction.call(THIS, children);
							}
						}
					});
				}, (delay ? (delay > 0 ? delay * ind : delay * (ind - piLength)) : rand(1, 99) * 10));
			});
		});
	}
})();