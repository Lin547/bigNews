$(function () {
    $('.input_pass').keydown(function (e) {
        if (e.keyCode === 13) {
            $('.input_sub').click()
        }
    })
    $('.input_sub').click(function () {
        const username = $('.input_txt').val()
        const password = $('.input_pass').val()
        if (username && password) {
            console.log(1);
            $.ajax({
                type: 'post',
                url: 'http://localhost:8080/api/v1/admin/user/login',
                data: { username, password },
                dataType: 'json',
                success: (res) => {
                    console.log(res);
                    if (res.code === 200) {
                        // $('#myModal').modal('show');
                        // 保存token值
                        window.localStorage.setItem('token', res.token);
                        showModal(res, '#myModal');
                        // window.location.href='index.html'

                    } else {
                        $('#myModal').find('.modal-body > p').text(res.msg);
                        $('#myModal').modal('show');
                    }

                },
                error: (err) => {
                    console.log(err);
                }
            })
        }
    })

    // $('.input_sub').ajaxStart(function(){
    //     console.log('我开始请求啦');
    // })

    // 登录成功后模态框显示与跳转
    function showModal(res, id) {
        $(id).find('.modal-body').text(res.msg);
        $(id).modal('show');
        $('.btn-secondary').click(() => {
            $(id).modal('hide');
        })

        $('.btn-primary').click(() => {
            window.location.href = 'index.html';
        })
    }
})