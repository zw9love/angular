(function(){

    // 点击获取验证码按钮的时候
    var timer=null;
    var lock=true;

    $('.login_block2>span').click(function(){

        var phone=$('.login_block1>input').val();

        if(!(/^1[34578]\d{9}$/.test(phone))){ 
            $('.shadow').show();
            return false; 
        } 
        // console.log(lock);
        if(!lock) return;
        var n=60;
        lock=false;
        var self=$(this);
        $(this).text('60S');
        clearInterval(timer);
        timer=setInterval(function(){
            n--;
            if(n<0){
                clearInterval(timer);
                self.text('重新获取');
                lock=true;
            }else{
                self.text(n+'S');
            }
        },1000);
        
    });

    //点击确定按钮
    $('.sure').click(function(){
        $('.shadow').hide();
    });


    // 键盘的按下事件

    // var obj=$('.login_block2>input')[0];
    $('.login_block2>input').on('input',function(e){

        var phone=$('.login_block1>input').val();

        if(!(/^1[34578]\d{9}$/.test(phone))){ 
            // alert("手机号码有误，请重填");  
            return;
        } 

        var str=$(this).val()

        console.log(str)

        if(str.length==4){
            $('.login_sure a').addClass('hover');
        }else{
            $('.login_sure a').removeClass('hover');
        }
        
        
    });

    })();