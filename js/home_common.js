(function(){    

    var app=angular.module('myapp',['ui.router']);
   
    var now=0;

    //行业页面控制器
    app.controller('industryCtrl',function($scope){

        $scope.sum=0;
        $scope.max=0;
        $scope.flag=true;

        $scope.menu=[
        {
            name:'咨询',
            classname:'menucurrent',
            url:'menu1'
        },
        {
            name:'人物',
            classname:'',
            url:'menu2'
        },
        {
            name:'买手',
            classname:'',
            url:'menu3'
        },
        {
            name:'设计师',
            classname:'',
            url:'menu1'
        },
        {
            name:'贺喜时尚1',
            classname:'',
            url:'menu2'
        },
        {
            name:'贺喜时尚2',
            classname:'',
            url:'menu3'
        },
        {
            name:'贺喜时尚3',
            classname:'',
            url:'menu1'
        }];

        $scope.click=function(){
            var index=this.$index;
            angular.forEach($scope.menu,function(val,key){
                if(key==index){
                    val.classname="menucurrent";
                }else{
                    val.classname="";
                }
            });

        };

    
    });

    app.controller('navCtrl',function($scope){

        $scope.sum=0;
        $scope.max=0;

        $scope.navMenu=[{
            name:'推荐',
            classname:'current',
            url:'index'
        },
        {
            name:'行业',
            classname:'',
            url:'industry'
        },
        {
            name:'订阅',
            classname:'',
            url:'order'
        },
        {
            name:'时尚',
            classname:'',
            url:'index'
        },
        {
            name:'美妆',
            classname:'',
            url:'index'
        },
        {
            name:'推荐',
            classname:'',
            url:'index'
        },
        {
            name:'行业',
            classname:'',
            url:'index'
        },
        {
            name:'订阅1',
            classname:'',
            url:'index'
        },
        {
            name:'订阅2',
            classname:'',
            url:'index'
        },
        {
            name:'订阅3',
            classname:'',
            url:'index'
        }];

        $scope.click=function(){
            var index=this.$index;
            angular.forEach($scope.navMenu,function(val,key){
                if(key==index){
                    val.classname="current";
                }else{
                    val.classname="";
                }
            });
        };
    });

    app.config(function($stateProvider,$urlRouterProvider){
        $urlRouterProvider.otherwise('/index');
        $stateProvider
        .state('index',{
            views: {
                "view1":{templateUrl:'tpl/comment.html'}
            },
            url:'/index'
        })
        .state('industry',{
            views: {
                "view1":{templateUrl:'tpl/industry.html'},
                "view2":{templateUrl:'tpl/menu1.html'}
            }
        })
        .state('order',{
            views: {
                "view1":{templateUrl:'tpl/order.html'}
            }
        })
        .state('menu1',{
            views: {
                "view1":{templateUrl:'tpl/industry.html'},
                "view2":{templateUrl:'tpl/menu1.html'}
            }
        })
        .state('menu2',{
            views: {
                "view1":{templateUrl:'tpl/industry.html'},
                "view2":{templateUrl:'tpl/menu2.html'}
            }
        })
        .state('menu3',{
            views: {
                "view1":{templateUrl:'tpl/industry.html'},
                "view2":{templateUrl:'tpl/menu3.html'}
            }
        })
    });


    app.controller('asideCtrl',function($scope){
        $scope.list=[{
            src:'images/myorder.png',
            name:'我的订阅',
            href:'page/orderlist.html',
            classname:''
        },{
            src:'images/star.png',
            name:'我的收藏',
            href:'page/like.html',
            classname:''
        },{
            src:'images/fix_msg.png',
            name:'我的评论',
            href:'page/comment.html',
            classname:''
        },{
            src:'images/suggestion.png',
            name:'意见反馈',
            href:'page/suggestion.html',
            classname:''
        }];

    });

    // var arr={
    //     'name':'大熊',
    //     'age':30,
    //     'sex':'男'
    // };
    // for(var i in arr){
    //     console.log(arr[i]);
    // };


    //指令函数
    function directive(dom,fn){
        for(var i in dom){
            app.directive(dom[i],function(){
                return {
                    restrict:'ECMA',
                    link: fn
                }
            });
        }
        
    }

    directive(['quit'],function(scope,element,attr){
        element.on('click',function(){
            element.parents('html,body').addClass('noscroll');
            element.parents('.aside').siblings('.shadow').addClass('show');
        });
    });


    //自定义指令navrepeatFinish
    app.directive('navrepeatFinish',function(){
        return {
            link: function(scope,element,attr){
                //nav滑动事件初始化工作
                element.find('a').text(attr.data);
                var w=element.width();
                var margin=parseInt(element.css('margin-right'));
                var all=w+margin;
                scope.$parent.sum+=all;
                // console.log(w);
                //当nav的li循环结束
                if(scope.$last){
                    // console.log(scope.$parent.sum);
                    element.parent().width(scope.$parent.sum+15);
                    scope.$parent.max=scope.$parent.sum-element.parents('#wrapper').width();

                    //nav点击事件初始化工作
                    var center=element.parent().position().left+element.parents('#wrapper').width()/2;
                    var mymax=scope.$parent.max;

                    element.parent().find('li').each(function(i){
                        var self=element.parent().find('li').eq(i);
                        var dis=center-parseInt(self.position().left)-self.width()/2-15;
                        if(dis>0){
                            dis=0;
                        }
                        else if(dis<(-mymax)){
                            dis=-mymax;
                        }
                        self.attr('myleft',dis);
                    });

                    if(scope.flag){

                        var obj=element.parent().find('li').eq(now);
                        var left=obj.parents('#wrapper').width()/2;
                        var max=Number(obj.parent().attr('mymax'));
                        obj.parent().removeAttr('class');
                        var dis=obj.attr('myleft');
                        obj.parent().css({
                            'transform':'translateX('+dis+'px)',
                            '-webkit-transform':'translateX('+dis+'px)'
                        });

                        angular.forEach(scope.menu,function(val,key){
                            if(key==now){
                                val.classname="menucurrent";
                            }else{
                                val.classname="";
                            }
                        });
                        
                    }
                }

                //nav块的点击事件
                element.on('click',function(){
                    if(scope.flag==true){
                        now=scope.$index;
                        // alert(now);
                    }
                    var index=element.index();
                    var left=element.parents('#wrapper').width()/2;
                    var max=Number(element.parent().attr('mymax'));
                    element.parent().removeAttr('class');
                    var dis=element.attr('myleft');
                    element.parent().css({
                        'transform':'translateX('+dis+'px)',
                        '-webkit-transform':'translateX('+dis+'px)'
                    });
                });
            }
        }
    });


    //scroller按钮的指令
    directive(['scroller'],function(scope,element,attr){
        //初始化
        element.css({
            'transform':'translateX(0px)',
            '-webkit-transform':'translateX(0px)'
        });

        //拖拽
        element.on('mousedown',function(e){
            element.removeAttr('class');
            var max=Number(element.attr('mymax'));
            var translate=this.style['transform'];
            var index1=translate.indexOf('(');
            var index2=translate.indexOf('p');
            var now=parseInt(translate.slice(index1+1,index2));
            var x1=e.clientX;
            var start=new Date().getTime();

            element.on('mousemove',function(e){
                var x2=e.clientX;
                var dis=x2-x1+now;
                if(dis>0){
                    dis=0;
                }

                if(dis<-max){
                    dis=-max;
                }

                element.css({
                    'transform':'translateX('+dis+'px)',
                    '-webkit-transform':'translateX('+dis+'px)'
                });
            });

            element.on('mouseup',function(e){
                element.addClass('scroller1');
                element.off('mousemove');
                element.off('mouseup');
                var end=new Date().getTime();
                var x3=e.clientX;
                var time=end-start;
                var translate=this.style['transform'];
                var index1=translate.indexOf('(');
                var index2=translate.indexOf('p');
                var now=parseInt(translate.slice(index1+1,index2));

                // 说明用户很急
                if(time<200 && Math.abs(x3-x1)>=20){
                    // $(this).addClass('scroller1');
                    if(x3-x1>0){
                        element.css({
                            'transform':'translateX(0px)',
                            '-webkit-transform':'translateX(0px)'
                        });
                    }else{
                        element.css({
                            'transform':'translateX('+(-max)+'px)',
                            '-webkit-transform':'translateX('+(-max)+'px)'
                        });
                    }
                }else{
                    // $(this).addClass('scroller2');
                    var val=now+(x3-x1)*0.8;
                    if(val>0){
                        val=0;
                    }
                    if(val<-max){
                        val=-max;
                    }

                    element.css({
                        'transform':'translateX('+val+'px)',
                        '-webkit-transform':'translateX('+val+'px)'
                    });
                }
            });

            element.on('mouseleave',function(){
                element.trigger('mouseup');
            });
        });
        
        //触摸滑动
        element.on('touchstart',function(e){
            element.removeAttr('class');
            var max=Number(element.attr('mymax'));
            var translate=this.style['transform'];
            var index1=translate.indexOf('(');
            var index2=translate.indexOf('p');
            var now=parseInt(translate.slice(index1+1,index2));
            var x1=e.originalEvent.changedTouches[0].clientX;
            var start=new Date().getTime();

            element.on('touchmove',function(e){
                var x2=e.originalEvent.changedTouches[0].clientX;
                var dis=x2-x1+now;
                if(dis>0){
                    dis=0;
                }

                if(dis<-max){
                    dis=-max;
                }

                element.css({
                    'transform':'translateX('+dis+'px)',
                    '-webkit-transform':'translateX('+dis+'px)'
                });
            });

            element.on('touchend',function(e){
                element.addClass('scroller1');
                element.off('touchmove');
                element.off('touchend');
                var end=new Date().getTime();
                var x3=e.originalEvent.changedTouches[0].clientX;
                var time=end-start;
                var translate=this.style['transform'];
                var index1=translate.indexOf('(');
                var index2=translate.indexOf('p');
                var now=parseInt(translate.slice(index1+1,index2));

                // 说明用户很急
                if(time<200 && Math.abs(x3-x1)>=20){
                    // $(this).addClass('scroller1');
                    if(x3-x1>0){
                        element.css({
                            'transform':'translateX(0px)',
                            '-webkit-transform':'translateX(0px)'
                        });
                    }else{
                        element.css({
                            'transform':'translateX('+(-max)+'px)',
                            '-webkit-transform':'translateX('+(-max)+'px)'
                        });
                    }
                }else{
                    // $(this).addClass('scroller2');
                    var val=now+(x3-x1)*0.8;
                    if(val>0){
                        val=0;
                    }
                    if(val<-max){
                        val=-max;
                    }

                    element.css({
                        'transform':'translateX('+val+'px)',
                        '-webkit-transform':'translateX('+val+'px)'
                    });
                }
            });

        });
    });


    //推荐块控制器
    app.controller('commentCtrl',function($scope){
        //点击搜索框
        $scope.searchClick=function(){
            location.href="page/search.html";
        };
    });

    //info按钮的指令
    directive(['info'],function(scope,element,attr){
        element.on('click',function(e){
            e.stopPropagation();
            element.parents('.container').siblings('.aside').toggleClass('go_aside');
            element.parents('.container').toggleClass('go_contain');
            element.parents('.header_contain').siblings('.contain_shadow').toggleClass('go_shadow');
        });
    });

    //container按钮的指令
    directive(['container'],function(scope,element,attr){
        element.on('click',function(e){
            element.parents('html,body').removeClass('noscroll');
            element.siblings('.aside').removeClass('go_aside');
            element.removeClass('go_contain');
            element.find('.contain_shadow').removeClass('go_shadow');
        });
    });



    //shadow按钮的指令
    app.directive('shadow',function(){
        return {
            restrict:'C',
            link: function(scope,element,attr){
                    var windowObj=angular.element(window);
                    var htmlObj=element.parents('html');
                    var size=parseInt(htmlObj.css('font-size'));
                    var scrollTop=0;

                    //当滚动轮发生变化的时候
                    windowObj.on('scroll',function(){
                        scrollTop=windowObj.scrollTop();
                        element.css('top',scrollTop);
                    });

                    //当页面加载完成的时候
                    windowObj.on('load',function(){
                        init();
                        // 判断安卓还是ios
                        if(navigator.platform!="iPhone" && windowObj.width()<=480 && navigator.platform.indexOf('Win')<0){
                            element.siblings('.aside').find('span').css({
                                'line-height':'26px'
                            });
                        }
                    });

                    //html字号的初始化
                    function init(){
                        var width=windowObj.width();
                        if(width<750){
                            var bili=width/750;
                            htmlObj.css('font-size',bili*size);
                                
                        }else{
                            htmlObj.css('font-size',size);
                        }

                        var height=windowObj.height();
                        element.height(height);
                    }

                    windowObj.on('resize',init);
            }   
        }
    });
    
    //sure和cancel按钮的指令
    directive(['sure','cancel'],function(scope,element,attr){
        element.on('click',function(){
            element.parents('html,body').removeClass('noscroll');
            element.parents('.shadow').removeClass('show');
        });
    });

})();