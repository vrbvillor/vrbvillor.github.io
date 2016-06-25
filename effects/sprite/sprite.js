(function(){
//扩展JQ元素的visible/hidden方法，及sprite
	$.fn.visible=function(){return this.css('visibility','visible');}
	$.fn.hidden=function(){return this.css('visibility','hidden');}
	/*
	在一个元素上生成精灵图播放功能
	参数setFuns是事件函数集合对象，可以使用的属性有
		loaded(counter)，所有图片资源调用完成之后调用，参数counter为计数器，此时为总图片量
		loading(counter,allnum)，每个图片资源调用完成之后调用，参数counter为计数器，allnum为总图片量
		show/hide(n)，在显示/隐藏第n张图片时候调用
		loop(n)，在循环播放时调用，n为剩余的循环次数
		stopped(dir)，在停止播放时调用，用以处理播放完成时的行为，参数只可能为正负1，显示播放方向
		played()，在正向播放完成时调用
		rewound()，在反向播放完成时调用
	生成的对象是控制播放的功能对象，可以使用的属性有
		loaded，布尔值，指fill命令所填充的图片资源是否全部调用完成
		step，正整数，播放步长，所有图片是每隔几个播放一次
		at，正整数，当前处于第几帧
		frames，正整数，总共有多少帧
		fill(srcPattern,maxnum)，填充图片，会先将容器清空，其中参数
			srcPattern，必需，路径格式串，里边必须含有字符串{n}，用以替换成整数，图片的文件名最好使用方便的连续的数字为名
			maxnum，必需，最大数字，超过最大数字就停止填充
		play/rewind(speed,loop)，正向/反向播放全图，其中参数，会触发stop事件及played或rewound事件
			speed，每张图间隔的毫秒数，默认为50
			loop，布尔值，是否循环播放，默认为0，可以为正整数，为-1时无限循环
		destroy(bool)，放弃对象，如果bool为真则同时清除里边内容
		goto(num,speed)，从当前帧播到第num帧，会触发stop事件
		show(num)，显示第`num`（num=0~all-1）张图片。每次切换一张图片，会触发`show`及`hide`事件
		on(key,fun)/off(key)，变更或解绑事件处理函数

	*/
	$.fn.sprite=function(setFuns){
		if(this.get(0).SPRITE) return this.get(0).SPRITE;
		var THIS=this.eq(0),
			funs=$.extend({
				loaded:$.noop,
				loading:$.noop,
				show:$.noop,
				hide:$.noop,
				loop:$.noop,
				stopped:$.noop,
				played:$.noop,
				rewound:$.noop
			}, setFuns),
			timer,subTimer
		;
		var obj= {
			loaded:false,
			step:1,
			at:0,
			frames:0,
			on:function(key,fun){
				key in funs && $.isFunction(fun) && (funs[key]=fun);
				return this;
			},
			off:function(key){
				key in funs && (funs[key]=$.noop);
				return this;
			},
			destroy:function(bClear){
				THIS.get(0).SPRITE=null;
				bClear && THIS.empty();
			},
			fill:function(srcPattern,maxnum){
				if(isNaN(maxnum) || maxnum<=0) {console.error("maxnum不对");return false;}
				THIS.empty();
				this.loaded=false;
				this.frames=0;
				var SPRITE=this,
					counter=0,
					x;
				for(var n=0;n<maxnum;n++)
				{
					var img=new Image();
					img.src=srcPattern.replace(/\{n\}/ig,n+1);
					n && $(img).hidden();
					$(img).appendTo(THIS);
					if(img.complete) done();
					else img.onload=done;
					this.frames++;
				}
				function done()
				{
					counter++;
					funs.loading(counter,maxnum);
					if(SPRITE.frames==counter)
					{
						SPRITE.loaded=true;
						funs.loaded(counter);
					}
				}
				return this.show(0);
			},
			goto:function(piNum,piSpeed,callback){
				if(isNaN(piNum) || piNum<0 || piNum>=this.frames) return false;
				if(!piSpeed || isNaN(piSpeed)) piSpeed=50;
				if(!$.isFunction(callback)) callback=$.noop;
				var dir=this.at>piNum ? -1:1.
					n=this.at + this.step * dir,
					SPRITE=this;
				timer=setInterval(function(){
					dir>0 && n>piNum || dir<0 && n<piNum || !SPRITE.show(n) ?
						SPRITE.stop(dir)
						: n+= SPRITE.step * dir;
				},piSpeed);
			},
			play:function(piSpeed,iLoop,piDelay){
				if(!piSpeed || isNaN(piSpeed)) piSpeed=50;
				if(isNaN(piDelay)) piDelay=0;
				if(isNaN(iLoop)) iLoop=0;
				var n=this.at+this.step,
					SPRITE=this.stop();
				timer=setInterval(function(){
					SPRITE.show(n) ?
						n+=SPRITE.step
						: iLoop ?
							(
								subTimer=setTimeout(function(){
									SPRITE.show(0).play(piSpeed,iLoop-1,piDelay);
								}, piDelay),
								funs.loop(iLoop)
							)
							: (SPRITE.stop(1),funs.played());
				},piSpeed);
				return this;
			},
			rewind:function(piSpeed,iLoop,piDelay){
				if(!piSpeed || isNaN(piSpeed)) piSpeed=50;
				if(isNaN(piDelay)) piDelay=0;
				if(isNaN(iLoop)) iLoop=0;
				var n=this.at-this.step,
					SPRITE=this.stop();
				timer=setInterval(function(){
					SPRITE.show(n) ?
						n-=SPRITE.step
						: iLoop ?
							(
								subTimer=setTimeout(function(){
									SPRITE.show(SPRITE.frames-1).rewind(piSpeed,iLoop-1,piDelay);
								}, piDelay),
								funs.loop(iLoop)
							)
							: (SPRITE.stop(-1),funs.rewound());
				},piSpeed);
				return this;
			},
			stop:function(dir){
				subTimer && (clearTimeout(subTimer),subTimer=null);
				timer && (clearInterval(timer),timer=null);
				(dir==-1 || dir==1) && funs.stopped(dir);
				return this;
			},
			show:function(n){
				var imgs=THIS.find("img");
				if(n<0 || n>=this.frames){
					this.stop();
					return false;
				}
				var cur=this.at;
				imgs.eq(cur).hidden();
				funs.hide(cur);
				imgs.eq(n).visible();
				funs.show(n);
				this.at=n;
				return this;
			}
		};

		this.get(0).SPRITE=obj;
		return obj;
	}
})();
