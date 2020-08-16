$(function () {
    // let data = {
    //     page: 1,
    //     perpage: 6,
    //     key: '',
    //     state: '',
    //     type: ''
    // }
    let page = 1;
    let perpage = 6;
    let key = '';
    let state = '';
    let type = '';

    function init() {
        // 获取当前页文章列表数据
        // 10、文章搜索
        // 请求地址：/admin/article/query
        // 请求方式：get
        // 请求参数：key, type, state, page, perpage
        const data = { key, type, state, page, perpage };
        $.ajax({
            url: BigNew.article_query,
            data: data,
            dataType: 'json',
            success: (res) => {
                console.log(res);
                if (res.code === 200) {
                    $('tbody').html(template('articleTemplate', res.data));
                    if (res.data.totalPage > 0) {
                        renderPage(res.data.totalPage);
                    } else {
                        $('.pagination').bootstrapPaginator('destroy');
                        $('.pagination').html(`<h1>此分类未有文章</h1>`);
                        // console.dir($('.pagination').bootstrapPaginator);
                        // $(".pagination").empty();
                    }
                }
            }
        })

    }

    // 初始化
    init();

    // 请求所有分类列表数据
    // 5、所有文章类别
    // 请求地址：/admin/category/list
    // 请求方式：get
    // 请求参数：无
    // 返回数据：文章
    $.ajax({
        url: BigNew.category_list,
        dataType: 'json',
        success: (res) => {
            console.log(res);
            if (res.code === 200) {
                $('#selCategory').html(template('selCategoryTemplate', res));
            }
        }
    })

    // 分页渲染
    function renderPage(totalPages) {
        // $('.pagination').bootstrapPaginator('destory');
        $('.pagination').bootstrapPaginator({
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

    // 筛选事件  注意点：筛选事件时重新查询数据，要注意当前页的值，需要重置为1
    $('#btnSearch').on('click', function () {
        console.log($('#selCategory').val());
        console.log($('#selStatus').val());
        type = $('#selCategory').val();
        state = $('#selStatus').val();

        // 10、文章搜索
        // 请求地址：/admin/article/query
        // 请求方式：get
        // 请求参数：key, type, state, page, perpage
        // 重置当前页为1，否则会将当前页码传递，造成页码访问超出范围
        page = 1;
        init();
        return false;
    })

    // 删除功能
    // 14、删除文章
    // 请求地址：/admin/article/delete
    // 请求方式：post
    // 请求参数：id
    $('tbody').on('click', '.btn_delete', function () {
        const id = $(this).data('id');
        if (confirm('确认删除此文章？')) {
            $.ajax({
                url: BigNew.article_delete,
                type: 'post',
                data: { id },
                dataType: 'json',
                success: (res) => {
                    console.log(res);
                    if (res.code === 204) {
                        alert(res.msg);
                        init();
                    }
                }
            })
        }

    })
})