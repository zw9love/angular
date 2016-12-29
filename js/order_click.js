    //订阅按钮的点击事件
    (function(){

    var app=angular.module('myapp',[]);

    //back按钮的指令
    app.directive('back',function(){
        return {
            restrict:'C',
            link: function(scope,element,attr){
                history.back();
            }
        }
    });

    
    angular.element('html').on('selectstart',function(e){
        e.preventDefault();
    });

    angular.element(window).on('resize',init);

    angular.element(window).on('load',init);

    var size=parseInt(angular.element('html').css('font-size'));


    //html字号的初始化
    function init(){

        var width=angular.element('html').width();
        if(width<750){

            var bili=width/750;
            angular.element('html').css('font-size',bili*size);

            //模态框的高度设定
            angular.element('.modal').css('padding-top','10.41%')
        }else{

            angular.element('html').css('font-size',size);

            //模态框的高度设定
            angular.element('.modal').css('padding-top',80)
        }

    }

    app.controller('mainCtrl',function($scope){
        $scope.flag=true;
    });

    //mainOrderSelect按钮的指令
    app.directive('mainOrderSelect',function(){
        return {
            restrict:'C',
            link: function(scope,element,attr){
                var lock=true;
                element.on('click',function(){
                    var order=element.attr('order');
                    console.log(attr.order);
                    if(!lock) return;
                    lock=false;
                    if(order=="true"){
                        element.css('border','1px solid #999');
                        element.children('.icon_add').hide();
                        element.children('span').html('已订阅');
                        element.children('span').addClass('has_order');
                        element.attr('order','false');
                        angular.element('.modal>div').text('已添加订阅');
                        angular.element('.modal').fadeIn('slow',function(){
                            angular.element('.modal').fadeOut('slow',function(){
                                lock=true;
                            });
                        });
                    }else{
                        element.css('border','1px solid #e92230');
                        element.children('.icon_add').show();
                        element.children('span').html('&nbsp;订阅');
                        element.children('span').removeClass('has_order');
                        element.attr('order','true');
                        angular.element('.modal>div').text('已取消订阅');
                        angular.element('.modal').fadeIn('slow',function(){
                             angular.element('.modal').fadeOut('slow',function(){
                                lock=true;
                            });
                        });
                    }
                });
                
            }
        }
    });

})();   
        