function vrbSticky(selector, from=0, to=$(document).height()){
    try {
        if(typeof $!="function") throw "This effect need jQuery";
        var static=$(selector).filter(".static");
        var sticky=$(selector).filter(".sticky");
        var cloned=$(selector).filter(".cloned");
        $(window).scroll(function(){
            var scrollTop=$(window).scrollTop();
            if(scrollTop>=from && scrollTop<=to){
                static.add(cloned).css("visibility","hidden");
                sticky.show();
            }
            else if(scrollTop<=from || scrollTop>=to){
                sticky.hide();
                static.add(cloned).css("visibility","visible");
            }
        });
        $(window).scroll();
    } catch (e) {
        console.error(e);
    } finally {

    }
}
