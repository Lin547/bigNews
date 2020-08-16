$(function () {

    let page = 1;
    let perpage = 2;
    // let totalPages = 0;

    // 初始化数据，展示评论数据
    function init() {
        // 19、文章评论搜索
        // 请求地址：/admin/comment/search
        // 请求方式：get
        // 请求参数： [ page ]  [ perpage ]
        $.ajax({
            url: BigNew.comment_list,
            data: {
                page: page,
                perpage: perpage,
            },
            dataType: 'json',
            success: (res) => {
                if (res.code === 200) {
                    console.log(res.data);
                    $('tbody').html(template('commentListTemplate', res.data));
                    // totalPages = res.data.totalPage;
                    renderPage(res.data.totalPage);
                }
            }
        })
    }

    init()

    // 分页渲染
    function renderPage(totalPages) {
        // $('.pagination').bootstrapPaginator('destory');
        $('#pagination').bootstrapPaginator({
            // 设置版本号 3用ul, 2用div
            bootstrapMajorVersion: 3,
            // 显示第几页
            currentPage: page,
            // 总页数
            totalPages: totalPages,
            // 分页按钮点击事件
            onPageClicked: function (event, originalEvent, type, cpage) {
                page = cpage;
                init();
            }
        })
    }

    // 按钮事件 批准按钮
    $('tbody').on('click', '.btn-info', function () {
        const id = $(this).data('id');
        setState(id, BigNew.comment_pass, init);
    })
    // 按钮事件 拒绝按钮
    $('tbody').on('click', '.btn-warning', function () {
        const id = $(this).data('id');
        setState(id, BigNew.comment_reject, init);
    })
    // 按钮事件 删除按钮
    $('tbody').on('click', '.btn-danger', function () {
        const id = $(this).data('id');
        setState(id, BigNew.comment_delete, function () {
            // 判断当前页是否还有数据，如何没有需要回到上一页
            $('tbody').children().length === 1 ? page-- : '';
            init();
        });
    })

    // 封装按钮事件的请求事件
    // id：操作数据id url:请求地址； callback：回调函数，删除数据时进行数据重载
    function setState(id, url, callback) {
        $.ajax({
            type: 'post',
            url: url,
            data: { id },
            dataType: 'json',
            success: (res) => {
                alert(res.msg);
                console.log(res);
                callback && callback();
            }
        })
    }

})