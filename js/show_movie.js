(function(){
    var video=document.getElementById('video');
        $('.media_info_movie').click(function(e){
            e.stopPropagation();
            $('.movie #video').addClass('movieshow');
            $(this).parent().addClass('hide');
            $(this).parent().siblings('img').addClass('hide');
            video.controls=true;
            video.play();
        });

        $('.movie').click(function(){
            if(video.paused){
                video.play();
            }else{
                video.pause();
            }
             video.controls=true
        });

        $('.movie').mouseenter(function(){
            // alert(1);
            video.controls=true;
        });

        $('.movie').mouseleave(function(){
            // alert(2);
            video.controls=false;
        });
})()