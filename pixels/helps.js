// JavaScript Document
function HelpInfor(t)
{
	var str='';
	switch(t.id)
	{
		//系统设置
		case "PixelUnit":str='定义：每个像素的单位尺寸，长宽相等\n类型：正整数\n范围：1-99';break;
		case "CanvasWidth":str='定义：画布的宽\n类型：正整数\n范围：1-1280\n要求：必须是像素尺寸的整数倍';break;
		case "CanvasHeight":str='定义：画布的高\n类型：正整数\n范围：1-800\n要求：必须是像素尺寸的整数倍';break;
		case "OptionSet":str='功能：根据当前的尺寸（如果合理的话）重置画布上的像素块\n注意：如果之前未存在的像素，则使用空数据建立；如果新范围超出的像素，则删除，不可恢复！这是一项消耗很大的操作，请尽量避免使用本功能！';break;
		case "OptionReset":str='功能：将当前输入的尺寸还原\n注意：如果已经点了设置按钮的话，则本项无效';break;
		//所有帧
		case "SceneNew":str='功能：创建一个新的空帧，会使用当前帧的画布背景及默认颜色\n注意：使用后会定位在新建的帧上';break;
		case "ScenesPreview":str='功能：在当前的编辑区域内，预览已经储存的帧\n注意：在播放时，再次点击本按钮，会停在显示的帧上';break;
		case "ScenesImport":str='功能：将数据粘在出现的文本域中，替换当前的数据\n注意：当前的数据会完全消失，请确定好再导入';break;
		case "ScenesExport":str='功能：显示当前储存的帧的顺序及内容设置\n注意：显示出来内容是可以直接放在脚本里边的，不需要额外的处理';break;
		case "ScenesClear":str='功能：清空当前储存的所有帧的信息\n注意：不会影响调色盘的数据';break;
		//当前帧
		case "ScreenColor":str='定义：当前画布的背景颜色，在像素动画时会看到的背景色，是调色盘中已经存在的颜色\n注意：当调色盘中删除了此颜色时，显示的状态并不会被改变，因为数据中本项目是以HEX颜色储存的';break;
		case "CanvasColor":str='定义：当前画布的默认颜色，就是像素"未被编辑过"时显示的颜色，是调色盘中已经存在的颜色\n注意：当调色盘中删除了此颜色时，显示的状态并不会被改变，因为数据中本项目是以HEX颜色储存的';break;
		case "SceneColorReset":str='功能：使用当前选定的颜色，重置当前帧的对应数据及显示效果\n注意：本操作只改变当前帧的效果，不会影响其它帧';break;
		case "Action-t":str='功能：将当前帧的播放模式切换成从上到下逐行水平翻转的效果\n注意：本操作只改变当前帧的效果，不会影响其它帧';break;
		case "Action-b":str='功能：将当前帧的播放模式切换成从下到上逐行水平翻转的效果\n注意：本操作只改变当前帧的效果，不会影响其它帧';break;
		case "Action-l":str='功能：将当前帧的播放模式切换成从左到右逐列垂直翻转的效果\n注意：本操作只改变当前帧的效果，不会影响其它帧';break;
		case "Action-r":str='功能：将当前帧的播放模式切换成从右到左逐列垂直翻转的效果\n注意：本操作只改变当前帧的效果，不会影响其它帧';break;
		case "Action-lt":str='功能：将当前帧的播放模式切换成从左上角到右下角斜行翻转的效果\n注意：本操作只改变当前帧的效果，不会影响其它帧';break;
		case "Action-rb":str='功能：将当前帧的播放模式切换成从右下角到左上角斜行翻转的效果\n注意：本操作只改变当前帧的效果，不会影响其它帧';break;
		case "Action-lb":str='功能：将当前帧的播放模式切换成从左下角到右上角斜行翻转的效果\n注意：本操作只改变当前帧的效果，不会影响其它帧';break;
		case "Action-rt":str='功能：将当前帧的播放模式切换成从右上角到左下角斜行翻转的效果\n注意：本操作只改变当前帧的效果，不会影响其它帧';break;
		case "Action-lr-m":str='功能：将当前帧的播放模式切换成从左右到中间的垂直翻转效果\n注意：本操作只改变当前帧的效果，不会影响其它帧';break;
		case "Action-m-lr":str='功能：将当前帧的播放模式切换成从中间到左右的垂直翻转效果\n注意：本操作只改变当前帧的效果，不会影响其它帧';break;
		case "Action-tb-m":str='功能：将当前帧的播放模式切换成从上下到中间的垂直翻转效果\n注意：本操作只改变当前帧的效果，不会影响其它帧';break;
		case "Action-m-tb":str='功能：将当前帧的播放模式切换成从中间到上下的垂直翻转效果\n注意：本操作只改变当前帧的效果，不会影响其它帧';break;
		case "SceneCopy":str='功能：创建一个新的帧，数据使用当前帧的数据\n注意：使用后会定位在新复制的帧上';break;
		case "SceneDel":str='功能：删除本帧，会完全删除本帧的所有数据\n注意：删除后将不可恢复！';break;
		//调色盘
		case "CurrentColor":str='定义：当前被选中的颜色，如果在画布上点击像素的话，会将本颜色设置给被点击的像素\n注意：如果点击本块，将调用出选色器的RGB通道模式，可以调节出已有色盘中不存在的颜色，可以使用添加按钮将此颜色添加到色盘中';break;
		case "ColorAdd":str='功能：将"当前颜色"添加到调色盘中\n注意：已经存在的颜色不会被添加';break;
		case "ColorDel":str='功能：将色块中被选中的颜色删除\n注意：这是一项很严重的操作，删除后，程序会将所有已经存储的数据遍历一次，已保证其它的颜色数据正常，被删除的颜色将被置空，也就是使用其所在帧的默认颜色';break;
		case "ColorAddBatch":str='功能：点击后将会提示输入颜色值串，可以将输入的颜色（如果不存在于调色盘中的话）依次加到调色盘中\n注意：输入的内容中，不合法的颜色值将被忽略';break;
		case "ColorClear":str='功能：清空当前调色盘，并立即打开批量添加颜色功能\n注意：这是一项很严重的操作，清空后所有的数据都不会被重写，请立即导入新的调色盘，且保证颜色数量至少与当前调色盘相同，否则当前储存的数据将会不正常！！！！！';break;
		case "ColorImport":str='功能：导入新的调色盘，替换当前的调色盘\n注意：这是一项很严重的操作，清空后所有的数据都不会被重写，导入新的调色盘，要保证颜色数量至少与当前调色盘相同，否则当前的储存的数据将会不正常！！！！！';break;
		case "ColorExport":str='功能：显示当前的调色盘数据数组，可以直接粘贴到特效代码中使用';break;
		//选色器
		case "RedRange":str='功能：调节颜色的"红"色通道值\n范围：0-255';break;
		case "GreenRange":str='功能：调节颜色的"绿"色通道值\n范围：0-255';break;
		case "BlueRange":str='功能：调节颜色的"蓝"色通道值\n范围：0-255';break;
		case "RedValue":str='功能：输入颜色的"红"色通道值\n范围：0-255';break;
		case "GreenValue":str='功能：输入颜色的"绿"色通道值\n范围：0-255';break;
		case "BlueValue":str='功能：输入颜色的"蓝"色通道值\n范围：0-255';break;
		case "ColorValue":str='功能：显示当前获得的颜色值/可以粘贴进一个合法的颜色值';break;
		case "GetColorValue":str='功能：将当前的颜色值，赋值给对应的输入框中\n注意：不点击确定的话是不会生效的';break;
		//samp部分
		case "SceneBackground":str='当前帧的背景颜色预览';break;
		case "SceneDefault":str='当前帧的默认颜色预览';break;
		case "ColorNew":str='当前颜色是新颜色，可以添加到调色盘中，使其生效，生效后则可设置为像素颜色';break;
		case "ColorPickerView":str='当前选中的或调节出来的颜色预览';break;
		//case "":str='';break;
	}
	alert(str);
}
