    (function(){

        app.controller('mainCtrl',function($scope){
            $scope.obj=null;
            $scope.arr=[];
            $scope.html=null;
            $scope.body=null;
            $scope.shadow=null;
            $scope.move=null;
            $scope.noComment=null;
            $scope.kid=[];

            $scope.sure=function(){
                $scope.shadow.removeClass('show');
                $scope.html.removeClass('noscroll');
                $scope.body.removeClass('noscroll');
                var father=$scope.obj.parent().parent();
                $scope.obj.parent().remove();
                if(father.children().length==0){
                    $scope.move.css('opacity',0);
                    $scope.noComment.addClass('show');
                }
            };

            $scope.cancel=function(){
                $scope.shadow.removeClass('show');
                $scope.html.removeClass('noscroll');
                $scope.body.removeClass('noscroll');
            };

        });

        //把commentLeft推进数组里面去
        app.directive('commentLeft',function(){
            return {
                restrict:'C',
                link:function(scope,element,attr){
                    scope.arr.push(element);
                    element.bind('click',function(){
                        scope.shadow.addClass('show');
                        scope.obj=element;
                        scope.html.addClass('noscroll');
                        scope.body.addClass('noscroll');
                        // console.log(scope.obj);
                    });
                }
            };
        });

        //header按钮的指令
        app.directive('header',function(){
            return {
                link: function(scope,element,attr){
                    var self=element.children().eq(2);
                    scope.move=self;
                    self.bind('click',function(){
                        angular.forEach(scope.arr,function(val,key){
                            val.toggleClass('show');
                        });
                        var haveShow=scope.arr[0].hasClass('show');
                        if(haveShow){
                            self.children().text('取消');
                        }else{
                            self.children().text('编辑');
                        }
                    });
                }   
            }
        });

        //body的指令
        app.directive('dom',function(){
            return {
                link:function(scope,element,attr){
                    scope.html=element.parent();
                    scope.body=element;
                    scope.shadow=element.children().eq(1);
                    scope.noComment=element.children().eq(2);
                }
            };
        });

        //more按钮的指令
        app.directive('more',function(){
            return {
                restrict:'A',
                link: function(scope,element,attr){
                    element.bind('click',function(){
                        angular.forEach(scope.kid,function(val,key){
                                val.removeClass('hide');
                        });
                        element.remove();
                    });
                }   
            }
        });

        //mainCommentOther按钮的指令
        app.directive('mainCommentOther',function(){
            return {
                restrict:'C',
                link: function(scope,element,attr){
                    scope.kid.push(element.children());
                    angular.forEach(element.children(),function(val,key){
                         if(key>1){
                            val.className="hide";
                         }
                    });
                }   
            }
        });

    })();