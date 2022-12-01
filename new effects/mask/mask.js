function vrbMask(selector, xnum=4, ynum=3){
    if(typeof $!="function") throw "This effect need jQuery";
    var mask=$(selector);
    var lastMouseX=0;
    var lastMouseY=0;
    var lastIndex=0;
    var thisIndex=0;
    function indexParse(index){
        var xcoord=Math.floor(index/xnum);
        var ycoord=index%xnum;
        return [xcoord,ycoord];
    }
    $("body").mousemove(function(event){
        lastMouseX=event.clientX;
        lastMouseY=event.clientY;
    });
    mask.hover(function(event){
        console.info("enter into mask...");
        var mouseX=event.clientX;
    },function(){
        console.info("leave from mask...");
        $(".last").find("figcaption").animate({

        },"slow");
    })
    .find("li").hover(function(){
        lastIndex=thisIndex;
        thisIndex=$(this).index();
        var lastCoord=indexParse(lastIndex);
        var thisCoord=indexParse(thisIndex);
        console.log(lastCoord,thisCoord);

        $(this)
    },function(){
    });
}
