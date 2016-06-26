/*
生成正方形路径
start，点的位置：左上0，右上1，右下2，左下3
sweep，默认为true，顺时针；false为逆时针
*/
Raphael.fn.square=function(start,sweep,onlyString){
	var str='M',u=GlobalUnit;
	var ps=['0,0','0,'+u,u+','+u,u+',0'];
	start=float(start)%4;
	var n=start,delta=sweep===false?-1:1;
	do
	{
		str+=ps[n]+'L';
		n=(n+delta+4)%4;
	}while(n!=start);
	str+='Z';
	return onlyString ? str : this.path(str).data({model:'square',start:start,sweep:sweep});
}
Raphael.el.flip=function(way,speed,attr,delay,cbfun){
	if(this.data('model')!='square')return this;
	if(!isPos(speed))speed=500;
	if(!isPos(delay))delay=0;
	if(!attr)attr={};
	var start=this.data('start'),sweep=this.data('sweep');
	if(!way)way='-';
	switch(way)
	{
		case '-':
			if(start%2) start--;
			else start++;
			break;
		case '|':
			if(start%2) start++;
			else start--;
			break;
		case '/':
			if(!(start%2)) start+=2;
			break;
		case '\\':
			if(start%2) start+=2;
			break;
		default:return this;
	}
	start=(start+4)%4;
	sweep=!sweep;
	this.data({start:start,sweep:sweep});
	attr.path=this.paper.square(start,sweep,true);
	var animation=this.paper.raphael.animation(attr,speed,'<>',function(){if(cbfun)cbfun()});
	return this.animate(animation.delay(delay));
}
Raphael.el.roll=function(bool,speed,attr,delay,cbfun){
	if(this.data('model')!='square')return this;
	if(!isPos(speed))speed=500;
	if(!isPos(delay))delay=0;
	if(!attr)attr={};
	var start=this.data('start');
	var delta= bool ? -1 : 1;
	start=(start+delta+4)%4;
	this.data('start',start);
	attr.path=this.paper.square(start,this.data('sweep'),true);
	var animation=this.paper.raphael.animation(attr,speed,'',function(){if(cbfun)cbfun()});
	return this.animate(animation.delay(delay));
}
Raphael.el.twinkle=function(speed,attr,delay,cbfun){
	if(this.data('model')!='square')return this;
	if(!isPos(speed))speed=500;
	if(!isPos(delay))delay=0;
	if(!attr)attr={};
	var start=this.data('start');
	start=(start+2)%4;
	this.data('start',start);
	attr.path=this.paper.square(start,this.data('sweep'),true);
	var animation=this.paper.raphael.animation(attr,speed,'',function(){if(cbfun)cbfun()});
	return this.animate(animation.delay(delay));
}

function FlipPixels(num,cbfun)
{
	if(action) return;
	if(!cbfun)cbfun={};
	num=float(num);
	num%=orders.length;
	var SceneNum=orders[num],w=GlobalWidth/GlobalUnit,h=GlobalHeight/GlobalUnit;
	var dir=scenes[SceneNum].ActionMode,
		datas=scenes[SceneNum].datas,
		canColor=scenes[SceneNum].CanvasColor,
		scrColor=scenes[SceneNum].ScreenColor,
		fun,//获取延迟的函数
		way,//使用的Flip方法参数
		MaxIndex,//循环上限
		FUN;//获取元素的函数，返回数组
	action=w*h;
	if(datas instanceof Array) datas=datas.join(',');
	datas=datas.split(',');
	switch(dir)
	{
		case 'l':
		case 'r':
			if(dir=='l') fun=function(i){return i;}
			else fun=function(i){return w-i;}
			MaxIndex=w;
			FUN=function(i){
				var arr=[];
				for(var j=0;j<h;j++)
				{
					arr.push(pixels[i][j]);
				}
				return arr;
			}
			way='|';
			break;
		case 't':
		case 'b':
			if(dir=='t')fun=function(i){return i;}
			else fun=function(i){return h-i;}
			MaxIndex=h;
			FUN=function(i){
				var arr=[];
				for(var j=0;j<w;j++)
				{
					arr.push(pixels[j][i]);
				}
				return arr;
			}
			way='-';
			break;
		case 'lt':
		case 'rb':
			if(dir=='lt') fun=function(i){return i;}
			else fun=function(i){return MaxIndex-i-2;}
			MaxIndex=w+h;
			FUN=function(i){
				var arr=[];
				var j=Math.min(i,w-1);
				var k=Math.max(0,i-w+1);
				while(j>=0 && k<h)
				{
					arr.push(pixels[j][k]);
					j--;k++;
				}
				return arr;
			}
			way='/';
			break;
		case 'lb':
		case 'rt':
			if(dir=='lb') fun=function(i){return i;}
			else fun=function(i){return MaxIndex-i-2;}
			MaxIndex=w+h;
			FUN=function(i){
				var arr=[];
				var j=Math.min(i,w-1);
				var k=Math.min(h-1,MaxIndex-i-2);
				while(j>=0 && k>=0)
				{
					arr.push(pixels[j][k]);
					j--;k--;
				}
				return arr;
			}
			way='\\';
			break;
		case 'lr-m':
		case 'm-lr':
			if(dir=='lr-m') fun=function(i){return i;}
			else fun=function(i){return MaxIndex-i-2;}
			MaxIndex=Math.ceil(w/2);
			FUN=function(i){
				var arr=[];
				for(var j=0;j<h;j++)
				{
					arr.push(pixels[i][j]);
					if(w-i-1!=i) arr.push(pixels[w-i-1][j]);
				}
				return arr;
			}
			way='|';
			break;
		case 'tb-m':
		case 'm-tb':
			if(dir=='tb-m') fun=function(i){return i;}
			else fun=function(i){return MaxIndex-i-2;}
			MaxIndex=Math.ceil(h/2);
			FUN=function(i){
				var arr=[];
				for(var j=0;j<w;j++)
				{
					arr.push(pixels[j][i]);
					if(h-i-1!=i)  arr.push(pixels[j][h-i-1]);
				}
				return arr;
			}
			way='-';
			break;
	}
	if(cbfun.before)cbfun.before(SceneNum);
	for(var i=0;i<MaxIndex;i++)
	{
		var ps=FUN(i),l=ps.length;
		var delay=fun(i)*200;
		for(var n=0;n<l;n++)
		{
			var x=ps[n].data("i"),y=ps[n].data("j"),color=datas[x*h+y];
			if(color==='')color=canColor;
			ps[n].flip(
				way,
				'',
				{fill:colors[color]},
				delay,
				function(){
					action--;
					if(!action)
					{
						$('#Canvas svg').css('backgroundColor',colors[scrColor]);
						setTimeout(function(){FlipPixels(++num,cbfun)},5000);
						if(cbfun.after)cbfun.after(SceneNum);
					}
				}
			);
		}
	}
}

