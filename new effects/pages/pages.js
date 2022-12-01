/**
 * vrbPages：边界式分页效果
 * @param  {String} [selector=".pages"]               [效果的最外层容器]
 * @param  {String} [playPos=""]                      [正向播放的控制器jQ对象]
 * @param  {String} [playNeg=""]                      [负向播放的控制器jQ对象]
 * @param  {String} [indices=""]                      [播放到指定格的索引控制器jQ对象]
 * @return {[jQuery]}                                 [返回容器的JQ对象]
 */
function vrbPages(selector =".pages", duration =3000, playPos ="", playNeg ="", indices =""){
    try {
        if(typeof $!="function") throw "This effect need jQuery";
        var pages=$(selector);
        var ul=pages.find("ul");
        var lis=ul.children();
        var maxIndex=lis.length-1;
        var eachSize=parseInt(lis.outerWidth(true));
        var index=0;
        var timer=setInterval(function(){
            next();
        },duration);
        function play(index){
            ul.stop(true).animate({
                "marginLeft": eachSize*index*-1
            },"slow");
        }
        function next(){
            if(index==maxIndex) index=-1;
            index++;
            play(index);
        }
        if($(playPos).length){
            $(playPos).click(function(){
                index--;
                if(index<0) index=maxIndex;
                play(index);
            });
        }
        if($(playNeg).length){
            $(playNeg).click(next);
        }
        if($(indices).length){
            $(indices).click(function(){
                index=$(indices).index(this);
                play(index);
            });
        }
    } catch (e) {
        console.error(e);
    } finally {
        return pages;
    }
}
