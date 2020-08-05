$(function () {

    // 获取用户信息
    $.ajax({
        url: 'http://localhost:8080/api/v1/admin/user/info',
        headers: {
            Authorization: window.localStorage.getItem('token')
        },
        dataType: 'json',
        success: (res) => {
            // console.log(res);
            if (res.code === 200) {
                $('.user_info > img').attr('src', res.data.userPic)
                $('.user_info > span').html(`欢迎&nbsp;&nbsp;${res.data.nickname}`)
            }
        },
        error: (err) => {
            console.log(err);
        }
    })


    // 导航栏效果
    $('.level01').click(function () {
        // 当前选中菜单项，移除其余兄弟项样式
        $(this).addClass('active').siblings().removeClass('active');
        // 判断是否是展开项菜单
        if($(this).next().hasClass('level02')){
            // 展开菜单
            $('.level02').slideToggle();
            // 箭头样式
            $('.level01').eq(1).find('b').toggleClass('rotate0');
        }else{
            // 关闭展开菜单
            $('.level02').slideUp();
            // 移除展开菜单子项样式
            $('.level02 > li').removeClass('active');
            // 点击其他菜单项时恢复箭头样式
            $('.level01').eq(1).find('b').removeClass('rotate0');
        }
    })

    $('.level02 > li').click(function(){
        // 展开子项样式
        $(this).addClass('active').siblings().removeClass('active');
    })
})