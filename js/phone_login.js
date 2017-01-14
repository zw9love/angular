(function(){

    app.controller('phoneCtrl',function($scope){
        //初始化属性
        $scope.timer=null;
        $scope.obj=null;
        $scope.shadow=null;
        $scope.lock=true;

        //点击确定按钮
        $scope.sure=function(){
            $scope.shadow.removeClass('show');
        };
    });

    app.directive('loginBlock1',function(){
        return {
            restrict:'C',
            link:function(scope,element,attr){
                scope.obj=element.children('input');
            }
        };
    });

    app.directive('shadow',function(){
        return {
            restrict:'C',
            link:function(scope,element,attr){
                scope.shadow=element;
            }
        };
    });

    app.directive('loginBlock2',function(){
        return {
            restrict:'C',
            link:function(scope,element,attr){
                var span=element.children('span');
                //点击获取验证码
                span.on('click',function(){
                    var phone=scope.obj.val();
                    if(!(/^1[34578]\d{9}$/.test(phone))){ 
                        scope.shadow.addClass('show');
                        return false; 
                    } 
                    // console.log(lock);
                    if(!scope.lock) return;
                    var n=60;
                    scope.lock=false;
                    span.text('60S');
                    clearInterval(scope.timer);
                    scope.timer=setInterval(function(){
                        n--;
                        if(n<0){
                            clearInterval(scope.timer);
                            span.text('重新获取');
                            scope.lock=true;
                        }else{
                            span.text(n+'S');
                        }
                    },1000);
                });

                var input=element.children('input');
                //输入框的按下事件
                input.on('input',function(){
                    var phone=scope.obj.val();
                    if(!(/^1[34578]\d{9}$/.test(phone))){ 
                        return;
                    } 
                    var str=input.val();
                    var a=element.next().children('a');
                    if(str.length==4){
                        a.addClass('hover');
                    }else{
                        a.removeClass('hover');
                    }
                });
            }
        };
    });

})();