// 设置过程
var GlobalUnit=40;
var GlobalWidth=800;
var GlobalHeight=600;
var MaxCanvasWidth=180;
var colors='#252525,#F4B300,#78BA00,#006AC1,#001E4E,#008287,#691BB8,#1FAEFF,#1B58B8,#2673EC,#AE113D,#632F00,#2E1700,#004D60,#199900,#004A00,#00C13F,#56C5FF,#569CE3,#00D8C0,#00AAAA,#B01E00,#4E0000,#4E0038,#C1004F,#7200AC,#15992A,#FF981D,#E56C19,#FF2E12,#B81B1B,#91D100,#83BA1F,#E1B700,#D39D09,#FF76BC,#2D004E,#4617B4,#1F0068,#FF1D77,#B81B6C,#AA40FF,#E064B7,#00A4A4,#FF7D23,#696969,#FFFFFF,#000000'.split(',');
var DefaultCanvasColor='#FFFFFF';
var DefaultScreenColor='#696969';
var DefaultCurrentColor='#252525';
var paper,action;
var pixels=[];
var scenes=[/*{
		datas:[Number],//当前帧数据（二维数组）
		CanvasColor:Number,//当前帧默认色的序号
		ScreenColor:Number,//当前帧背景色的序号
		ActionMode:String//从当前帧向其它帧过渡时的效果
	}*/];
var orders=[];
var CurrentScene=-1;
var CurrentActionMode='l';
var CurrentActionWay='|';
var CurrentColorNumber=0;
var picker/*选色器*/,infor/*信息窗*/,CHIbg;
$(function(){
	var win=$(window);
	CHIbg=$("<div>").addClass("CHIbg");
	CHIbg.appendTo("body");
	CHIbg.open=function(cbfun){
		this.fadeIn(function(){
			if(cbfun)cbfun();
		});
		return this;
	}
	CHIbg.close=function(cbfun){
		this.blur().fadeOut(function(){
			if(cbfun)cbfun();
		}).unbind();
		return this;
	}
	CHIbg.focus=function(obj){
		this.blur().one('click',function(){
			if(obj.close) obj.close();
		});
		return this;
	}
	CHIbg.blur=function(){
		this.unbind('click');
		return this;
	}
	paper=Raphael('Canvas',GlobalWidth,GlobalHeight);
	for(var i=0;i<GlobalWidth/GlobalUnit;i++)
	{
		pixels[i]=[];
		for(var j=0;j<GlobalHeight/GlobalUnit;j++)
		{
			pixels[i][j]=paper.square(0,false).attr({
				stroke:false,
				fill:DefaultCanvasColor,
				transform:'T'+(i*GlobalUnit)+','+(j*GlobalUnit),
				title:i+','+j
			}).data({i:i,j:j});
		}
	}
	CreateNewScene();
	
	//像素的点击事件
	$(document).bind('contextmenu',function(e){return false;})
	$("#Canvas").delegate('path','mousedown',function(event){
		var pos=$(this).find('title').text().split(','),i=pos[0],j=pos[1];
		var path=pixels[i][j];
		switch(event.which)
		{
			case 1:
				path.flip(CurrentActionWay,'',{fill:colors[CurrentColorNumber]});
				scenes[CurrentScene].datas[i][j]=CurrentColorNumber;
				break;
			case 3:
				path.flip(CurrentActionWay,'',{fill:colors[scenes[CurrentScene].CanvasColor]});
				scenes[CurrentScene].datas[i][j]='';
				break;
		}
		PaintThumb(CurrentScene,i,j);
	});
	$("input,samp").mousedown(function(event){
		switch(event.which)
		{
			case 3:
				HelpInfor(this);
				break;
		}
	});
	
	//界面初始化
	$("#Canvas svg").css('backgroundColor',DefaultScreenColor);
	CanvasResize(0);
	$("#Menus dt b").click(function(){
		var ind=$(this).index();
		$(this).addClass("cur").siblings().removeClass("cur");
		$("#Menus dd > div").eq(ind).show().siblings().hide();
	}).eq(0).click();
	//填充调色盘及颜色选择器的色块
	FillColors();
	//生成颜色选择器
	picker=ColorPicker();
	//生成信息窗
	infor=Information();
	/*********第一块，系统设置*********/
	//尺寸重置
	$("#OptionSet").click(function(){CanvasResize(1);})
	$("#OptionReset").click(function(){CanvasResize(0);});
	/*********第二块，所有帧*********/
	$("#ThumbsList").delegate('canvas','click',function(){
		CurrentScene=this.id.replace("Canvas",'');
		DrawCurrentScene();
		$(this).parent().addClass("cur").siblings().removeClass("cur");
	}).delegate('menu a','click',function(){
		var par=$(this).closest("li");
		var num=par.find("canvas").attr("id").replace('Canvas','')*1;
		var ind=orders.indexOf(num);
		switch($(this).find('i').text())
		{
			case '↑':
				par.insertBefore(par.prev());
				orders[ind]=orders[ind-1];
				orders[ind-1]=num;
				break;
			case '↓':
				par.insertAfter(par.next());
				orders[ind]=orders[ind+1];
				orders[ind+1]=num;
				break;
			case '×':
				if(!confirm('真的要删除此帧吗？删除后数据不可恢复！'))return;
				SceneDelete(num);
				break;
		}
	});
	//导出数据
	$("#ScenesExport").click(function(){
		var str='var scenes=[';
		for(var n=0;n<scenes.length;n++)
		{
			var scene=scenes[n];
			str+='{datas:"'+scene.datas+'"'
				+',CanvasColor:'+scene.CanvasColor
				+',ScreenColor:'+scene.ScreenColor
				+',ActionMode:"'+scene.ActionMode+'"'
				+'}';
			if(n<scenes.length-1)str+=',';
		}
		str+='],orders=['+orders+'],'
			+'GlobalWidth='+GlobalWidth+','
			+'GlobalHeight='+GlobalHeight+','
			+'GlobalUnit='+GlobalUnit+';';
		infor.open(str);
	});
	//导入数据
	$("#ScenesImport").click(function(){
		infor.open("请将scenes数组粘贴到文本域中，也可以加入orders数组或colors数组及全局尺寸变量GlobalWidth,GlobalHeight,GlobalUnit。",true);
		$("#Information input:button").unbind('click').click(function(){
			var str=$(this).siblings("textarea").val();
			str=str.replace(/var\s/g,'').replace(/\n/g,';');
			try{
				eval(str);
				$("#ThumbsList").empty();
				var width=MaxCanvasWidth,height=width*GlobalHeight/GlobalWidth,
					w=GlobalWidth/GlobalUnit,
					h=GlobalHeight/GlobalUnit;
				for(var n=0;n<orders.length;n++)
				{
					var num=orders[n];
					var str='<li class="cur">'
						+'<canvas id="Canvas'+ num +'" title="'+ num +'" width="'+ width +'" height="'+ height +'"></canvas>'
						+'<menu><a><i>↑</i>上移</a><a><i>↓</i>下移</a><a><i>×</i>删除</a></menu>'
					+'</li>';
					var datas=[];
					var arr=scenes[num].datas.split(',');
					for(var i=0;i<w;i++)
					{
						datas[i]=[];
						for(var j=0;j<h;j++)
							datas[i][j]=arr[i*h+j];
					}
					scenes[num].datas=datas;
					$("#ThumbsList").append(str);
					CurrentScene=num;
					PaintThumb(num,true);
				}
				$("#ThumbsList canvas:first-child").click();
				infor.close(true);
			}
			catch(e){
				alert("粘入的代码有错误！");
			}
		});
	});
	//清空数据
	$("#ScenesClear").click(function(){
		if(!confirm('真的要删除所有数据吗？删除后将不可恢复！'))return;
		if(!confirm('请再次确定清空所有数据！'))return;
		scenes=[];
		orders=[];
		CurrentScene=-1;
		$("#AllScenes canvas").remove();
		CreateNewScene();
	});
	//预览效果
	function PreviewStart()
	{
		action=0;
		var cbfuns={
			before:function(ind){
				$("#Canvas"+ind).parent().addClass("cur").siblings().removeClass("cur");
			}
		}
		FlipPixels(0,cbfuns);
		$("#ScenesPreview").val('停止播放').one('click',PreviewOver);
		$("input").not("#ScenesPreview").map(function(){this.disabled=true;});
		$("#ThumbsList").addClass("freeze");
	}
	function PreviewOver()
	{
		action=-1;
		$("#ScenesPreview").val('播放预览').one('click',PreviewStart);
		$("input").not("#ScenesPreview").map(function(){this.disabled=false;});
		$("#ThumbsList").removeClass("freeze");
	}
	$("#ScenesPreview").one('click',PreviewStart);
	/*********第三块，当前帧*********/
	//给背景色及默认色添加选色器
	$(".needColorPicker")
		.click(function(){picker.focus(this,'picker')})
		.change(function(){
			if($(this).next("samp").size()) $(this).next("samp").css('backgroundColor',this.value);
			$(this).data("colorNum",colors.indexOf(this.value));
		})
		.next("samp").click(function(){
			$(this).prev(".needColorPicker").click();
		});
	$("#ScreenColor").val(DefaultScreenColor).data("colorNum",colors.indexOf(DefaultScreenColor)).change();
	$("#CanvasColor").val(DefaultCanvasColor).data("colorNum",colors.indexOf(DefaultCanvasColor)).change();
	//创建新帧
	$("#SceneNew").click(function(){
		CreateNewScene();
		alert("创建成功，当前显示为新创建的帧！");
	});
	//复制本帧
	$("#SceneCopy").click(function(){
		CreateNewScene(CurrentScene);
		alert("复制成功，当前显示为新的复制帧！");
	});
	//删除本帧
	$("#SceneDel").click(function(){
		if(!confirm('确定要删除本帧吗？删除后将不可恢复！'))return;
		SceneDelete(CurrentScene);
	});
	//颜色重置，只改变当前帧，且只在保存的时候生效
	$("#SceneColorReset").click(function(){
		var ScreenColor=$("#ScreenColor").val();
		scenes[CurrentScene].ScreenColor=colors.indexOf(ScreenColor);
		$("#Canvas svg").css('backgroundColor',ScreenColor);
		//只把颜色为空的像素重绘颜色
		var CanvasColor=$("#CanvasColor").val();
		scenes[CurrentScene].CanvasColor=colors.indexOf(CanvasColor);
		DrawCurrentScene();
		PaintThumb(CurrentScene,false);
	});
	//行为的选定及更改，只改变当前帧
	var ActionModes=document.getElementsByName('ActionMode');
	for(var n=0;n<ActionModes.length;n++)
	{
		if(ActionModes[n].value==CurrentActionMode)
		{
			ActionModes[n].checked=true;
			break;
		}
	}
	$("#ActionModes label").click(function(){
		CurrentActionMode=$(this).find(":radio").val();
		scenes[CurrentScene].ActionMode=CurrentActionMode;
		var w;
		switch(CurrentActionMode)
		{
			case "l":case "r":case "lr-m":case "m-lr":w='|';break;
			case "t":case "b":case "tb-m":case "m-tb":w='-';break;
			case "lt":case "rb":w='/';break;
			case "lb":case "rt":w='\\';break;
			default:w='-';
		}
		CurrentActionWay=w;
	});
	/*********第四块，调色盘*********/
	$("#Colorpad .colors").delegate('i','click',function(){
		CurrentColorNumber=$(this).index();
		$(this).addClass("cur").siblings().removeClass("cur");
		$("#CurrentColor").val(this.title);
	}).find('i').eq(0).click();
	//给色彩值添加调色器
	$(".needColorRoller")
		.click(function(){picker.focus(this,'roller')})
		.change(function(){
			var newColor=this.value;
			var i=$("#Colorpad .colors i[title*='"+ newColor +"']");
			if(i.size())
			{
				$(this).next("samp").hide();
				$("#ColorAdd").get(0).disabled=true;
				i.addClass("cur").siblings().removeClass("cur");
			}
			else
			{
				$(this).next("samp").show();
				$("#ColorAdd").get(0).disabled=false;
			}
		});
	//添加颜色
	$("#ColorAdd").click(function(){
		var color=$("#CurrentColor").val();
		if(colors.indexOf(color)>=0) alert("当前颜色已经存在！");
		else
		{
			colors.push(color);
			$(".colors").append('<i title="'+ color +'" style=" background-color:'+ color +'"></i>');
			$("#Colorpad .colors i:last-child").click();
		}
	});
	//删除颜色
	$("#ColorDel").click(function(){
		if(!confirm('真的要删除吗？如果已经编辑过帧的话，则不建议这么做！'))return;
		var i=$("#Colorpad .colors i.cur");
		if(!i.size()) alert("还没选中颜色！");
		else
		{//删除被选颜色
			var ind=i.index();
			colors.splice(ind,1);
			$(".colors i:nth-of-type("+ (ind+1) +")").remove();
			//重新设置当前颜色
			$(".colors i").eq(ind>=colors.length ? 0 : ind).click();
			//重新设置系统默认画布色及背景色
			if(colors.indexOf(DefaultCanvasColor)<0) DefaultCanvasColor=colors[0];
			if(colors.indexOf(DefaultScreenColor)<0) DefaultScreenColor=colors[0];
			//重新设置当前帧画布色及背景色文本框
			if($("#CanvasColor").data("colorNum")>colors.length-1)
				$("#CanvasColor").val(DefaultCanvasColor).data("colorNum",0).change();
			if($("#ScreenColor").data("colorNum")>colors.length-1)
				$("#ScreenColor").val(DefaultScreenColor).data("colorNum",0).change();
			//遍历所有数据
			for(var n=0;n<scenes.length;n++)
			{
				var datas=scenes[n].datas;
				//将等于被删除颜色的属性都设置成对应的默认颜色或索引为0的颜色
				if(scenes[n].CanvasColor==ind)
					scenes[n].CanvasColor=colors.indexOf(DefaultCanvasColor);
				else if(scenes[n].CanvasColor>ind)
					scenes[n].CanvasColor--;
				
				if(scenes[n].ScreenColor==ind)
					scenes[n].ScreenColor=colors.indexOf(DefaultScreenColor);
				else if(scenes[n].ScreenColor>ind)
					scenes[n].ScreenColor--;
				for(var i=0;i<datas.length;i++)
				{
					for(var j=0;j<datas[i].length;j++)
					{//本色则置空，后续色则前移
						if(datas[i][j]==ind) datas[i][j]='';
						else if(datas[i][j]>ind) datas[i][j]--;
						else continue;
						PaintThumb(n,i,j);//重绘这一像素
					}
				}
			}
			DrawCurrentScene();
		}
	});
	//批量添加颜色
	$("#ColorAddBatch").click(function(){
		var colors=prompt('请输入3位或6位的HEX颜色，多个用逗号隔开，可以使用#。');
		if(!colors)return;
		colors=colors.split(',');
		for(var n=0;n<colors.length;n++)
		{
			var color=ColorFill(colors[n]);
			if(ColorTest(color) && colors.indexOf(color)<0)
			{
				colors.push(color);
				$(".colors").append('<i title="'+ color +'" style=" background-color:'+ color +'"></i>');
			}
		}
	});
	//清空调色盘
	$("#ColorClear").click(function(){
		if(!confirm('真的要清空调色盘吗？清空后需要立即导入新调色盘！'))return;
		colors=[];
		$(".colors").empty();
		infor.open("请将调色盘数组colors粘贴到文本域中，并按【导入数据】！",true);
		$("#Information input:button").unbind('click').click(function(){
			var str=$(this).siblings("textarea").val();
			str=str.replace(/var\s/g,'').replace(/\n/g,';');
			try{
				eval(str);
				FillColors();
				infor.close(true);
				RepaintThumbs();
				DrawCurrentScene();
			}catch(e){
				alert("粘入的代码有错误！");
			}
		});
	});
	//导入调色盘，会替换原有的调色盘
	$("#ColorImport").click(function(){
		if(!confirm('导入调色盘会替换现有的调色盘，继续吗？'))return;
		$("#ColorClear").click();
	});
	//导出调色盘
	$("#ColorExport").click(function(){
		alert("请复制将要看到的文本域中的所有字符！");
		var str="var colors='"+ colors +"'.split(',');";
		infor.open(str);
	});
});
function FillColors()
{
	$(".colors").append(function(){
		var str='';
		for(var n=0;n<colors.length;n++)
			str+='<i title="'+ colors[n] +'" style=" background-color:'+ colors[n] +'"></i>';
		return str;
	}).find('i:first-child').click();
}
//删除一帧
function SceneDelete(num)
{//删除一帧，删除数据，删除缩略图，删除顺序，将后续帧序号全部-1
	if(num>=scenes.length)
	{
		alert("删除帧时，索引溢出！");
		return false;
	}
	scenes.splice(num,1);
	//删除缩略图
	var canvas=$("#Canvas"+num);
	if(canvas.size()) canvas.closest("li").remove();
	canvas=$("#ThumbsList canvas");
	for(var n=0;n<canvas.length;n++)
	{
		var ind=canvas.eq(n).attr("id").replace('Canvas','')*1;
		if(ind>num)
		{
			ind--;
			canvas.eq(n).attr({'title':ind,'id':'Canvas'+ind});
		}
	}
	if(CurrentScene>=scenes.length)CurrentScene=scenes.length-1;
	$("#Canvas"+CurrentScene).click();
	//删除顺序
	var toSplice;
	for(var n=0;n<orders.length;n++)
	{
		if(orders[n]==num) toSplice=n;
		else if(orders[n]>num) orders[n]--;
	}
	orders.splice(toSplice,1);
}
//显示大量信息
function Information()
{
	var o={};
	var T=$("#Information").eq(0);
	o.open=function(str,editable){
		CHIbg.open(function(){
			T.fadeIn();
		});
		T.find("textarea").val(str);
		if(editable)
		{
			T.find("textarea").get(0).readOnly=false;
			T.find("input:button").show();
		}
		else
		{
			T.find("textarea").get(0).readOnly=true;
			T.find("input:button").hide();
		}
		CHIbg.focus(o);
	}
	o.close=function(noask){
		if(noask!==true && !confirm('你确定要关闭吗？请保证当前所显示的信息已经保存于其它位置！'))
		{
			CHIbg.focus(o);
			return;
		}
		T.fadeOut('','',function(){
			CHIbg.close();
		});
	}
	T.find("q").click(o.close);
	return o;
}
/*在某一帧的预览缩略图上画图
首参，被视为要绘制的帧序号
其余参数，如果为两个数字，则被视为某一像素的坐标值
默认为false，只改变缩略图的背景色（改变了默认色）
如果为true，则重绘指定帧全部像素
*/
function PaintThumb()
{
	var arg=arguments;
	if(!arg.length)
	{//无参则只绘制当前帧的背景（绘制新帧，要么是复制过的已经有内容，要么还没有内容）
		$("#Canvas"+CurrentScene).css("backgroundColor",colors[scenes[CurrentScene].CanvasColor]);
		return true;
	}
	var SceneNum=int(arg[0]);
	if(SceneNum>=scenes.length)
	{
		alert("绘制缩略图时，参数“帧序号”错误！");
		return false;
	}
	var thumb=$("#Canvas"+SceneNum),
		scene=scenes[SceneNum],
		datas=scene.datas,canvas=thumb.get(0),
		p=canvas.getContext('2d'),
		unit=canvas.width/GlobalWidth*GlobalUnit
	;
	if(arg.length<3)
	{
		thumb.css('backgroundColor',colors[scene.CanvasColor]);
		if(!arg[1])	return true;
		//默认重绘所有像素
		for(var i=0;i<datas.length;i++)
		{
			for(var j=0;j<datas[i].length;j++)
			{
				var color=datas[i][j];
				if(color==='' || color>=colors.length)continue;
				p.fillStyle=colors[color];
				p.fillRect(i*unit,j*unit,unit,unit);
			}
		}
	}
	else
	{//重绘某一像素
		var i=int(arg[1]),j=int(arg[2]);
		if(datas[i][j]===undefined)
		{
			alert("绘制缩略图时，像素坐标溢出！");
			return false;
		}
		var color=datas[i][j],
			x=i*unit,y=j*unit;
		if(color==='')
		{
			p.clearRect(x,y,unit,unit);
		}
		else
		{
			p.fillStyle=colors[color];
			p.fillRect(x,y,unit,unit);
		}
	}
}
function RepaintThumbs()
{
	for(var n=0;n<scenes.length;n++)
	{
		PaintThumb(n,true);
	}
}
//使用数据，绘制当前帧
function DrawCurrentScene()
{
	var scene=scenes[CurrentScene],
		arr=scene.datas,
		CanvasColor=scene.CanvasColor,
		ScreenColor=scene.ScreenColor;
	$("#Canvas svg").css('backgroundColor',ScreenColor);
	for(var i=0;i<arr.length;i++)
	{
		for(var j=0;j<arr[i].length;j++)
		{
			var color=colors[(arr[i][j]==='' ? CanvasColor : arr[i][j])]
			pixels[i][j].attr({fill:color});
		}
	}
	//将当前帧的选色框设置为数据中储存的内容
	$("#CanvasColor").data('colorNum',CanvasColor).val(colors[CanvasColor]).change();
	$("#ScreenColor").data('colorNum',ScreenColor).val(colors[ScreenColor]).change();
	$("#Canvas svg").css('backgroundColor',colors[ScreenColor]);
	$("#Action-"+scene.ActionMode).get(0).checked=true;
}
//创建新帧，并指向最新帧，可以带参来复制已存在的帧
function CreateNewScene(ind)
{
	if(ind===undefined)
	{//无参创建新帧
		var newScene={
			CanvasColor:colors.indexOf(DefaultCanvasColor),
			ScreenColor:colors.indexOf(DefaultScreenColor),
			ActionMode:CurrentActionMode,
			datas:[]
		};
		for(var i=0;i<GlobalWidth/GlobalUnit;i++)
		{
			newScene.datas[i]=[];
			for(var j=0;j<GlobalHeight/GlobalUnit;j++)
			{
				newScene.datas[i][j]='';
			}
		}
	}
	else
	{//有参复制对应帧
		if(!isNat(ind) || ind>=scenes.length)
		{
			alert("创建帧时，参数不合法，或索引溢出！");
			return;
		}
		var scene=scenes[ind];
		var newScene={
			datas:[],
			CanvasColor:scene.CanvasColor,
			ScreenColor:scene.ScreenColor,
			ActionMode:scene.ActionMode
		};
		var datas=scene.datas;
		for(var i=0;i<datas.length;i++)
		{
			newScene.datas[i]=[];
			for(var j=0;j<datas[i].length;j++)
			{
				newScene.datas[i][j]=datas[i][j];
			}
		}
	}
	scenes.push(newScene);
	CurrentScene=scenes.length-1;
	DrawCurrentScene();
	orders.push(CurrentScene);
	//缩略图列表的行为
	if(ind===undefined)
	{//无参创建新帧
		var w=MaxCanvasWidth,h=GlobalHeight*w/GlobalWidth;
		var str='<li class="cur">'
			+'<canvas id="Canvas'+ CurrentScene +'" title="'+ CurrentScene +'" width="'+ w +'" height="'+ h +'"></canvas>'
			+'<menu><a><i>↑</i>上移</a><a><i>↓</i>下移</a><a><i>×</i>删除</a></menu>'
		+'</li>';
	}
	else
	{//复制则直接获取原图
		var str=$("#Canvas"+ind).parent().html();
		str='<li class="cur">'+
			str.replace("Canvas"+ind,"Canvas"+CurrentScene).replace('title="'+ind+'"','title="'+CurrentScene+'"')
			+'</li>';
	}
	$("#ThumbsList").find("li").removeClass("cur")
		.end().append(str);
	ind===undefined ? PaintThumb() : PaintThumb(CurrentScene,true);
	typeof myscroll!='undefined' && setTimeout(function(){
		myscroll.refresh();
	});
}
//画布及像素尺寸重置
function CanvasResize(bool)
{
	if(!bool)
	{
		$("#CanvasWidth").val(GlobalWidth);
		$("#CanvasHeight").val(GlobalHeight);
		$("#PixelUnit").val(GlobalUnit);
		return false;
	}
	var u=$("#PixelUnit").val(),w=$("#CanvasWidth").val(),h=$("#CanvasHeight").val();
	if(w==GlobalWidth && h==GlobalHeight && u==GlobalUnit)
	{
		alert("完成");
		return;
	}
	if(w%u || h%u)
	{
		alert("画布的宽高，必须是像素对应尺寸的整数倍！");
		return false;
	}
	else
	{
		paper.setSize(w,h);
		GlobalWidth=w;GlobalHeight=h;
		var changed=GlobalUnit!=u;
		GlobalUnit=u;
		for(var i=0;i<max(w/u,pixels.length);i++)
		{//遍历像素数组，不存在则建立，过多则删除，已存在则改变形状
			if(!pixels[i]) pixels[i]=[];
			for(var j=0;j<max(h/u,pixels[i].length);j++)
			{
				if(!pixels[i][j])
				{//不存在的建立
					pixels[i][j]=paper.square(0,false).attr({
						stroke:false,
						fill:$("#CanvasColor").val(),
						transform:'T'+(i*GlobalUnit)+','+(j*GlobalUnit),
						title:i+','+j
					}).data({i:i,j:j});
				}
				else if(i>=w/u || j>=h/u)
				{//超过范围的移除
					pixels[i][j].remove();
				}
				else if(changed)
				{//不同尺寸才需要改变
					pixels[i][j].attr({
						path:paper.square(pixels[i][j].data('start'),pixels[i][j].data('sweep'),true),
						transform:'T'+(i*GlobalUnit)+','+(j*GlobalUnit)
					});
				}
			}
			if(pixels[i].length>h/u) pixels[i].splice(h/u,pixels[i].length);
		}
		if(pixels.length>w/u) pixels.splice(w/u,pixels.length);
		TidyScenes();
	}
}
//根据当前维度重新整理scenes，顺便重绘缩略图
function TidyScenes()
{
	var w=GlobalWidth/GlobalUnit,h=GlobalHeight/GlobalUnit;
	for(var n=0;n<scenes.length;n++)
	{
		var S=scenes[n].datas,
			C=colors[scenes[n].CanvasColor],
			canvas=$("#Canvas"+n).get(0),
			pen=canvas.getContext('2d'),
			unit=MaxCanvasWidth/GlobalWidth*GlobalUnit;
		if(S.length>w) S.splice(w,S.length);
		canvas.height=GlobalHeight/GlobalWidth*MaxCanvasWidth;
		pen.clearRect(0,0,canvas.width,canvas.height);
		
		if(S.length>w) S.splice(w,S.length);
		for(var i=0;i<w;i++)
		{
			if(!S[i]) S[i]=[];
			if(S[i].length>h) S[i].splice(h,S[i].length);
			for(var j=0;j<h;j++)
			{
				var color=S[i][j];
				if(color===undefined || color==='')S[i][j]='';
				else
				{
					pen.fillStyle=colors[color];
					pen.fillRect(i*unit,j*unit,unit,unit);
				}
			}
		}
	}
	alert("调节完成！");
}
//将三位颜色补成六位颜色
function ColorFill(v)
{
	v=v.replace('#','');
	var r,g,b;
	var n=v.length/3;
	r=v.substr(0*n,n);
	g=v.substr(1*n,n);
	b=v.substr(2*n,n);
	if(r.length==1)r+=r;
	if(g.length==1)g+=g;
	if(b.length==1)b+=b;
	return '#'+r+g+b;
}
//测试HEX颜色值合法性
function ColorTest(DOM)
{
	var reg_empty=/^[\s]*$/,
		reg_color=/^[\#]?([a-f0-9]{3}){1,2}$/i
	;
	if(DOM.constructor==String)
	{
		return reg_color.test(DOM);
	}
	else if(DOM.type=='text')
	{
		if(!reg_empty.test(DOM.value) && !reg_color.test(DOM.value))
		{
			alert("字符串非HEX颜色值！")
			DOM.focus();
			return false;
		}
		return true;
	}
	return false;
}
//颜色提取器
function ColorPicker()
{
	var o={};
	var T=$("#ColorPicker").eq(0);
	T.find("dt q").click(function(){T.hide()});
	//RGB通道
	T.find("input[type=range],input[type=number]").change(function(){
		RefreshColor(this.type);
	}).filter("[type=range]").change();
	$("#ColorValue").change(function(){
		var v=this.value;
		if(!ColorTest(this))return false;
		this.value=ColorFill(v);
		RefreshColor('text');
	});
	//色块
	T.find(".colors").delegate('i','click',function(){
		Light($(this));
		RefreshColor('colors');
	});
	function Light(JQ)//点亮色块
	{
		T.find(".colors i").removeClass("cur");
		JQ.addClass("cur");
	}
	function RefreshColor(from)
	{
		var color='';
		switch(from)
		{
			case 'range':
				color=T.find("input[type=range]").map(function(){
					var v=parseInt(this.value).toString(16);
					return v.length==1 ? '0'+v : v;
				}).toArray().join('');
				break;
			case 'number':
				color=T.find("input[type=number]").map(function(){
					var v=parseInt(this.value).toString(16);
					return v.length==1 ? '0'+v : v;
				}).toArray().join('');
				break;
			case 'text':
				color=T.find("#ColorValue").val();
				break;
			case 'colors':
				color=T.find(".colors .cur").attr("title");
				break;
		}
		color=color.replace('#','').toUpperCase();
		T.find("samp").css('backgroundColor','#'+color);
		var r,g,b;
		r=parseInt(color.substr(0,2),16);
		g=parseInt(color.substr(2,2),16);
		b=parseInt(color.substr(4,2),16);
		
		if(from!='range')
		{
			$("#RedRange").val(r);
			$("#GreenRange").val(g);
			$("#BlueRange").val(b);
		}
		if(from!='number')
		{
			$("#RedValue").val(r);
			$("#GreenValue").val(g);
			$("#BlueValue").val(b);
		}
		if(from!='text')
		{
			$("#ColorValue").val('#'+color);
		}
		if(from!='colors')
		{
			Light(T.find(".colors i[title*='"+ color +"']"));
		}
	}
	/*
	直接在需要色彩选择器的DOM上使用此方法
	mode，如果为picker则显示色块选取，如果为roller则显示RGB调节色彩
	*/
	o.focus=function(DOM,mode){
		if(!ColorTest(DOM)) DOM.value='';
		$("#ColorValue").val(DOM.value).change();
		T.css({
			left:$(DOM).offset().left + 'px',
			top: ($(DOM).offset().top + $(DOM).height()) + 'px'
		}).show();
		T.find(":submit").unbind('click').one('click',function(){
			T.hide();
			$(DOM).val($("#ColorValue").val()).blur().change();
		});
		switch(mode.toLowerCase())
		{
			case 'picker':
				T.find("div").show().siblings("p").hide();
				$("#ColorValue").get(0).readOnly=true;
				break;
			case 'roller':
				T.find("p").show().siblings("div").hide();
				$("#ColorValue").get(0).readOnly=false;
				break;
		}
	}
	return o;
}