function vrbShutter(selector, pieces =4, duration =5){
    var shutter=$(selector);
    var anchors=shutter.find("a");
    var imgs=shutter.find("img");
    var ul=shutter.find("ul");
    var lis=ul.find("li").hide();
    lis.eq(0).show();
    var unitWidth=shutter.innerWidth()/pieces;
    var index=0,counter=0;
    var maxindex=lis.length;
    function rotateRight(){
        lis.eq(index).hide();
        var frontImg=imgs.eq(index).attr("src");
        index++;
        index%=maxindex;
        var leftImg=imgs.eq(index).attr("src");
        for(var n=0;n<pieces;n++){
            var group=$("<div>").addClass("group").css({
                "position":"absolute",
                "left":n*unitWidth,
                "top":0,
            }).appendTo(shutter);
            var front=$("<div>").addClass("front").css({
                "transform":"rotateY(0)",
                "background-image":`url(${frontImg})`,
                "background-position":`-${unitWidth*n}px 0`
            }).appendTo(group);
            var left=$("<div>").addClass("left").css({
                "transform":"rotateY(-90deg)",
                "background-image":`url(${leftImg})`,
                "background-position":`-${unitWidth*n}px 0`
            }).appendTo(group);
            group.add(front).add(left).css({
                "width":unitWidth,
                "height":"100%",
            });
            front.add(left).css({
                "transform-origin":`50% 50% -${unitWidth/2}px`
            });
        }
        n=0;
        var timer=setInterval(function(){
            var group=shutter.find(".group").eq(n++);
            group.find(".left").css("transform","rotateY(0)");
            group.find(".front").css("transform","rotateY(90deg)");
            if(n==pieces) {
                clearInterval(timer);
            }
        },100);
    }
    setInterval(function(){
        rotateRight();
        setTimeout(function(){
            shutter.find(".group").remove();
            lis.eq(index).show();
        },pieces*100+600);
    },duration*1000);
}
