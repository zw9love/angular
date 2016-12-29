    (function(){
        //点击编辑按钮的时候
        $('.page_header>span.move a').click(function(){

            $('.comment_left').toggleClass('show');
            var haveShow=$('.comment_left').hasClass('show');
            if(haveShow){
                $(this).text('取消');
            }else{
                $(this).text('编辑');
            }
        });


        //点击删除按钮的时候
        var obj=null;
        $('.comment_left').click(function(){
            $('.shadow').addClass('show');
            obj=$(this).parent();
            $('html,body').addClass('noscroll');
        });


        //点击取消按钮的时候
        $('button.cancel').click(function(){
            $('.shadow').removeClass('show');
            $('html,body').removeClass('noscroll');
        });


        //点击确定按钮的时候
        $('button.sure').click(function(){
            $('.shadow').removeClass('show');
            $('html,body').removeClass('noscroll');
            obj.remove();
            if($('.comment').length==0){
                $('.no_comment').addClass('show');
                $('.page_header>span.move').css({
                    'opacity':0
                });
            }
        });

        //模态框滑动的时候阻止浏览器的默认事件
        // $('.shadow').on('touchstart',function(e){
        //     e.preventDefault();
        // });

    })();