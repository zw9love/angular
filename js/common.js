
    var app=angular.module('myapp',[]);

    (function(){

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
                }else{
                    ele.css('font-size',$scope.size+'px');
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

        //判断orderlist页面是否存在
        app.directive('orderlist',function(){
            return{
               link:function(scope,element,attr){
                    // 判断orderlist有无订阅号
                    if(element.children('.main_order').length==0){
                        element.addClass('hide');
                        element.parent().children('p').addClass('show');
                    }
                    // 判断安卓还是ios
                    if(navigator.platform!="iPhone" && scope.width<=480 && navigator.platform.indexOf('Win')<0)
                    {   
                        if(element.parent().find('.media_search')){
                           element.parent().find('.media_search').css('line-height','32px');
                        }
                    }
               }
            };
            
        });

        //判断suggestion页面是否存在
        app.directive('sugguestPhone',function(){
            return {
                restrict:'C',
                link:function(scope,element,attr){
                    var self=element.children('input')
                    //判断有没填写内容
                    self.bind('input',function(){
                        var str=element.parent().find('textarea').val();
                        var phone=self.val();
                        if(str.trim().length>0 && (/^1[34578]\d{9}$/.test(phone)))
                        {
                            element.next().next().addClass('hover');
                        }else{
                            element.next().next().removeClass('hover');
                        }
                    });
                }
            };
        });

    })();