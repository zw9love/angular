(function(){

    //收藏按钮的点击事件
    var sclock=true;
    $('#sc').click(function(){
        var orderFlag=$(this).attr('orderFlag');
        if(!sclock) return;
        sclock=false;
        if(orderFlag=="true"){

            $(this).attr({
                'orderFlag':'false',
                'src':'../images/star_hover.png'
            });

            $('.modal>div').text('已收藏');
            $('.modal').fadeIn('slow',function(){
                $(this).fadeOut('slow',function(){
                    sclock=true;
                });
            });

        }else{

            $(this).attr({
                'orderFlag':'true',
                'src':'../images/star.png'
            });
            $('.modal>div').text('已取消收藏');
            $('.modal').fadeIn('slow',function(){
                 $(this).fadeOut('slow',function(){
                    sclock=true;
                });
            });
        }

    });

    
    //给每个点赞对象增加一个是否点过赞的属性
    $('.main_comment_contain:last-child img').each(function(){
        $(this)[0].add=false;
    });
    
    
    // 点击点赞按钮事件
    $('.main').on('click','.main_order .main_comment_contain:last-child img',function(){
        if($(this)[0].add) return;
        var obj=$(this).parent().siblings('span');
        var num=Number(obj.text());
        obj.text(++num);
        $(this)[0].add=true;
    });

    // 点击分享图片的时候

    $('#share').click(function(){
        $('.comment_fixed_hide').css({
            'display':'block'
        });

        $('.cancle').css({
            'display':'block'
        });

        $('.comment_fixed ul li').not('.cancle').css({
            'opacity':'0'
        });

        $('.shadow').css({
            'display':'block'
        });
    });

    // 点击分享取消按钮的时候

    $('#cancel').click(function(){
        $('.comment_fixed_hide').css({
            'display':'none'
        });

        $('.cancle').css({
            'display':'none'
        });

        $('.comment_fixed ul li').not('.cancle').css({
            'opacity':'1'
        });

        $('.shadow').css({
            'display':'none'
        });
    });

    // 点击底部输入框的时候

    $('.comment_txt').click(function(e){

        // console.log($(this)[0]);

        $('.comment_fixed').css({
            'opacity':0
        });

        appendIndex=-1;

        var obj=$('#txt')[0];
        // console.log(obj);
        obj.focus();

        // e.preventDefault();

        $('html,body').addClass('noscroll');

        name="";

        $('#txt').val('');

        // $('#txt').trigger('focusin');

        $('#txt').attr({
            'placeholder':'我来说两句...'
        });

        $('.text').css({
            'opacity':1,
            'z-index': 102
        });

        $('.shadow').css({
            'display':'block'
        });

    });

    // 点击输入框取消按钮的时候

    $('.btn1').click(function(){

         $('.comment_fixed').css({
            'opacity':1
        });

        $('#txt').off('touchstart');

        $('.text').css({
            'opacity':'0',
            'z-index':-1
        });

        $('.shadow').css({
            'display':'none'
        });

        $('html,body').removeClass('noscroll');

    });

    // 点击输入框发表按钮的时候

    $('.btn2').click(function(){

        $('.comment_fixed').css({
            'opacity':1
        });

        //除去输入框的留下来的touchstart事件
        $('#txt').off('touchstart');

        $('html,body').removeClass('noscroll');

        $('.text').css({
            'opacity':'0',
            'z-index':-1
        });

        $('.shadow').css({
            'display':'none'
        });

        var str=$('#txt').val();



        if(appendIndex==-1){

            var dom='<div class="main_contain"><div class="main_order main_admin"><a href="javascript:;"><img src="../images/order.png" alt=""></a><div class="main_order_info"><p><a href="javascript:;">壮李壮李壮</a></p><p>刚刚</p></div><div class="main_comment"><div class="main_comment_contain"><span>0</span><a href="javascript:;"><img src="../images/msg.png" alt=""></a></div><div class="main_comment_contain"><span>0</span><a href="javascript:;"><img src="../images/like.png" alt=""></a></div></div></div><div class="main_comment_msg"><div class="main_comment_owner"><p>'+str+'</p></div></div></div>';

            $(dom).appendTo($('.container'));

            return;
        };

        //获取到点击的是那个留言块
        var obj=$('.main_contain').eq(appendIndex).find('.main_comment_other');
        
        //判断有没有评论快，没有则创建
        if(!obj[0]){
            // console.log($('.main_contain').eq(appendIndex).find('main_comment_owner'));
            $('.main_contain').eq(appendIndex).find('.main_comment_owner').append('<div class="line"></div><div class="main_comment_other"></div><div class="line"></div>');
            obj=$('.main_contain').eq(appendIndex).find('.main_comment_other');

        }

        //判断有没带用户名评论
        if(!name){
        $('<p><span class="main_comment_name"><a href="javascript:;">壮李壮李壮: </a></span>'+str+'</p>').appendTo(obj);
        }else{
        $('<p><span class="main_comment_name"><a href="javascript:;">壮李壮李壮 </a></span>回复<span class="main_comment_name"><a href="javascript:;"> '+name+': </a></span>'+str+'</p>').appendTo(obj);
        }

        //如果更多留言存在，则删除
        if(obj.siblings('.more')[0]){
            obj.find('p').removeClass('hide');
            obj.siblings('.more').remove();
        }

    });


    // 点击用户名的时候
    var name;
    $('.main').on('click','.main_comment_owner .main_comment_name',function(){
        $('#txt').val('');
        name=$(this).text();
        appendIndex=$(this).parents('.main_contain').index();
        var key=name.indexOf(':');
        name=name.slice(0,key);
        // console.log(name);
        $('#txt').attr({
            'placeholder':'回复:  '+name
        });
        $('.text').css({
            'opacity':1,
            'z-index': 102
        });

        $('.comment_fixed').css({
            'opacity':0
        });

        $('#txt')[0].focus();

        $('.shadow').css({
            'display':'block'
        });

    });


    //模态框滑动的时候阻止浏览器的默认事件
    $('.shadow').on('touchstart',function(e){
        e.preventDefault();
    });


    //textarea上下滑动事件
    $('#txt').focus(function(e){

        $('#txt').on('touchstart',function(e){
            e.preventDefault();
            var y1=e.originalEvent.changedTouches[0].clientY;
            var nowScroll=$(this).scrollTop();
            var start=new Date().getTime();
            var dis;

            $(this).on('touchmove',function(e){
                e.preventDefault();
                var y2=e.originalEvent.changedTouches[0].clientY;
                dis=y2-y1;
                $(this).scrollTop(nowScroll-dis);

            });

            $(this).on('touchend',function(e){
                // e.preventDefault();
                // console.log($(this).scrollTop());
                $('#txt').off('touchmove');
                $('#txt').off('touchend');
                var y2=e.originalEvent.changedTouches[0].clientY;  
                var end=new Date().getTime();
                var time=end-start;
                // console.log(y1,y2);
                if(time<300 && y2>y1){
                    $(this).stop().animate({
                        scrollTop:0
                    },800);
                }else if(time<300 && y2<y1){
                    $(this).stop().animate({
                        scrollTop:500
                    },800);
                }

            });
        });

    });


    // textarea失去焦点事件
    $('#txt').blur(function(){
        //除去输入框的留下来的touchstart事件
        $(this).off('touchstart');
    });


    //页面初始化的时候,多于2条的留言都隐藏
    $('.main_comment_other p:gt(1)').addClass('hide');
    

    //点击更多留言按钮的时候
    $('.main_comment_owner>p a').click(function(){
        $(this).parent().siblings('.main_comment_other').find('p:gt(1)').removeClass('hide');
        $(this).remove();
    });

    //点击返回按钮
    $('.comment_fixed ul li img.back').click(function(){
        window.history.back();
    });

    // 点击留言图片按钮
    var appendIndex;
    $('.main').on('click','.main_order .main_comment_contain:first-child img',function(){
        //触发底部块的点击事件
        $('.comment_txt').trigger('click');
        //点击的时候把点击的留言块的下标记录下来
        appendIndex=$(this).parents('.main_contain').index();
    });


    // 底部msg按钮 
    $('.cancle').prev().click(function(){
        $('.comment_txt').trigger('click');
    });

    // 底部ajax
    var lock=true;
    $(window).scroll(function(){
        // 文档总高度
        var h1=$(document).height();
        // 可视窗高度
        var h2=$(window).height();
        // 滚动轴的高度
        var scroll=$(document).scrollTop();
        // 高度差值
        var dis=h1-h2;
        if(scroll==dis && lock){
            // console.log(1);
            lock=false;
            var dom='<div class="loading"><p>加载中...</p></div>';
            $(dom).appendTo($('section.main'));
            setTimeout(function(){
                var str='<div class="main_contain"><div class="main_order main_admin"><a href="javascript:;"><img src="../images/order.png" alt=""></a><div class="main_order_info"><p><a href="javascript:;">张小二</a></p><p>1个小时前</p></div><div class="main_comment"><div class="main_comment_contain"><span>50</span><a href="javascript:;"><img src="../images/msg.png" alt=""></a></div><div class="main_comment_contain"><span>331</span><a href="javascript:;"><img src="../images/like.png" alt=""></a></div></div></div><div class="main_comment_msg"><div class="main_comment_owner"><p>天啊撸，为什么这套真丝“睡袍”套装穿她身上会这么仙美 贵族气！蓝色和桃粉色玫瑰印花飘散着甜美气息。</p></div></div></div>';
                $('.loading').remove();
                $(str).appendTo($('section.main .container'));

                //把锁打开
                lock=true;
            },1000);
        }
    });

    

})();