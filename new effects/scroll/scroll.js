/**
 * vrbScroll：无限滚动特效
 * @param  {String} [selector=".scroll"]               [特效的外层容器]
 * @param  {String} [direction="l"]                    [udlr滚动方向]
 * @param  {Number} [step=1]                           [每次移动的像素值]
 * @param  {Number} [duration=30]                      [每次移动的间隔时间]
 * @return {[jQuery]}                                  [返回容器的JQ对象]
 */
function vrbScroll(selector =".scroll", direction ="l", step =1,duration =30) {
    try {
        if(typeof $!="function") throw "This effect need jQuery.";
        if(!direction.match(/[udlr]/gi)) direction="l";
        var scroller=$(selector);
        if(scroller.length==0) throw "Selector error."
        var ul=scroller.children(0);
        var lis=ul.children();
        var totalLength=0;
        lis.map(function(index, elem) {
            var dimension=direction.match(/[ud]/ig)? $(elem).outerHeight(true): $(elem).outerWidth(true);
            totalLength+=dimension;
            return dimension;
        });
        var timer;

        direction.match(/ud/)?ul.width(totalLength*2):ul.height(totalLength*2);
        ul.append(lis.clone());
        function action(){
            switch (direction.toLowerCase()) {
                case 'u':
                    timer=setInterval(function(){
                        var margin=parseInt(ul.css("marginTop"));
                        if(Math.abs(margin)>=totalLength){
                            ul.css("marginTop",0);
                            margin=0;
                        }
                        ul.css("marginTop",margin-step);
                    },duration);
                    break;
                case 'd':
                    timer=setInterval(function(){
                        var margin=parseInt(ul.css("marginTop"));
                        if(margin>=0){
                            ul.css("marginTop",-totalLength);
                            margin=parseInt(ul.css("marginTop"));
                        }
                        ul.css("marginTop",margin+step);
                    },duration);
                    break;
                case 'l':
                    timer=setInterval(function(){
                        var margin=parseInt(ul.css("marginLeft"));
                        if(Math.abs(margin)>=totalLength){
                            ul.css("marginLeft",0);
                            margin=0;
                        }
                        ul.css("marginLeft",margin-step);
                    },duration);
                    break;
                case 'r':
                    timer=setInterval(function(){
                        var margin=parseInt(ul.css("marginLeft"));
                        if(margin>=0){
                            ul.css("marginLeft",-totalLength);
                            margin=parseInt(ul.css("marginLeft"));
                        }
                        ul.css("marginLeft",margin+step);
                    },duration);
                    break;
            }
        }
    } catch (e) {
        console.error(e);
    } finally {
        scroller.changeDirection=function(){
            /u/gi.test(direction)? (direction="d"):
            /d/gi.test(direction)? (direction="u"):
            /l/gi.test(direction)? (direction="r"):(direction="l");
            clearInterval(timer);
            action();
        }
        return scroller;
    }
}
