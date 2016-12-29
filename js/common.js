    
    //快速点击事件
    $(function() {
          FastClick.attach(document.body);
    });

    //html字号的变化  返回按钮点击事件
    
    (function(){
        var size=parseInt($('html').css('font-size'));


        //html字号的初始化
        function init(){
            var width=$(window).width();
            if(width<750){
                var bili=width/750;
                $('html').css({
                    'font-size':bili*size
                });
            }else{
                $('html').css({
                    'font-size':size
                });
            }
        }

        init();

        //当可视窗的尺寸发生改变的时候
        $(window).resize(init);


        //返回键按下
        $('.back').click(function(){
            window.history.back();
        });

        $('html')[0].onselectstart=function(){
            return false;
        };


    })();