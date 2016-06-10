/*
sJQcontainer，要使用本特效的容器的JQ选择器字符串
本特效的DOM结构一定要用
<ul>
	<li>
		<a></a>
		<ul>
			...以此类推
		</ul>
	</li>
</ul>
本特效会将有下级导航的li附加上kids类，并将本级的a标签的href设置成javascript:void(0)，及附加类kids
bSmooth，滑动，如果是则使用上下滑动，否则使用直接显示隐藏
oCallbacks，回调函数列表对象，可以使用的属性有
	.init(oJQcontainer)，完成初始化时执行的函数，参数为容器的JQ对象
	.hide(oJQul)，每一次缩回时执行的函数，参数为缩回的ul的JQ对象，可以通过DOM树级关系找到对应的a及li
	.show(oJQul)，每一次展开时执行的函数，参数为展开的ul的JQ对象，可以通过DOM树级关系找到对应的a及li
*/
function CHImenu(sJQcontainer, bSmooth, oCallbacks) {
	if (!sJQcontainer || !$(sJQcontainer).size()) return;
	if (bSmooth === undefined) bSmooth = 1;
	var oJQlis = $(sJQcontainer + " li");
	var sHideFunName = bSmooth ? "slideUp" : "hide";
	var sShowFunName = bSmooth ? "slideDown" : "show";
	if (!oCallbacks) oCallbacks = {};
	oJQlis.map(function() {
		var oJQli = $(this);
		if (oJQli.has("ul").length) {
			oJQli.addClass("kids").children("a").attr("href", "javascript:void(0)").addClass("kids").click(function() {
				var ul = $(this).next("ul");
				if (ul.data("state") == 0) {
					ul[sShowFunName]().data("state", 1);
					if (oCallbacks.show) oCallbacks.show.call(ul, ul.siblings('a'), ul.parent('li'));
				} else {
					ul[sHideFunName]().data("state", 0);
					if (oCallbacks.hide) oCallbacks.hide.call(ul, ul.siblings('a'), ul.parent('li'));
				}
			});
		}
	});
	var uls = $(sJQcontainer + " li ul");
	uls.data("state", 0);
	uls[sHideFunName]();
	if (oCallbacks.init) oCallbacks.init.call($(sJQcontainer));
}