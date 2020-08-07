$(function () {
    $('.input_pass').keyup(function (e) {
        // e.stopPropagation();
        if (e.keyCode === 13) {
            $('.input_sub').click()
        }
    })

    $('.input_sub').on('click', function () {
        const username = $('.input_txt').val()
        const password = $('.input_pass').val()
        if (username && password) {
            console.log(1);
            $.ajax({
                type: 'post',
                url: BigNew.user_login,
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
                        $('.btn-secondary').click(() => {
                            $('#myModal').modal('hide');
                            $('.input_pass').focus();
                        })
                        $('html').one('keyup', function (e) {
                            if (e.keyCode === 13) {
                                console.log(123);
                                $('.btn-secondary').click();
                                // $('html').off('keyup', $('html'));
                            }
                        })
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
        $('.btn-primary').click(() => {
            $(id).modal('hide');
            window.location.href = 'index.html';
        })
        $('html').one('keyup', function (e) {
            if (e.keyCode === 13) {
                console.log(123);
                $('.btn-primary').click();
            }
        })
    }
})