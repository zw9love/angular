    //订阅按钮的点击事件
    (function(){

    var app=angular.module('myapp',[]);

    app.controller('bigCtrl',function($window,$scope){
        $scope.size=20;
        $scope.obj=$window;
        $scope.width=0;
        $scope.init=function(ele){
            $scope.width=ele[0].clientWidth;
            // console.log($scope.width);
            if($scope.width<750){
                var bili=$scope.width/750;
                ele.css('font-size',bili*$scope.size+'px');
                ele.find('.modal').css('padding-top','10.41%');
            }else{
                ele.css('font-size',$scope.size+'px');
                ele.find('.modal').css('padding-top',80);
            }
        };
        $scope.back=function(){
            history.back();
        };

    });

    app.directive('lang',function(){
        return {
            link:function(scope,element,attr){
                scope.init(element);
                //当可视窗尺寸发生改变
                scope.obj.onresize=function(){
                    scope.init(element);
                };
                //禁止网页选中事件
                element.bind('selectstart',function(e){
                    e.preventDefault();
                });
            }
        };
    });


    app.controller('mainCtrl',function($scope){
        $scope.flag=true;
        $scope.modal=null;
    });

    app.directive('modal',function(){
        return {
            restrict:'C',
            link:function(scope,element,attr){
                scope.modal=element;
            }
        };
    });

    //mainOrderSelect按钮的指令
    app.directive('mainOrderSelect',function(){
        return {
            restrict:'C',
            link: function(scope,element,attr){
                var lock=true;
                element.on('click',function(){
                    var order=element.attr('order');
                    // console.log(scope.modal);
                    if(!lock) return;
                    lock=false;
                    if(order=="true"){
                        element.css('border','1px solid #999');
                        element.children().eq(0).addClass('hide');
                        element.children().eq(1).html('已订阅');
                        element.children().eq(1).addClass('has_order');
                        element.attr('order','false');
                        scope.modal.children().text('已添加订阅');
                        scope.modal.addClass('fade-in');
                        setTimeout(function(){
                            scope.modal.removeClass('fade-in');
                            lock=true;
                        },1000);
                        
                    }else{
                        element.css('border','1px solid #e92230');
                        element.children().eq(0).removeClass('hide');
                        element.children().eq(1).html('&nbsp;订阅');
                        element.children().eq(1).removeClass('has_order');
                        element.attr('order','true');
                        scope.modal.children().text('已取消订阅');
                        scope.modal.addClass('fade-in');
                        setTimeout(function(){
                            scope.modal.removeClass('fade-in');
                            lock=true;
                        },1000);
                    }
                });
                
            }
        }
    });

})();   
        