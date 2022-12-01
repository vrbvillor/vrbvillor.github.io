/**
 * 获得随机整数数组
 * @param  {[int]} maxnum               [元素的最大个数]
 * @return {[int]}                      [包含maxnum个整数的随机数组]
 */
function shuffle(maxnum){
    var index=0;
    var number,indices=[];
    var pointer=0;
    for(var n=0;n<maxnum;n++){
        number=Math.random();
        if(n==0){
            indices.push([number,0]);
            continue;
        }
        if(indices[pointer][0]>=number){
            while(pointer>=0 && indices[pointer][0]>=number){
                pointer--;
            }
            if(pointer==-1){
                indices.unshift([number,n]);
                pointer=0;
            }else{
                indices.splice(pointer+1,0,[number,n]);
            }
        }else{
            while(pointer<indices.length && indices[pointer][0]<number){
                pointer++;
            }
            if(pointer==indices.length){
                indices.push([number,n]);
            }else{
                indices.splice(pointer,0,[number,n]);
            }
        }
    }
    for(n=0;n<indices.length;n++){
        indices[n]=indices[n][1];
    }
    console.log(indices);
    return indices;
}
/**
 * 马赛克拼图效果
 * @param  {[JQselelctor]} selector         [容器选择器]
 * @param  {int} [xnum=4]                   [横向个数]
 * @param  {int} [ynum=3]                   [纵向个数]
 * @param  {int} [duration=5]               [每帧时间]
 * @return {[JQobject]}                     [容器JQ对象]
 */
function vrbMosaic(selector, xnum=4, ynum=3, duration=5){
    try {
        if(typeof $!="function") throw "This effect need jQuery";
        var mosaic=$(".mosaic");
        mosaic.append("<div>").find("div").addClass("bricks").css({
            "width":"100%",
            "height":"100%",
            "position":"absolute",
            "left":0,
            "top":0
        });
        var bricks=mosaic.find(".bricks").hide();
        var lis=mosaic.find("li");
        lis.hide().eq(0).show();
        var index=0;
        var maxIndex=lis.length;
        var unitWidth=mosaic.width()/xnum;
        var unitHeight=mosaic.height()/ynum;
        var maxnum=xnum*ynum;
        function next(){
            index++;
            index%=maxIndex;
            bricks.show();
            var indices=shuffle(maxnum);
            var src=lis.eq(index).find("img").attr("src");
            for(var n=0;n<maxnum;n++){
                var left=indices[n]%xnum*unitWidth;
                var top=Math.floor(indices[n]/xnum)*unitHeight;
                var initLeft=n%xnum*unitWidth;
                var initTop=Math.floor(n/xnum)*unitHeight;
                $("<span>").css({
                    "width":unitWidth,
                    "height":unitHeight,
                    "position":"absolute",
                    "left":initLeft,
                    "top":initTop,
                    "background-image":`url(${src})`,
                    "background-position":`-${left}px -${top}px`,
                    "display":"none"
                }).appendTo(bricks)
                .fadeIn("slow")
                .delay(n*100)
                .data("n",n)
                .animate({
                    "left":left,
                    "top":top
                },"slow",function(){
                    if($(this).data("n")==maxnum-1){
                        lis.hide().eq(index).show();
                        bricks.empty().hide();
                    }
                });
            }
        }
        setInterval(next,duration*1000);
    } catch (e) {
        console.error(e);
    } finally {
        return mosaic;
    }
}
