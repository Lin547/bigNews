$(function(){
    $.ajax({
        url: BigNew.user_detail,
        // headers: {
        //     Authorization: window.localStorage.getItem('token')
        // },
        dataType: 'json',
        success: (res)=>{
            console.log(res);
            if(res.code === 200){
                $('#inputEmail1').val(res.data.username);
                $('#inputEmail2').val(res.data.nickname);
                $('#inputEmail3').val(res.data.email);
                $('.user_pic').attr('src', res.data.userPic);
                $('#inputEmail4').val(res.data.password);
            }
        },
        error: function(err){
            console.log(err);
        }
    })

    // 文件预览，为表单元素注册change事件
    $('#exampleInputFile').on('change', function(){
        // 1.拿到选择的文件
        const file = this.files[0];
        // 2.将拿到的文件转为路径
        const url = URL.createObjectURL(file);
        // 3.将url赋值给图片标签
        $('img.user_pic').attr('src', url);
    })

    // 注册表单提交事件
    $('#form').on('submit', function(e){
        // 禁用表单默认提交事件
        e.preventDefault();
        $.ajax({
            type: 'post',
            url: BigNew.user_edit,
            // headers: {
            //     Authorization: window.localStorage.getItem('token')
            // },
            data: new FormData(this),
            dataType: 'json',
            contentType: false,
            processData: false,
            success: (res)=>{
                console.log(res);
            }
        })
    })
})