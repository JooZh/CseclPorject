$(function(){
    var $avatars = $('.avatar')
    // 随机生成坐标函数
    var pos = [
        {
            left:80,
            top: 50,
        },
        {
            right: 180,
            bottom: 300,
        },
        {
            left: 350,
            top: 400,
        },
        {
            right: 460,
            bottom: 500
        }  
    ]
    $.each($avatars,function(index,value) {
        if(pos[index]) {
            $.each(pos[index],function(i,v) {
                console.log(i,v);
                $(value).css(i,v+'px')
            })
            console.log('-----')
        }
        
    })


    
})